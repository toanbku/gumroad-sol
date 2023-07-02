"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LoaderIcon, LucideWallet } from "lucide-react";
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
import { currencyFormat } from "@/utils/function";

const listType = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "My Assets",
    value: "my",
  },
];

const shorterAddress = (string: string) => {
  return string ? string.slice(0, 6) + "..." + string.substr(-4) : string;
};

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
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const filteredDataAssets =
    selectedType === "all"
      ? dataAssets
      : dataAssets.filter((item: any) => item?.owner === addressWallet);

  const handleBuyAssets = async (id: string) => {
    setIsBuying(true);
    try {
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
      setIsBuying(false);
    } catch (e) {
      console.error("e: ", e);
      setIsBuying(false);
    }
  };

  if (loadingAssets) {
    return <div className="text-lg font-medium">Loading...</div>;
  }

  if (errorAssets) {
    return <div className="text-lg font-medium">Empty</div>;
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">Markets</h1>
      <Separator className="my-3 md:my-6" />
      <div className="flex gap-2 justify-end mb-3 md:mb-6">
        {listType.map((item) => {
          return (
            <div
              key={item.value}
              className={`border-r-[1px] border-gray-400 pr-2 last:pr-0 last:border-none cursor-pointer ${
                item.value === selectedType ? "font-semibold" : ""
              }`}
              onClick={() => setSelectedType(item.value)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {filteredDataAssets?.length === 0 ? (
          <div className="text-lg font-medium">Empty</div>
        ) : (
          <>
            {filteredDataAssets?.map((data: any) => {
              return (
                <Card className="rounded-md md:rounded-xl" key={data.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{data.title}</CardTitle>
                      <CardTitle>{currencyFormat(data.price)}</CardTitle>
                    </div>
                    <CardDescription>
                      <div className="flex flex-col">
                        <div>{data.description}</div>
                        <div className="flex gap-1 items-center mt-2">
                          <LucideWallet height={16} width={16} />
                          {shorterAddress(data.owner)}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-full relative">
                    <div className="relative aspect-square">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SUPABASE_URL! +
                          "/storage/v1/object/public/images/" +
                          data.image
                        }
                        className="object-cover rounded-md md:rounded-xl"
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
                        onClick={() => {
                          setSelectedItem(data.id);
                          handleBuyAssets(data.id);
                        }}
                        disabled={isBuying && selectedItem === data.id}
                      >
                        <div className="flex items-center gap-1">
                          {isBuying && selectedItem === data.id && (
                            <LoaderIcon className="animate-spin" />
                          )}
                          Buy it
                        </div>
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
          </>
        )}
      </div>
    </div>
  );
}
