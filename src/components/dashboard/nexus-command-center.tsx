"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WalletStatusButton } from "@/components/wallet/wallet-status-button";
import {
  MotionButton,
  MotionReveal,
  MotionStagger,
  MotionItem,
  PulseDot,
} from "@/components/ui/motion";
import { NexusSearchBar } from "@/components/ui/nexus-search-bar";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { useWalletPortfolio } from "@/hooks/use-wallet-portfolio";
import { buildAgentChatUrl } from "@/lib/agent-prompts";
import { commandSuggestions } from "@/lib/dashboard-data";
import { easeOut, slideDown } from "@/lib/motion";

export function NexusCommandCenter() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const wallet = useWalletPortfolio();
  const [query, setQuery] = useState("");

  const goToAgent = (prompt: string) => {
    router.push(buildAgentChatUrl(prompt));
  };

  return (
    <motion.section
      className="border-b border-[#242424] bg-[#0E0E0E]/90 px-4 py-6 backdrop-blur-sm sm:px-6 lg:px-8"
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      variants={slideDown}
      transition={easeOut}
    >
      <div className="mx-auto max-w-6xl min-w-0">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <MotionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
              Dashboard
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Command center
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {wallet.isConnected ? (
                <NexusStatusBadge label="Wallet Connected" tone="wallet" />
              ) : (
                <NexusStatusBadge label="Demo intelligence data" tone="demo" />
              )}
              <NexusStatusBadge label="Aomi Powered" tone="aomi" />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08} className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
            <span className="flex w-full items-center justify-center gap-2 rounded-md border border-[#242424] bg-[#141414] px-2.5 py-1 text-xs font-medium text-[#B7FF7A] sm:w-auto">
              <PulseDot />
              {wallet.isConnected ? wallet.chainName : "Monad Testnet"}
            </span>
            <WalletStatusButton className="w-full sm:max-w-[220px]" />
          </MotionReveal>
        </div>

        <NexusSearchBar
          value={query}
          onChange={setQuery}
          onSubmit={goToAgent}
          placeholder="Command Nexus — analyze wallet, protocols, or opportunities..."
          submitLabel="Send"
          ariaLabel="Nexus command input"
          emptyHint="Type a command to open Agent Chat."
        />

        <MotionStagger className="mt-3 flex flex-wrap gap-2">
          {commandSuggestions.map((cmd) => (
            <MotionItem key={cmd}>
              <MotionButton
                type="button"
                onClick={() => goToAgent(cmd)}
                className="rounded-md border border-[#242424] px-2.5 py-1 text-xs text-[#A3A3A3] hover:border-[#14F195]/30 hover:text-white"
              >
                {cmd}
              </MotionButton>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </motion.section>
  );
}
