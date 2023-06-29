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

  return (
    <ScrollArea>
      <h1 className="text-3xl mb-6">Markets</h1>
      <>
        {loadingAssets ? (
          <div className="text-lg font-medium">Loading...</div>
        ) : errorAssets ? (
          <div className="text-lg font-medium">Empty</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
            {dataAssets?.map((data: any, index: number) => {
              return (
                <Card className="rounded-2xl" key={index}>
                  <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                    <CardDescription>{data.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full">
                    <img src={data.image} alt="" className="rounded-2xl" />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Link href={`/files/${data.id}`}>
                      <Button className="text-base w-full bg-[#512da8] hover:bg-black">
                        More info
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </>
    </ScrollArea>
  );
}
