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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SideBar from "./sidebar/page";
import { AiOutlineDollar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  description: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  uploadfile: z.string().min(0, {
    message: "Username must be at least 0 characters.",
  }),
  uploadthumnail: z.string().min(0, {
    message: "Username must be at least 0 characters.",
  }),
  price: z.string().min(0, {
    message: "Username must be at least 0 characters.",
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
    <main className="flex w-full h-screen">
      <SideBar />
      <div className="w-full h-full">
        <ScrollArea className="w-full h-full float-left bg-local hover:bg-fixed flex">
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
                        className="border-2 hover:border-black"
                        {...field}
                      />
                    </FormControl>
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
                        className="border-2 hover:border-black w-ful h-[200px]"
                        placeholder="Describe your product..."
                        {...field}
                      />
                    </FormControl>
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
                        className="mx-10 w-1/4 hover:border-black border"
                        {...field}
                      />
                    </FormControl>
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
                        className="mx-10 w-1/4 hover:border-black border"
                        {...field}
                      />
                    </FormControl>
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
                      <Label htmlFor="price" className="flex mx-10">
                        <AiOutlineDollar className="h-auto w-[30px] mx-2" />
                        <Input
                          id="price"
                          type="number"
                          className="w-1/4 hover:border-black border"
                          placeholder="Set the price"
                          {...field}
                        />
                      </Label>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="m-10 w-1/12">
                Submit
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </main>
  );
}
