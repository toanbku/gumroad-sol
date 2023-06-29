"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAssets = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("https://gumstreet.vercel.app/api/assets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function MarketPlace() {
  const {
    data: dataAssets,
    error: errorAssets,
    isLoading: loadingAssets,
  } = useQuery<any>({
    queryFn: () => getAssets(),
    queryKey: ["assets"],
  });

  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 mx-10">
      {dataAssets?.map((data: any, index: number) => {
        return (
          <Card className="rounded-2xl" key={index}>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>{data.description}</CardDescription>
              <div className="flex gap-2">
                Price:
                <div>{data.price}</div>
              </div>
            </CardHeader>
            <CardContent className="w-full">
              <img src={data.image} alt="" className="rounded-2xl" />
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg uppercase font-semibold">
                Buy
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
