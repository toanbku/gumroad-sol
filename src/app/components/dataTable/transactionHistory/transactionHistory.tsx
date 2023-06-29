import { Input } from "@/components/ui/input";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

//  {
//     id: "88fas56s",
//     status: "Sold",
//     revenue: 60,
//     prices: 60,
//     email: "leduy@example.com",
//   }

export default async function TransactionHistory() {
  return <DataTable columns={columns} data={[]} />;
}
