"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import bs58 from "bs58";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Logo from "../../../../public/gumstreet.svg";

export default function Sidebar() {
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
    <Command>
      <div className="-mt-16">
        <Image src={Logo} alt="" />
      </div>
      <div className="w-auto flex flex-col items-center gap-2 mb-2 -mt-14">
        {solanaAddress ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#512da8] w-max flex gap-2 p-3 text-white font-semibold rounded-sm">
              <img
                src="https://github.com/shadcn.png"
                className="h-6 w-6 rounded-full"
                alt=""
              />
              {shorterAddress(solanaAddress)}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 h-14 flex justify-center items-center">
              <DropdownMenuItem
                className="w-full hover:bg-gray-900 text-white rounded-sm font-semibold text-center flex justify-center cursor-pointer"
                onClick={handleLogout}
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <div className="text-lg cursor-pointer w-full">Statistics</div>
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
  );
}
