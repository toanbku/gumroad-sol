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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function MenuMobile() {
  const { publicKey, disconnect, signMessage } = useWallet();
  const addressWallet = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const [solanaAddress, setSolanaAddress] = useState<string>("");

  const handleSignAddressMessage = async (signatureString: string) => {
    if (signMessage) {
      const response = await signMessage(
        Uint8Array.from(
          Array.from(signatureString).map((letter) => letter.charCodeAt(0))
        )
      );
      const signMsg = bs58.encode(response);
      handleLogin(signMsg);
    }
  };

  const handleGetNonce = async () => {
    const response = await axios.get(
      "https://gumstreet.vercel.app/api/nonce?address=" + addressWallet
    );
    if (response && response.data && addressWallet) {
      handleSignAddressMessage(`Nonce: ${response.data.nonce.toString()}`);
      setSolanaAddress(addressWallet);
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
    const tokenStorage = localStorage.getItem("token");
    const addressStorage = localStorage.getItem("solana_address");
    if (tokenStorage && addressStorage) {
      setSolanaAddress(addressStorage);
    }
    if (!tokenStorage && addressWallet) {
      handleGetNonce();
    }
  }, []);

  useEffect(() => {
    if (addressWallet) {
      localStorage.setItem("solana_address", addressWallet);
    }
  }, [addressWallet]);

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
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                {shorterAddress(solanaAddress)}
              </div>
            ) : (
              <WalletMultiButton />
            )}
          </div>
          <CommandList className="mt-5">
            <CommandGroup>
              <Link href="./markets">
                <CommandItem>
                  <div className="text-lg cursor-pointer w-full">Markets</div>
                </CommandItem>
              </Link>

              <Link href="./statistics">
                <CommandItem>
                  <div className="text-lg cursor-pointer w-full">
                    Statistics
                  </div>
                </CommandItem>
              </Link>

              <Link href="./product">
                <CommandItem>
                  <div className="text-lg cursor-pointer w-full">Products</div>
                </CommandItem>
              </Link>

              <Link href="./history">
                <CommandItem>
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