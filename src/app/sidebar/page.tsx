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

export default function SideBar() {
  return (
    <Command className="rounded-lg border shadow-md w-1/6 h-screen min-w-fit float-left">
      <h1 className=" h-32 text-[30px] grid content-center text-center">
        Gumroad
      </h1>
      {/* Gắn nút Wallet ở đây */}

      <CommandList>
        <CommandGroup>
          <CommandItem>
            <a href="./markets">Markets</a>
          </CommandItem>
          <CommandItem>
            <a href="./statistics">Statistics </a>
          </CommandItem>
          <CommandItem>
            <a href="./product">Products</a>
          </CommandItem>
          <CommandItem>
            <a href="./history">Purchase history</a>
          </CommandItem>
          <CommandItem>
            <a href="./history">History</a>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
