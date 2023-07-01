import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { Separator } from "@/components/ui/separator";
import { downloadAsset, getHistory } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

export default function HistoryTable() {
  const { connected } = useWallet();

  const {
    data: dataPurchaseHistory,
    error: errorPurchaseHistory,
    isLoading: loadingPurchaseHistory,
  } = useQuery<any>({
    queryFn: () => getHistory(),
    queryKey: ["history"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  const onDownload = async (assetId: string) => {
    try {
      const data = await downloadAsset(assetId);
      window.location.replace(data.signedUrl);
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message,
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Purchase history
      </h1>
      <Separator className="my-3 md:my-6" />
      {connected ? (
        <>
          {loadingPurchaseHistory ? (
            <div>Loading...</div>
          ) : errorPurchaseHistory ? (
            <div>Empty</div>
          ) : (
            <DataTable
              columns={columns({
                handleDownload: onDownload,
              })}
              data={dataPurchaseHistory || []}
            />
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
