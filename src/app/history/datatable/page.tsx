import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "Sold",
      revenue: 100,
      prices: 35,
      email: "minhle@example.com",
    },
    {
      id: "da2421g2",
      status: "For Sale",
      revenue: 75,
      prices: 25,
      email: "minhlai@example.com",
    },
    {
      id: "88fas56s",
      status: "Sold",
      revenue: 47,
      prices: 60,
      email: "leduy@example.com",
    },
    // ...
  ];
}

export default async function TableData() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
