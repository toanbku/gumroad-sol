"use client";

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
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function SideBar() {
  return (
    <Command className="rounded-lg border shadow-md w-1/6 h-screen min-w-fit float-left max-sm:hidden">
      <h1 className=" h-32 text-[30px] grid content-center text-center">
        Gumroad
      </h1>
      <div className="w-auto flex flex-col p-2 items-center gap-2">
        <WalletMultiButton />
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
