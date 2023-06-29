"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import bs58 from "bs58";
import axios from "axios";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SideBar() {
  const { publicKey, wallet, disconnect, connected, signMessage } = useWallet();

  const addressWallet = useMemo(() => publicKey?.toBase58(), [publicKey]);
  console.log("addressWallet");

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
    if (response && response.data) {
      handleSignAddressMessage(`Nonce: ${response.data.nonce.toString()}`);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && addressWallet) {
      handleGetNonce();
    }
  }, [addressWallet]);

  return (
    <Command className="rounded-lg border shadow-md w-1/6 h-screen min-w-fit float-left max-sm:hidden">
      <h1 className="text-[30px] grid content-center text-center pt-6 pb-3">
        Gumstreet
      </h1>
      <div className="w-auto flex flex-col items-center gap-2 mb-2">
        <WalletMultiButton />
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-[#512da8] w-4/5 flex p-3 text-white font-semibold rounded-sm">
            <Avatar className="mx-2 h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>
            Address...3
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 h-14 flex justify-center items-center">
            <DropdownMenuItem className="w-full hover:bg-gray-900 text-white rounded-sm flex text-center">
              {" "}
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CommandList>
        <CommandGroup>
          <CommandItem className="">
            <Link href="./markets" className="w-full">
              Markets
            </Link>
          </CommandItem>
          <CommandItem className="">
            <Link href="./statistics" className="w-full">
              Statistics{" "}
            </Link>
          </CommandItem>
          <CommandItem className="">
            <Link href="./product" className="w-full">
              Products
            </Link>
          </CommandItem>
          <CommandItem>
            <Link href="./history" className="w-full">
              History
            </Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
