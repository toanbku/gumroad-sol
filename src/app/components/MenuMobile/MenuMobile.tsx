"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import bs58 from "bs58";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePathname } from "next/navigation";

export default function MenuMobile() {
  const pathName = usePathname();
  const { publicKey, disconnect, signMessage } = useWallet();
  const addressWallet = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const [solanaAddress, setSolanaAddress] = useState<string>("");

  const handleGetNonce = async () => {
    const response = await axios.get(
      "https://gumstreet.vercel.app/api/nonce?address=" + addressWallet
    );
    if (response && response.data) {
      const signatureString = `Nonce: ${response.data.nonce.toString()}`;
      if (signMessage) {
        const res = await signMessage(
          Uint8Array.from(
            Array.from(signatureString).map((letter) => letter.charCodeAt(0))
          )
        );
        const signMsg = bs58.encode(res);
        handleLogin(signMsg);
      }
    }
  };

  const handleLogin = async (signMsg: string) => {
    const response = await axios.post(
      "https://gumstreet.vercel.app/api/login",
      {
        signature: signMsg,
        address: addressWallet,
      }
    );
    if (response) {
      localStorage.setItem("token", response.data.token);
    }
  };

  const handleLogout = async () => {
    await disconnect();
    localStorage.clear();
    setSolanaAddress("");
  };

  const shorterAddress = (string: string) => {
    return string ? string.slice(0, 6) + "..." + string.substr(-4) : string;
  };

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token") || "";
    const addressStorage = localStorage.getItem("solana_address") || "";
    if (tokenStorage?.length !== 0 && addressStorage.length !== 0) {
      setSolanaAddress(addressStorage);
    }
  }, []);

  useEffect(() => {
    if (addressWallet) {
      localStorage.setItem("solana_address", addressWallet);
      setSolanaAddress(addressWallet);
    }
  }, [addressWallet]);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token") || "";
    if (solanaAddress) {
      if (tokenStorage?.length === 0) {
        handleGetNonce();
      }
    }
  }, [solanaAddress]);

  return (
    <Sheet key={"left"}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AiOutlineMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <Command className="rounded-lg">
          <div className="text-[30px] grid content-center text-center pt-6 pb-3">
            Gumstreet
          </div>
          <div className="w-auto flex flex-col items-center gap-2 mb-2">
            {solanaAddress ? (
              <div
                className="bg-[#512da8] w-max flex gap-2 p-3 text-white font-semibold rounded-sm"
                onClick={handleLogout}
              >
                <img
                  src="https://github.com/shadcn.png"
                  className="h-6 w-6 rounded-full"
                  alt=""
                />
                {shorterAddress(solanaAddress)}
              </div>
            ) : (
              <WalletMultiButton />
            )}
          </div>
          <CommandList className="mt-5">
            <CommandGroup>
              <Link href="/">
                <CommandItem className={pathName == "/" ? "bg-slate-200" : ""}>
                  <div className="text-lg cursor-pointer w-full">Markets</div>
                </CommandItem>
              </Link>

              <Link href="/upload">
                <CommandItem
                  className={pathName === "/upload" ? "bg-slate-200" : ""}
                >
                  <div className="text-lg cursor-pointer w-full">Upload</div>
                </CommandItem>
              </Link>

              {/* <Link href="/statistics">
                <CommandItem
                  className={pathName === "/statistics" ? "bg-slate-200" : ""}
                >
                  <div className="text-lg cursor-pointer w-full">
                    Statistics
                  </div>
                </CommandItem>
              </Link> */}

              <Link href="/history">
                <CommandItem
                  className={pathName === "/history" ? "bg-slate-200" : ""}
                >
                  <div className="text-lg cursor-pointer w-full">History</div>
                </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </SheetContent>
    </Sheet>
  );
}
