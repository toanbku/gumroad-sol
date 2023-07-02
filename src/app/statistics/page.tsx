"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMyAsset } from "@/services/api";
import { currencyFormat } from "@/utils/function";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreditCard, DollarSign } from "lucide-react";
import { flatten } from "lodash";

import StatisticTable from "../components/DataTable/Statistic";
import { MyAssetResponse } from "@/types/my-asset";
import { AxiosResponse } from "axios";

export default function Statistics() {
  const { connected } = useWallet();

  const { data, error, isLoading } = useQuery<AxiosResponse<MyAssetResponse>>({
    queryFn: () => getMyAsset(),
    queryKey: ["my-asset"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  const formatData =
    data?.data.data.map((item) => {
      return {
        ...item,
        TransactionPrice: item.Transaction.filter(
          (txn: any) => txn.PaymentSessions
        ).map((trx: any) => {
          return {
            amount: trx.PaymentSessions?.paymentOut,
          };
        }),
      };
    }) || [];

  const listDataPayment = formatData.map((item) => {
    return item.TransactionPrice;
  });

  const totalRevenue: number = (flatten(listDataPayment) || []).reduce(
    (prev: number, item) => prev + Number(item.amount),
    0
  );

  const formatStructData = formatData.map((item) => {
    return {
      data: item.Transaction.filter((txn) => txn.PaymentSessions).map((trx) => {
        return {
          ...trx,
          description: item.description,
          id: item.id,
          image: item.image,
          price: item.price,
          title: item.title,
        };
      }),
    };
  });

  const innerChildren = () => {
    if (isLoading) {
      return <div className="text-lg font-medium">Loading...</div>;
    }

    if (error) {
      return <div className="text-lg font-medium">Empty</div>;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Assets
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.data.data.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currencyFormat(totalRevenue ?? 0)}
              </div>
            </CardContent>
          </Card>
        </div>
        <StatisticTable
          data={flatten(formatStructData.map((item) => item.data))}
        />
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Statistics
      </h1>
      <Separator className="my-3 md:my-6" />
      {innerChildren()}
    </div>
  );
}
