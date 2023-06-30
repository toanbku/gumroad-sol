"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { AiOutlineDollar, AiOutlineStar } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

interface IProps {
  params: {
    slug: string;
  };
}

export default function AssetDetail({ params }: IProps) {
  const form = useForm();
  const { connected } = useWallet();

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

  return (
    <ScrollArea>
      <Card className="w-full h-full border-2 border-black">
        <CardHeader>
          <CardTitle>Name Product</CardTitle>
          <CardDescription>Description ...</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="Buy"
              render={(field) => (
                <FormItem className="border border-black p-3 rounded-md ">
                  <FormControl>
                    <div className="flex flex-row items-center flex-wrap">
                      <div className="flex flex-row items-center">
                        <AiOutlineDollar className="" />
                        1000
                      </div>
                      <div className="URL ml-3">
                        nguyenxuananhuong.com/nameproduct
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        {connected ? (
          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-center gap-2 w-full">
              <AiOutlineDollar className="h-auto w-[30px]" />
              <Input
                type="number"
                step="0.01"
                className="border-black border"
                min={0}
                placeholder="You can pay more if you want"
              />
            </div>
            <Button className="text-base w-full bg-[#512da8] hover:bg-black">
              Buy it
            </Button>
          </CardFooter>
        ) : (
          <div className="mx-6 pb-4">Please login to buy this file</div>
        )}
      </Card>
    </ScrollArea>
  );
}
