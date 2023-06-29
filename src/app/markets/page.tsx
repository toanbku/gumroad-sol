"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sideBar/sideBar";
import MarketPlace from "../components/markets/marketPlace";
import MobileSheet from "../components/mobileSheet";

export default function Market() {
  return (
    <main className="sm:flex h-screen w-screen">
      <SideBar />
      <MobileSheet />
      <ScrollArea className="sm:w-5/6 float-right w-full h-full">
        <h1 className="text-3xl m-10">Markets</h1>
        <MarketPlace />
      </ScrollArea>
    </main>
  );
}

