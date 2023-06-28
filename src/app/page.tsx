"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SideBar from "./sidebar/page";
import { Label } from "@/components/ui/label";
import { AiOutlineDollar } from "react-icons/ai";

export default function Home() {
  const form = useForm();

  return (
    <main className="flex w-full h-screen">
      <SideBar />
      <div className="w-full h-full">
        <ScrollArea className="w-full h-full float-left bg-local hover:bg-fixed flex">
          <Form {...form}>
            <FormField
              control={form.control}
              name="Username"
              render={(field) => (
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
              name="Description"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2 ">Description</FormLabel>
                  <FormControl>
                    {/* button bar */}
                    <Textarea
                      className="border-2 hover:border-black w-ful h-[200px]"
                      placeholder="Describe your product..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Label htmlFor="uploadfile" className="m-10 ">
              <h3 className="text-2xl mx-10 pb-2">Upload File</h3>
              <Input
                id="uploadfile"
                type="file"
                className="mx-10 w-1/4 hover:border-black border"
              />
            </Label>
            <Label htmlFor="uploadthumnail" className="m-10 ">
              <h3 className="text-2xl mx-10 pb-2">Upload Thumnail</h3>
              <Input
                id="uploadthumnail"
                type="file"
                className="mx-10 w-1/4 hover:border-black border"
              />
            </Label>
            <h3 className="text-2xl mx-10 pb-2">Price</h3>
            <Label htmlFor="prices" className="mx-10 flex mb-10">
              <AiOutlineDollar className="h-auto w-[30px] mx-2" />
              <Input
                id="prices"
                type="number"
                className="w-1/4 hover:border-black border"
                placeholder="set the prices"
              />
            </Label>
          </Form>
        </ScrollArea>
      </div>
    </main>
  );
}
