"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

const listType = [
  {
    label: "ALL",
    value: "all",
  },
  {
    label: "MY ASSETS",
    value: "my",
  },
];

const getAssets = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("https://gumstreet.vercel.app/api/assets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function Home() {
  const { publicKey, connected } = useWallet();
  const addressWallet = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const {
    data: dataAssets,
    error: errorAssets,
    isLoading: loadingAssets,
  } = useQuery<any>({
    queryFn: () => getAssets(),
    queryKey: ["assets"],
  });
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredDataAssets =
    selectedType === "all"
      ? dataAssets
      : dataAssets.filter((item: any) => item?.owner === addressWallet);

  const handleBuyAssets = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://gumstreet.vercel.app/api/payment/create-session",
      {
        data: [
          {
            id,
            quantity: 1,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response) {
      window.location.replace(response.data.payment_url);
    }
  };

  if (loadingAssets) {
    return <div className="text-lg font-medium">Loading...</div>;
  }

  if (errorAssets) {
    return <div className="text-lg font-medium">Empty</div>;
  }

  return (
    <ScrollArea>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">Markets</h1>
        <div className="flex gap-2">
          {listType.map((item) => {
            return (
              <div
                key={item.value}
                className={`border-r-[1px] border-gray-400 pr-2 last:pr-0 last:border-none cursor-pointer font-medium ${
                  item.value === selectedType ? "text-[#512da8]" : ""
                }`}
                onClick={() => setSelectedType(item.value)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-3 md:my-6" />
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {filteredDataAssets?.map((data: any, index: number) => {
          return (
            <Card className="rounded-md md:rounded-xl" key={index}>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
                <div className="font-medium">${data.price}</div>
              </CardHeader>
              <CardContent className="w-full relative">
                <div className="relative aspect-square">
                  <Image
                    src={data.image}
                    className="rounded-md md:rounded-xl"
                    alt=""
                    fill
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {/* <Link href={`/files/${data.id}`}>
                  <Button className="text-base w-full" variant="secondary">
                    More info
                  </Button>
                </Link> */}
                {connected ? (
                  <Button
                    className="text-base w-full"
                    onClick={() => handleBuyAssets(data.id)}
                  >
                    Buy it
                  </Button>
                ) : (
                  <div className="text-lg font-medium">
                    Please login to buy this file
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
