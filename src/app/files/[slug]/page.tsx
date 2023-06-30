"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  params: {
    slug: string;
  };
}

const getAssetDetail = async (id: string) => {
  const res = await axios.get(`https://gumstreet.vercel.app/api/assets/${id}`);
  return res.data.data;
};

export default function AssetDetail({ params }: IProps) {
  const { connected } = useWallet();

  const {
    data: dataAssetDetail,
    error: errorAssetDetail,
    isLoading: loadingAssetDetail,
  } = useQuery({
    queryFn: () => getAssetDetail(params.slug),
    queryKey: ["asset-detail"],
  });

  // const handleBuyAssets = async () => {
  //   const token = localStorage.getItem("token");
  //   const response = await axios.post(
  //     "https://gumstreet.vercel.app/api/payment/create-session",
  //     {
  //       data: [
  //         {
  //           id: params.slug,
  //           quantity: 4,
  //         },
  //       ],
  //     },
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   if (response) {
  //     window.location.replace(response.data.payment_url);
  //   }
  // };

  if (loadingAssetDetail) {
    return <div className="text-lg font-medium">Loading...</div>;
  }

  if (errorAssetDetail) {
    return <div className="text-lg font-medium">Empty</div>;
  }

  return (
    <ScrollArea>
      <Card className="rounded-2xl w-max">
        <CardHeader>
          <CardTitle>{dataAssetDetail.title}</CardTitle>
          <CardDescription>{dataAssetDetail.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center mb-2">
            Price: ${dataAssetDetail.price}
          </div>
          <img
            src={dataAssetDetail.image}
            alt=""
            className="rounded-xl w-[300px] h-[300px]"
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          {connected ? (
            <Button className="text-base w-full bg-[#512da8] hover:bg-black">
              Buy it
            </Button>
          ) : (
            <div className="text-lg font-medium">
              Please login to buy this file
            </div>
          )}
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
