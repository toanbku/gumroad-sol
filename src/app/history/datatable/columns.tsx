"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: "For Sale" | "Sold";
  revenue: number;
  prices: number;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "revenue",
    header: () => <div className="text-right">Revenue</div>,
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "prices",
    header: () => <div className="text-right">Prices</div>,
    cell: ({ row }) => {
      const prices = parseFloat(row.getValue("prices"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(prices);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
