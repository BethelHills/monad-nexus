"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { AomiApiKeyRuntimeDiagnostics } from "@/components/agent-chat/aomi-api-key-diagnostics";
import { logAomiApiKeyDiagnostics } from "@/lib/aomi-api-key-debug";
import "@/components/default.css";
import "@/components/agent-chat/monad-nexus-aomi-theme.css";
import { AomiFrame } from "@/components/aomi-frame";
import { AgentStructuredCards } from "@/components/agent-chat/agent-structured-cards";
import { MonadNexusChatBootstrap } from "@/components/agent-chat/monad-nexus-chat-bootstrap";
import {
  MotionButton,
  MotionCard,
  MotionReveal,
} from "@/components/ui/motion";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { useWalletPortfolio } from "@/hooks/use-wallet-portfolio";
import {
  detectStructuredCards,
  findMockResponse,
} from "@/lib/agent-chat-data";
import { cn } from "@/lib/utils";
import { useAomiRuntime } from "@aomi-labs/react";
import { Bot, ShieldCheck, Sparkles, Wallet } from "lucide-react";

export const monadNexusSuggestedPrompts = [
  "What protocols are active on Monad?",
  "Analyze my Monad wallet",
  "Show staking opportunities on Monad",
  "Compare Kuru, Ambient, Apriori, and Magma",
  "Explain recent Monad ecosystem activity",
] as const;

const structuredKeywordPattern =
  /wallet|protocol|staking|yield|opportunity|ecosystem/i;

type MonadNexusAomiChatProps = {
  initialPrompt?: string;
  aomiApiKey?: string;
  className?: string;
};

function MonadNexusChatShell({
  aomiApiKey,
  initialPrompt,
  autoSendInitial,
  onPromptActivity,
}: {
  aomiApiKey?: string;
  initialPrompt?: string;
  autoSendInitial?: boolean;
  onPromptActivity: (prompt: string) => void;
}) {
  const { sendMessage, isRunning } = useAomiRuntime();
  const wallet = useWalletPortfolio();
  const [lastPrompt, setLastPrompt] = useState("");

  const handlePrompt = useCallback(
    async (text: string) => {
      if (isRunning) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      setLastPrompt(trimmed);
      onPromptActivity(trimmed);
      await sendMessage(trimmed);
    },
    [isRunning, onPromptActivity, sendMessage],
  );

  const fallbackCards = useMemo(() => {
    if (!lastPrompt || !structuredKeywordPattern.test(lastPrompt)) {
      return null;
    }
    const types = detectStructuredCards(lastPrompt);
    if (types.length === 0) return null;
    return findMockResponse(lastPrompt).structuredCards ?? null;
  }, [lastPrompt]);

  const walletContextText = wallet.isConnected
    ? `${wallet.truncatedAddress} · ${wallet.chainName} · ${wallet.balanceDisplay}${wallet.balanceNote ? ` — ${wallet.balanceNote}` : ""}`
    : "Connect a wallet in the chat controls for personalized Monad analysis.";

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,260px)]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-h-[min(48vh,420px)] max-h-[min(82vh,calc(100dvh-10rem))] flex-col overflow-hidden rounded-xl border border-[#242424] bg-[#0E0E0E] sm:min-h-[min(56vh,520px)]">
          <div className="shrink-0 border-b border-[#242424] px-3 py-3 sm:px-5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#242424] bg-[#141414] text-[#14F195]">
                <Sparkles size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Aomi Agent</p>
                <p className="text-xs text-[#A3A3A3]">
                  Monad ecosystem intelligence · wallet-aware
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <NexusStatusBadge label="Aomi Powered" tone="aomi" />
                {wallet.isConnected ? (
                  <NexusStatusBadge label="Wallet Connected" tone="wallet" />
                ) : (
                  <NexusStatusBadge label="Demo" tone="demo" />
                )}
              </div>
            </div>
          </div>

          <div className="monad-nexus-aomi-thread dark relative min-h-0 flex-1 overflow-hidden">
            <Suspense fallback={null}>
              <MonadNexusChatBootstrap
                initialPrompt={initialPrompt}
                autoSend={autoSendInitial}
                onPromptSent={(prompt) => {
                  setLastPrompt(prompt);
                  onPromptActivity(prompt);
                }}
              />
            </Suspense>
            <AomiFrame.Composer
              withControl
              className="flex h-full min-h-0 flex-col"
              controlBarProps={{
                hideWallet: false,
                hideNetwork: false,
                hideApp: true,
                hideModel: false,
                hideApiKey: Boolean(aomiApiKey),
              }}
            />
          </div>
        </div>

        {fallbackCards && fallbackCards.length > 0 && (
          <div className="min-w-0 overflow-hidden rounded-xl border border-[#242424] bg-[#0E0E0E] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
              Nexus structured insight
            </p>
            <p className="mt-1 text-xs text-[#A3A3A3]">
              Supplemental cards for this topic — answers above come from Aomi.
            </p>
            <div className="mt-3">
              <AgentStructuredCards cards={fallbackCards} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {monadNexusSuggestedPrompts.map((prompt) => (
            <MotionButton
              key={prompt}
              type="button"
              onClick={() => void handlePrompt(prompt)}
              className="max-w-full rounded-full border border-[#242424] bg-[#141414] px-3 py-1.5 text-left text-xs text-[#A3A3A3] hover:border-[#14F195]/40 hover:text-white"
            >
              <span className="line-clamp-2">{prompt}</span>
            </MotionButton>
          ))}
        </div>
      </div>

      <aside className="min-w-0 space-y-4">
        <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4">
          <div className="flex items-center gap-2 text-[#14F195]">
            <Wallet size={16} />
            <h2 className="text-sm font-semibold text-white">Wallet context</h2>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#A3A3A3]">
            {walletContextText}
          </p>
          {wallet.isDemoMode && (
            <p className="mt-2 text-[10px] uppercase tracking-wider text-[#A3A3A3]">
              Demo mode
            </p>
          )}
        </MotionCard>

        <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4">
          <div className="flex items-center gap-2 text-[#B7FF7A]">
            <Bot size={16} />
            <h2 className="text-sm font-semibold text-white">
              Ecosystem scope
            </h2>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#A3A3A3]">
            Kuru, Ambient, Apriori, Magma, Bean Exchange, MonadSwap, LayerZero,
            and Wormhole — routed through natural language when no Monad-only
            app is selected.
          </p>
        </MotionCard>

        <MotionCard className="rounded-xl border border-[#14F195]/25 bg-[#141414] p-4">
          <div className="flex items-center gap-2 text-[#14F195]">
            <ShieldCheck size={16} />
            <h2 className="text-sm font-semibold text-white">Wallet safety</h2>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#A3A3A3]">
            Monad Nexus never auto-signs transactions. Every on-chain action
            requires explicit approval in your connected wallet.
          </p>
        </MotionCard>
      </aside>
    </div>
  );
}

export function MonadNexusAomiChat({
  initialPrompt,
  aomiApiKey,
  className,
}: MonadNexusAomiChatProps) {
  const [, setActivityPrompt] = useState(initialPrompt ?? "");

  useEffect(() => {
    logAomiApiKeyDiagnostics("client:monad-nexus-aomi-chat", {
      source: "prop",
      apiKey: aomiApiKey,
      clientOptionsApiKey: aomiApiKey,
      hideApiKey: Boolean(aomiApiKey),
    });
  }, [aomiApiKey]);

  return (
    <div className={cn("monad-nexus-aomi-chat dark", className)}>
      <MotionReveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          AI Agent
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Monad ecosystem intelligence
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#A3A3A3]">
          Aomi-powered agent for protocols, wallets, staking, and ecosystem
          activity on Monad Testnet. Structured Nexus cards appear below when
          your question matches wallet, yield, or protocol topics.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <NexusStatusBadge label="Aomi Powered" tone="aomi" />
          <NexusStatusBadge label="Demo intelligence data" tone="demo" />
        </div>
      </MotionReveal>

      <div className="mt-6">
        <AomiFrame.Root
          showSidebar={false}
          walletPosition={null}
          height="auto"
          className="dark !h-auto !min-h-0 !rounded-none !border-0 !bg-transparent !shadow-none"
          clientOptions={aomiApiKey ? { apiKey: aomiApiKey } : undefined}
        >
          <AomiApiKeyRuntimeDiagnostics
            propApiKey={aomiApiKey}
            clientOptionsApiKey={aomiApiKey}
          />
          <MonadNexusChatShell
            aomiApiKey={aomiApiKey}
            initialPrompt={initialPrompt}
            autoSendInitial={Boolean(initialPrompt?.trim())}
            onPromptActivity={setActivityPrompt}
          />
        </AomiFrame.Root>
      </div>
    </div>
  );
}
