import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      status: "Sold",
      revenue: 105,
      prices: 35,
      email: "minhle@example.com",
    },
    {
      id: "da2421g2",
      status: "Sold",
      revenue: 75,
      prices: 25,
      email: "minhlai@example.com",
    },
    {
      id: "88fas56s",
      status: "For Sale",
      revenue: 60,
      prices: 60,
      email: "leduy@example.com",
    },
    {
      id: "asasda32",
      status: "For Sale",
      revenue: 120,
      prices: 60,
      email: "lequyen@example.com",
    },
    {
      id: "hbuir124",
      status: "For Sale",
      revenue: 100,
      prices: 100,
      email: "dinhcanh@example.com",
    },
    {
      id: "2jn24uin",
      status: "For Sale",
      revenue: 160,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },
    {
      id: "12345678",
      status: "For Sale",
      revenue: 20,
      prices: 20,
      email: "thanhphong@example.com",
    },

    // ...
  ];
  // Fetch data from your API here.
}

export default async function MarketTable() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
