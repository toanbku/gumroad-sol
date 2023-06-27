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
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CommandBar from "@/components/command";

export default function Home() {
  const form = useForm();
  const [name, setName] = useState("Life of Pi");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const copyURL = (e: any) => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      e.target.focus();
      console.log("copied");
    } else {
      console.log("can not copy");
    }
  };

  return (
    <main className="flex w-full h-screen">
      <CommandBar />
      <div className="w-full h-full">
        <header className="h-1/4 border-b-2 border-black">
          <h1 className="text-4xl p-10">{name}</h1>
          <div className="ml-5"></div>
          <Menubar className="mx-10 w-1/3 border-b-2 border-black">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/product">Product</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <a href="/history">History</a>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <a href="/">Share</a>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Bla bla</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </header>
        <ScrollArea className="w-4/6 h-3/4 float-left bg-local hover:bg-fixed flex ">
          <Form {...form}>
            <FormField
              control={form.control}
              name="Username"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2">
                    Name the product
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name the product"
                      className="border-2 border-black"
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
            <FormField
              control={form.control}
              name="URL"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl pb-2">
                    <h1 className="float-left">URL</h1>
                    <button
                      className="float-right underline text-lg"
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
                        className="border-2 hover:border-black w-ful"
                        placeholder="Change your URL..."
                      />
                      <hr className="w-full mt-10" />
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
                  <FormLabel className="text-2xl pb-2">Cover</FormLabel>
                  <FormControl></FormControl>
                </FormItem>
              )}
            />
          </Form>
        </ScrollArea>
        <ScrollArea className="w-2/6 h-3/4 float-right">
          <h1 className="text-2xl m-10 ">Preview</h1>
        </ScrollArea>
      </div>
    </main>
  );
}
