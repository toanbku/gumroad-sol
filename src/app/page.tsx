"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SideBar from "./components/sideBar/sideBar";
import { AiOutlineDollar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MobileSheet from "./components/mobileSheet";
import { Description } from "@radix-ui/react-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  uploadfile: z.string().min(1, {
    message: "Upload file is required.",
  }),
  uploadthumnail: z.string().min(1, {
    message: "Upload thumbnail is required.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
});
export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <main className=" w-full h-screen grid grid-col-2 sm:flex">
      <SideBar />
      <MobileSheet />
      <div className="w-full h-full">
        <ScrollArea className="w-full h-full float-left bg-local flex">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="m-10">
                    <FormLabel className="text-2xl pb-2">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name the product"
                        className="border-2 border-black"
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
                  <FormItem className="m-10">
                    <FormLabel className="text-2xl pb-2 ">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-2 border-black w-ful h-[200px]"
                        placeholder="Describe your product..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uploadfile"
                render={({ field }) => (
                  <FormItem className="m-10">
                    <FormLabel className="text-2xl pb-2 ">
                      Upload File
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="uploadfile"
                        type="file"
                        className="sm:w-[400px] border-black border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uploadthumnail"
                render={({ field }) => (
                  <FormItem className="m-10">
                    <FormLabel className="text-2xl pb-2 ">
                      Upload Thumnail
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="uploadthumnail"
                        type="file"
                        className="sm:w-[400px] border-black border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="m-10">
                    <FormLabel className="text-2xl pb-2 ">Price</FormLabel>
                    <FormControl>
                      <Label htmlFor="price" className="flex">
                        <AiOutlineDollar className="h-auto w-[30px] mx-2" />
                        <Input
                          id="price"
                          type="number"
                          className="  sm:w-[400px] border-black border"
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
              <div className="flex mb-5 max-lg:justify-center">
                <Button
                  type="submit"
                  className="mx-10 w-[200px] md:items-center "
                >
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </main>
  );
}
