"use client";

import { useAccount, useBalance } from "wagmi";
import { MONAD_TESTNET_CHAIN_ID } from "@/lib/chains/monad";
import { formatNativeBalance, truncateAddress } from "@/lib/format";
import { walletReport } from "@/lib/dashboard-data";

export function useWalletPortfolio() {
  const { address, isConnected, chain } = useAccount();
  const chainId = chain?.id;

  const {
    data: balance,
    isLoading: balanceLoading,
    isError: balanceError,
    isFetched,
  } = useBalance({
    address,
    chainId: chainId ?? MONAD_TESTNET_CHAIN_ID,
    query: { enabled: Boolean(isConnected && address && chainId) },
  });

  const isMonadChain = chainId === MONAD_TESTNET_CHAIN_ID;
  const isDemoMode = !isConnected;

  let balanceDisplay: string;
  let balanceNote: string | null = null;

  if (isDemoMode) {
    balanceDisplay = walletReport.portfolioEstimate;
  } else if (!chainId) {
    balanceDisplay = "—";
    balanceNote = "Select a network in your wallet";
  } else if (!isMonadChain) {
    balanceDisplay = balance
      ? formatNativeBalance(balance.value, balance.decimals, balance.symbol)
      : balanceLoading
        ? "Loading…"
        : "—";
    balanceNote = `Connected on ${chain?.name ?? "network"} — switch to Monad Testnet for MON balance`;
  } else if (balanceLoading && !isFetched) {
    balanceDisplay = "Loading…";
  } else if (balanceError || !balance) {
    balanceDisplay = "Unavailable";
    balanceNote =
      "Live wallet connected — Monad balance unavailable on current RPC";
  } else {
    balanceDisplay = formatNativeBalance(
      balance.value,
      balance.decimals,
      balance.symbol,
    );
  }

  return {
    isConnected,
    isDemoMode,
    address,
    truncatedAddress: truncateAddress(address),
    chainName: chain?.name ?? "Not connected",
    chainId,
    isMonadChain,
    balanceDisplay,
    balanceNote,
    balanceLoading,
    statusLabel: isDemoMode
      ? "Demo mode · sample data"
      : `Connected · ${truncateAddress(address)}`,
    portfolioEstimate: isDemoMode
      ? walletReport.portfolioEstimate
      : balanceDisplay,
    riskPosture: walletReport.riskPosture,
    activeSectors: walletReport.activeSectors,
    recentSignals: walletReport.recentSignals,
  };
}
