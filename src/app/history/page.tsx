"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../components/sideBar/sideBar";
import TransactionHistory from "../components/dataTable/transactionHistory";
import PurchaseHistory from "../components/dataTable/purchaseHistory";


export default function History() {
  return (
    <main className="flex h-screen w-screen">
      <SideBar />
      <ScrollArea className="w-5/6 float-right h-full">
        <h1 className="text-3xl m-10">History</h1>
        <div>
          <h1 className="text-3xl m-10">Purchase history</h1>
        </div>
        {/* Các file user đã mua */}
        <PurchaseHistory />
        <div>
          <h1 className="text-3xl m-10">Transaction history</h1>
        </div>
        {/* Danh sách trước History và tổng doanh thu */}
        <TransactionHistory />
      </ScrollArea>
    </main>
  );
}
