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
import { Wallet } from "@/components/wallet";
import Link from "next/link";

export default function SideBar() {
  return (
    <Command className="rounded-lg border shadow-md w-1/6 h-screen min-w-fit float-left">
      <h1 className=" h-32 text-[30px] grid content-center text-center">
        Gumroad
      </h1>
      <div className="w-auto flex flex-col p-2 items-center gap-2">
        <Wallet />
      </div>
      <CommandList>
        <CommandGroup>
          <CommandItem>
            <Link href="./markets">Markets</Link>
          </CommandItem>
          <CommandItem>
            <Link href="./statistics">Statistics </Link>
          </CommandItem>
          <CommandItem>
            <Link href="./product">Products</Link>
          </CommandItem>
          <CommandItem>
            <Link href="./history">History</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
