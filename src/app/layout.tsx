"use client";

import { Inter } from "next/font/google";
import SolanaProvider from "@/utils/SolanaProvider";
import QueryProvider from "@/utils/QueryProvider";

import Sidebar from "./components/Sidebar";
import MenuMobile from "./components/MenuMobile";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <SolanaProvider>
            <div className="flex">
              <div className="lg:block hidden border-r-[1px] w-[280px]">
                <Sidebar />
              </div>
              <div className="flex-1 relative">
                <div className="lg:hidden block absolute top-2 left-3 z-10">
                  <MenuMobile />
                </div>
                <div className="max-w-screen-xl mx-auto px-10 pb-10 lg:pt-10 pt-16 h-screen overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </SolanaProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
