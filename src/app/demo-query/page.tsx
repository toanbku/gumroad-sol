"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const fetchAddress = async (address: string) => {
  const res = await axios.get(
    "https://gumstreet.vercel.app/api/nonce?address=" + address
  );
  console.log(res.data);
  return {
    nonce: res.data.nonce,
    address: res.data.address,
  };
};

function ApiWallet() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchAddress("BXhKaetQ4fA8jfUrYoBhcfZTeKt58QMomcvfMzkKa3X4"),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data?.nonce} <br />
      {data?.address}
    </>
  );
}

export default function DemoQuery() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApiWallet />
      </QueryClientProvider>
    </>
  );
}
