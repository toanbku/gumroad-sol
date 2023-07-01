"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getMyAsset } from "@/services/api";
import { currencyFormat } from "@/utils/function";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreditCard, DollarSign } from "lucide-react";

export default function Statistics() {
  const { connected } = useWallet();

  const { data, error, isLoading } = useQuery<any>({
    queryFn: () => getMyAsset(),
    queryKey: ["history"],
    // Refetch the data every second
    refetchInterval: connected ? 20000 : 0,
  });

  const innerChildren = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencyFormat(0)}</div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Week Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencyFormat(5231.89)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencyFormat(631.89)}</div>
          </CardContent>
        </Card> */}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">
        Statistics
      </h1>
      <Separator className="my-3 md:my-6" />
      {/* <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4"> */}
      {innerChildren()}
    </div>
  );
}
