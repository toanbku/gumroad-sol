"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineDollar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  // asset: z.any().refine((files) => files?.length == 1, "Asset is required."),
  // coverImage: z
  //   .any()
  //   .refine((files) => {
  //     console.log(files);
  //     return files?.length == 1;
  //   }, "Image is required.")
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg, .png and .webp files are accepted."
  //   ),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
});

export default function Home() {
  const { connected } = useWallet();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formatFormData = {
      title: data.name,
      description: data.description,
      price: Number(data.price),
      // coverImage: data.coverImage,
      // asset: data.asset,
      file: "/assets/example.png",
      image: "https://imgur.com/M0l5SDh.png",
    };

    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://gumstreet.vercel.app/api/assets",
      {
        data: formatFormData,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("response: ", response);

    form.reset();
  }

  return (
    <ScrollArea>
      <h1 className="text-4xl mb-6 font-bold">Upload</h1>
      {connected ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name the product"
                      className="border border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border border-black h-[200px]"
                      placeholder="Describe your product..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex md:flex-row flex-col gap-6">
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl">Upload File</FormLabel>
                    <FormControl>
                      <Input
                        id="asset"
                        type="file"
                        className="border-black border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl">Upload Thumnail</FormLabel>
                    <FormControl>
                      <Input
                        id="coverImage"
                        type="file"
                        className="border-black border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Price</FormLabel>
                  <FormControl>
                    <Label htmlFor="price" className="flex">
                      <AiOutlineDollar className="h-auto w-[30px] mx-2" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        className="border-black border"
                        placeholder="Set the price"
                        min={0}
                        {...field}
                      />
                    </Label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="md:w-[150px] text-base w-full bg-[#512da8] hover:bg-black"
              >
                Upload
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="text-lg font-medium">
          Please login to upload your file
        </div>
      )}
    </ScrollArea>
  );
}
