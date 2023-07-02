import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function StatisticTable(props: any) {
  return <DataTable columns={columns()} data={props.data} />;
}
