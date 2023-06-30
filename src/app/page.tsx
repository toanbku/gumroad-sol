"use client";

import Link from "next/link";
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

const getAssets = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("https://gumstreet.vercel.app/api/assets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function Home() {
  const {
    data: dataAssets,
    error: errorAssets,
    isLoading: loadingAssets,
  } = useQuery<any>({
    queryFn: () => getAssets(),
    queryKey: ["assets"],
  });

  if (loadingAssets) {
    return <div className="text-lg font-medium">Loading...</div>;
  }

  if (errorAssets) {
    return <div className="text-lg font-medium">Empty</div>;
  }

  return (
    <ScrollArea>
      <h1 className="text-3xl md:text-4xl mb-3 md:mb-6 font-bold">Markets</h1>
      <Separator className="my-3 md:my-6" />
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {dataAssets?.map((data: any, index: number) => {
          return (
            <Card className="rounded-md md:rounded-xl" key={index}>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
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
                <Link href={`/files/${data.id}`}>
                  <Button className="text-base w-full" variant="secondary">
                    More info
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
