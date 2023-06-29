"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sideBar/sideBar";
import TransactionHistory from "../components/dataTable/transactionHistory";
import PurchaseHistory from "../components/dataTable/purchaseHistory";

export default function History() {
  return (
    <main className="flex h-screen w-screen">
      <SideBar />
      <ScrollArea className="w-5/6 float-right h-full p-10">
        <div className="flex flex-col">
          <h1 className="text-3xl">Purchase history</h1>
          <PurchaseHistory />
        </div>
        <div>
          <h1 className="text-3xl">Transaction history</h1>
          <TransactionHistory />
        </div>
      </ScrollArea>
    </main>
  );
}
