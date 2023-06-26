"use client";
import { ScrollArea } from "../ui/scroll-area";

export default function Sidebar() {
  return (
    <>
      <ScrollArea className="flex w-60 h-screen flex-col bg-black rounded-md float-left bg-local hover:bg-fixed">
        <h1 className="text-white h-32 text-[30px] grid content-center text-center">
          Gumroad
        </h1>
        <a
          href="/"
          className=" text-white w-ful h-[60px] p-5 grid content-center border-white border-t-[1px] border-opacity-70 link hover:text-red-400"
        >
          Home
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70 "
        >
          Products
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70 "
        >
          Checkout
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400  border-opacity-70"
        >
          Post
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Audience
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Analytics
        </a>
        <div className="border-t-2 w-ful h-[60px] p-5 grid content-center border-white border-opacity-70"></div>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Paylouts
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Discover
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Library
        </a>
        <div className="border-t-2 w-ful h-[60px] p-5 grid content-center border-white "></div>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Help
        </a>
        <a
          href="/"
          className="link text-white border-t-2 w-ful h-[60px] p-5 grid content-center border-white hover:text-red-400 border-opacity-70"
        >
          Settings
        </a>
      </ScrollArea>
    </>
  );
};
