"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATE_TIME_FORMAT } from "@/utils/constants";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {

// };

export const columns: (props: {
  handleDownload: (assetId: string) => void;
}) => ColumnDef<any>[] = ({ handleDownload }) => [
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Id
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
          <img
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL! +
              "/storage/v1/object/public/images/" +
              row.original?.Transaction?.[0]?.Assets?.image
            }
            alt=""
            width={32}
            height={32}
            className="object-cover rounded-md md:rounded-xl"
          />
          <div>{row.original?.Transaction?.[0]?.Assets?.title}</div>
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
      return (
        <div className="text-center pr-14">
          ${row.original?.Transaction?.[0]?.Assets?.price}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.createdAt
            ? format(new Date(row.original.createdAt), DATE_TIME_FORMAT)
            : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "download",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Download
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Button
          disabled={row.original.status !== "Successful"}
          onClick={() => {
            handleDownload(row.original.Transaction?.[0]?.assetId);
          }}
        >
          Download
        </Button>
      );
    },
  },
];
