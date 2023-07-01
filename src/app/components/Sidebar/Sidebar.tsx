"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/gumstreet.svg";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constants";

const shorterAddress = (string: string) => {
  return string ? string.slice(0, 6) + "..." + string.substr(-4) : string;
};

export default function Sidebar() {
  const pathName = usePathname();
  const { publicKey, disconnect, signMessage } = useWallet();
  const addressWallet = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const [solanaAddress, setSolanaAddress] = useState<string>("");
  const router = useRouter();

  const handleLogin = useCallback(
    async (signMsg: string) => {
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
    },
    [addressWallet]
  );

  const handleGetNonce = useCallback(async () => {
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
  }, [addressWallet, handleLogin, signMessage]);

  const handleLogout = async () => {
    await disconnect();
    localStorage.clear();
    setSolanaAddress("");
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
  }, [handleGetNonce, solanaAddress]);

  return (
    <>
      <div className="lg:block hidden border-r-[1px] w-[280px]">
        <Command>
          <div
            className="-mt-16 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="" />
          </div>
          <div className="w-auto flex flex-col items-center gap-2 mb-2 -mt-14">
            {solanaAddress ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-[#512da8] w-max flex gap-2 p-3 text-white font-semibold rounded-md">
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
              {ROUTES.map((route) => (
                <Link key={route.pathName} href={route.pathName}>
                  <CommandItem
                    className={cn(
                      pathName === route.pathName
                        ? "bg-slate-200 font-semibold"
                        : "",
                      "flex gap-1 md:gap-2"
                    )}
                  >
                    {route.icon}
                    <div className="text-md cursor-pointer w-full">
                      {route.label}
                    </div>
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div className="lg:hidden block absolute top-2 left-3 z-10">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <AiOutlineMenu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <Command className="rounded-lg">
              <div className="-mt-16">
                <Image src={Logo} alt="" />
              </div>
              <div className="w-auto flex flex-col items-center gap-2 mb-2 -mt-14">
                {solanaAddress ? (
                  <div
                    className="bg-[#512da8] w-max flex gap-2 p-3 text-white font-semibold rounded-md"
                    onClick={handleLogout}
                  >
                    {shorterAddress(solanaAddress)}
                  </div>
                ) : (
                  <WalletMultiButton />
                )}
              </div>
              <CommandList className="mt-5">
                <CommandGroup>
                  {ROUTES.map((route) => (
                    <Link key={route.pathName} href={route.pathName}>
                      <CommandItem
                        className={cn(
                          pathName === route.pathName
                            ? "bg-slate-200 font-semibold"
                            : "",
                          "flex gap-1"
                        )}
                      >
                        {route.icon}
                        <div className="text-md cursor-pointer w-full">
                          {route.label}
                        </div>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
