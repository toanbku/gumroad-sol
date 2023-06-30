import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";

const getPurchaseHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("https://gumstreet.vercel.app/api/my-assets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function PurchaseHistory() {
  const { connected } = useWallet();

  const {
    data: dataPurchaseHistory,
    error: errorPurchaseHistory,
    isLoading: loadingPurchaseHistory,
  } = useQuery<any>({
    queryFn: () => getPurchaseHistory(),
    queryKey: ["purchase-history"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Purchase history</h1>
      {connected ? (
        <>
          {loadingPurchaseHistory ? (
            <div>Loading...</div>
          ) : errorPurchaseHistory ? (
            <div>Empty</div>
          ) : (
            <DataTable columns={columns} data={dataPurchaseHistory || []} />
          )}
        </>
      ) : (
        <div className="text-lg font-medium">
          Please login to check your purchase history
        </div>
      )}
    </div>
  );
}
