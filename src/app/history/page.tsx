"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import PurchaseHistory from "../components/dataTable/purchaseHistory";

export default function History() {
  return (
    <ScrollArea>
      <PurchaseHistory />
    </ScrollArea>
  );
}
