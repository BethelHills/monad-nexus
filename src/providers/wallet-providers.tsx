"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { WagmiAuthAdapterBridge } from "@/components/providers/wagmi-auth-adapter-bridge";
import { wagmiConfig } from "@/lib/wagmi-config";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function WalletProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiAuthAdapterBridge>{children}</WagmiAuthAdapterBridge>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
