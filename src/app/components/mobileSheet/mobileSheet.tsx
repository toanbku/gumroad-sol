"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineMenu } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
export default function MobileSheet() {
  return (
    <div className="sm:hidden w-full float-left">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <AiOutlineMenu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Command className="rounded-lg ">
            <h1 className=" h-32 text-[30px] grid content-center text-center">
              Gumroad
            </h1>
            <div className="w-auto flex flex-col p-2 items-center gap-2">
              {/* <Wallet /> */}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
