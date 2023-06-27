"use client";

import { AiOutlineDollar, AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./style.css";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function Product() {
  const form = useForm();
  return (
    <main className="container h-full">
      <div className="form w-[80%] h-[70%]">
        <div className="w-full h-1/2 bg-zinc-600"></div>
        <div className="w-2/3 h-1/2 border-r-2  float-left">
          <Form {...form}>
            <FormField
              control={form.control}
              name="Buy"
              render={(field) => (
                <FormItem className="m-10">
                  <FormLabel className="text-2xl p-5">
                    Name the product
                  </FormLabel>
                  <FormControl className="w-full p-5 border border-black">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row items-center w-1/5">
                        <AiOutlineDollar className="h-auto w-[30px] mx-3" />
                        1000
                      </div>
                      <div className="URL h-auto">
                        nguyenxuananhuong.com/nametheproduct
                      </div>
                      <div className="flex flex-row items-center ml-3 pl-3 border-l-2 border-black">
                        Rating <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="m-5 text-slate-700">
                    Description here
                  </FormDescription>
                </FormItem>
              )}
            />
          </Form>
        </div>
        <div className="w-1/3 h-1/2 float-right flex flex-col justify-center">
          <Button className="mx-5 mb-5 hover:bg-slate-500 border-black border">
            Buy it{" "}
          </Button>
          <p className="flex  h-10 ml-2">
            <AiOutlineDollar className="h-auto w-[30px] mx-3" />
            <Input
              type="text"
              className=" w-[75%] h-auto border boder-black"
              placeholder="You can pay more if you want "
            />
          </p>
        </div>
      </div>
    </main>
  );
}
