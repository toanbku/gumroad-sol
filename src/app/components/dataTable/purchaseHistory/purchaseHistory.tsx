import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getPurchaseHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("https://gumstreet.vercel.app/api/assets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function PurchaseHistory() {
  const {
    data: dataPurchaseHistory,
    error: errorPurchaseHistory,
    isLoading: loadingPurchaseHistory,
  } = useQuery<any>({
    queryFn: () => getPurchaseHistory(),
    queryKey: ["purchase-history"],
    // Refetch the data every second
    refetchInterval: 5000,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Purchase history</h1>
      {loadingPurchaseHistory ? (
        <div>Loading...</div>
      ) : errorPurchaseHistory ? (
        <div>Empty</div>
      ) : (
        <DataTable columns={columns} data={dataPurchaseHistory || []} />
      )}
    </div>
  );
}
