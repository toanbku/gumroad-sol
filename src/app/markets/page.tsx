"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sideBar/sideBar";
import MarketPlace from "../components/markets/marketPlace";

export default function Market() {
  return (
    <main className="flex h-screen w-screen">
      <SideBar />
      <ScrollArea className="w-5/6 float-right h-full">
        <h1 className="text-3xl m-10">Markets</h1>
        <MarketPlace />
      </ScrollArea>
    </main>
  );
}

