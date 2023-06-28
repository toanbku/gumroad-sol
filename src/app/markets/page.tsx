"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sidebar/page";
import MarketTable from "../components/dataTable/marketTable";

export default function Market() {
  return (
    <main className="flex h-screen w-screen">
      <SideBar />
      <ScrollArea className="w-5/6 float-right h-full">
        <h1 className="text-3xl m-10">Markets</h1>
        <MarketTable />
      </ScrollArea>
    </main>
  );
}
