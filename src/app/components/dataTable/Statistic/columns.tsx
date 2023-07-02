"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { currencyFormat } from "@/utils/function";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {

// };

const shorterAddress = (string: string) => {
  return string ? string.slice(0, 6) + "..." + string.substr(-4) : string;
};

export const columns: () => ColumnDef<any>[] = () => [
  {
    accessorKey: "asset",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Image
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL! +
              "/storage/v1/object/public/images/" +
              row.original?.image
            }
            alt=""
            width={32}
            height={32}
            className="object-cover rounded-md md:rounded-xl"
          />
          <div>{row.original?.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "assetPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{currencyFormat(row.original?.price)}</div>;
    },
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original?.orderId}</div>;
    },
  },
  {
    accessorKey: "token",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Token
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original?.PaymentSessions?.amountOut} SOL</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {currencyFormat(row.original?.PaymentSessions?.paymentOut ?? 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "trxHash",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trx Hash
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`https://explorer.solana.com/tx/${row.original?.PaymentSessions?.txnHash}?cluster=devnet`}
          target="_blank"
        >
          <p className="underline">
            {shorterAddress(row.original?.PaymentSessions?.txnHash)}
          </p>
        </Link>
      );
    },
  },
];
