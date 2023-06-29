"use client";

import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import axios, { AxiosError } from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

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
    </>
  );
}

export const Wallet: FC = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          {/* Your app's components go here, nested within the context providers. */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
