"use client";

import { useConnect, useDisconnect, useAccount } from "wagmi";
import { Loader2, Wallet } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { truncateAddress } from "@/lib/format";
import { cn } from "@/lib/utils";

type WalletStatusButtonProps = {
  className?: string;
  compact?: boolean;
};

export function WalletStatusButton({
  className,
  compact = false,
}: WalletStatusButtonProps) {
  const mounted = useMounted();
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 min-w-[120px] animate-pulse rounded-lg border border-[#242424] bg-[#141414]",
          className,
        )}
        aria-hidden
      />
    );
  }

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Click to disconnect"
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-lg border border-[#14F195]/30 bg-[#14F195]/10 px-3 py-1.5 text-left text-xs font-medium text-white transition-colors hover:border-[#14F195]/50",
          className,
        )}
      >
        <Wallet size={14} className="shrink-0 text-[#14F195]" />
        <span className="flex min-w-0 flex-col items-start leading-tight">
          <span className="font-mono text-[#14F195]">
            {truncateAddress(address)}
          </span>
          {!compact && (
            <span className="text-[10px] text-[#A3A3A3]">
              {chain?.name ?? "Unknown network"}
            </span>
          )}
        </span>
      </button>
    );
  }

  const connector =
    connectors.find((c) => c.id === "injected") ?? connectors[0];

  return (
    <button
      type="button"
      disabled={isPending || !connector}
      onClick={() => connector && connect({ connector })}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#14F195]/40 disabled:opacity-60 sm:w-auto",
        className,
      )}
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin text-[#14F195]" />
      ) : (
        <Wallet size={14} className="text-[#14F195]" />
      )}
      {isPending ? "Connecting…" : "Connect Wallet"}
      {error && (
        <span className="sr-only">{error.message}</span>
      )}
    </button>
  );
}
