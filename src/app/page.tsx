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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Sidebar from "@/components/sidebar";

export default function Home() {
  const form = useForm();
  const [name, setName] = useState("Life of Pi");
  const textAreaRef = useRef(null);

  const copyURL = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    console.log("copy!");
  };

  return (
    <main className="flex w-full h-screen">
      <Sidebar />
      <div className="w-full h-full">
        <div className="h-1/4">
          <h1 className="text-4xl p-10 text-white ">{name}</h1>
          <div className="ml-5">
            <Link
              href="/product"
              className="gap-2 p-3 m-5 rounded-full bg-black border-white border-[1px] text-white"
            >
              Product
            </Link>
            <a
              href="/history"
              className="gap-2 p-3 m-5 rounded-full bg-black border-white border-[1px] text-white"
            >
              History
            </a>
            <a
              href="/"
              className="gap-2 p-3 m-5 rounded-full bg-black border-white border-[1px] text-white"
            >
              Share
            </a>
          </div>
          <hr className="mb-10 mt-10 " />
        </div>
        <ScrollArea className="w-4/6 h-3/4 float-left bg-local hover:bg-fixed flex ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="Username"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2 text-white">
                    Name the product
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name the product"
                      className=""
                      onChange={(e) => setName(e.target.value)}
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
                  <FormLabel className="text-2xl pb-2 text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    {/* button bar */}
                    <Textarea
                      className="text-white hover:border-red-400 w-ful h-[200px]"
                      placeholder="Describe your product..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="URL"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2 text-white">
                    <h1 className="float-left">URL</h1>
                    <button
                      className="float-right underline text-xl"
                      onClick={(e) => copyURL(e)}
                    >
                      Copy URL
                    </button>
                  </FormLabel>
                  <FormControl>
                    {/* button bar */}
                    <div>
                      <Textarea
                        ref={textAreaRef}
                        className="text-white hover:border-red-400 w-ful"
                        placeholder="Change your URL..."
                      />
                      <hr className="w-full text-white mt-10" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Cover"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2 text-white">
                    Cover
                  </FormLabel>
                  <FormControl></FormControl>
                </FormItem>
              )}
            />
          </Form>
        </ScrollArea>
        <ScrollArea className="w-2/6 h-3/4 float-right">
          <h1 className="text-2xl text-white m-10 ">Preview</h1>
        </ScrollArea>
      </div>
    </main>
  );
}
