"use client";

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
import { AiFillStar, AiOutlineDollar, AiOutlineStar } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import SideBar from "../components/sidebar/page";

export default function Product() {
  const form = useForm();
  return (
    <main className="h-screen w-screen flex">
      <SideBar />
      <div className="flex items-center justify-center w-5/6">
        <Card className="lg:h-5/6 lg:w-5/6 w-full h-full flex flex-wrap max-sm:flex-col border-2 border-black">
          <div className="h-1/2 w-full max-sm:h-1/3 bg-zinc-600 rounded-t-md"></div>
          <div className="w-2/3 h-1/2 max-sm:w-full max-sm:h-1/3 sm:border-r border-black rounded-es-md float-left">
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
            <CardFooter>
              <p className="mr-2">Rating</p> <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </CardFooter>
          </div>
          <div className="w-1/3 h-1/2 max-sm:w-full max-sm:h-1/3 float-right flex flex-col rounded-ee-md sm:justify-center items-center gap-4 p-2">
            <Button className="m5 w-2/3 hover:bg-slate-500 border-black border ">
              Buy it{" "}
            </Button>
            <p className="flex h-10 justify-center">
              <AiOutlineDollar className="h-auto w-[30px] mx-2" />
              <Input
                type="number"
                className="border border-black"
                placeholder="You can pay more if you want "
              />
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
