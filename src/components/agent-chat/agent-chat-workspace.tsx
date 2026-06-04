"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Search, Send, Sparkles, Wallet } from "lucide-react";
import { AgentStructuredCards } from "@/components/agent-chat/agent-structured-cards";
import {
  AnimatedSearchFrame,
  MotionButton,
  MotionCard,
  MotionReveal,
} from "@/components/ui/motion";
import { useWalletPortfolio } from "@/hooks/use-wallet-portfolio";
import {
  agentSuggestedPrompts,
  findMockResponse,
  type InsightCard,
  type StructuredCardData,
} from "@/lib/agent-chat-data";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  insights?: InsightCard[];
  structuredCards?: StructuredCardData[];
};

function insightToneClass(tone?: InsightCard["tone"]) {
  if (tone === "positive") return "border-[#14F195]/30 text-[#14F195]";
  if (tone === "warning") return "border-amber-500/30 text-amber-400";
  return "border-[#242424] text-[#A3A3A3]";
}

type AgentChatWorkspaceProps = {
  initialPrompt?: string;
};

export function AgentChatWorkspace({ initialPrompt }: AgentChatWorkspaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ReturnType<typeof findMockResponse> | null>(
    null,
  );
  const wallet = useWalletPortfolio();
  const initialHandled = useRef(false);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const mock = findMockResponse(trimmed);
    setContext(mock);

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: trimmed },
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: mock.reply,
        insights: mock.insights,
        structuredCards: mock.structuredCards,
      },
    ]);
    setInput("");
  }, []);

  useEffect(() => {
    if (initialPrompt && !initialHandled.current) {
      initialHandled.current = true;
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, sendMessage]);

  const walletContextText = wallet.isConnected
    ? `${wallet.truncatedAddress} · ${wallet.chainName} · ${wallet.balanceDisplay}${wallet.balanceNote ? ` — ${wallet.balanceNote}` : ""}`
    : (context?.walletContext ??
      "Connect a wallet to personalize portfolio and risk analysis.");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <MotionReveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          AI Agent
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Nexus intelligence terminal
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#A3A3A3]">
          Structured intelligence for wallets, protocols, opportunities, and
          ecosystem activity. Live wallet context when connected.
        </p>
      </MotionReveal>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-6 min-w-0">
          <AnimatedSearchFrame>
            <form
              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Search className="shrink-0 text-[#A3A3A3]" size={18} />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Nexus anything about Monad..."
                  className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3]"
                  aria-label="AI command input"
                />
              </div>
              <MotionButton
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#14F195] px-4 py-2.5 text-sm font-semibold text-[#050505] sm:w-auto"
              >
                <Send size={16} />
                Send
              </MotionButton>
            </form>
          </AnimatedSearchFrame>

          <div className="flex flex-wrap gap-2">
            {agentSuggestedPrompts.map((prompt) => (
              <MotionButton
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs text-[#A3A3A3] hover:border-[#14F195]/40 hover:text-white"
              >
                {prompt}
              </MotionButton>
            ))}
          </div>

          <div className="rounded-xl border border-[#242424] bg-[#0E0E0E]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#242424] bg-[#141414] text-[#14F195]">
                  <Bot size={22} />
                </div>
                <p className="text-sm text-[#A3A3A3]">
                  Start with a suggested prompt or type your own question.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#242424]">
                {messages.map((msg) => (
                  <li key={msg.id} className="px-4 py-4 sm:px-5">
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                          msg.role === "user"
                            ? "bg-[#141414] text-[#A3A3A3]"
                            : "bg-[#14F195]/10 text-[#14F195]",
                        )}
                      >
                        {msg.role === "user" ? "You" : <Sparkles size={14} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-relaxed text-white">
                          {msg.content}
                        </p>
                        {msg.structuredCards && (
                          <AgentStructuredCards cards={msg.structuredCards} />
                        )}
                        {msg.insights && msg.insights.length > 0 && (
                          <div className="mt-4 grid gap-2 sm:grid-cols-3">
                            {msg.insights.map((card) => (
                              <div
                                key={card.label}
                                className={cn(
                                  "rounded-lg border bg-[#141414] px-3 py-2",
                                  insightToneClass(card.tone),
                                )}
                              >
                                <p className="text-[10px] uppercase tracking-wider opacity-80">
                                  {card.label}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-white">
                                  {card.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="space-y-4 min-w-0">
          <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4">
            <div className="flex items-center gap-2 text-[#14F195]">
              <Wallet size={16} />
              <h2 className="text-sm font-semibold text-white">
                Wallet context
              </h2>
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
                Protocol context
              </h2>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#A3A3A3]">
              {context?.protocolContext ??
                "Kuru, Ambient, Apriori, Magma, Bean Exchange, MonadSwap, LayerZero, Wormhole"}
            </p>
          </MotionCard>
        </aside>
      </div>
    </div>
  );
}
