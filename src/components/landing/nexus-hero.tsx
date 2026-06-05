"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  MotionButton,
  MotionItem,
  MotionLink,
  MotionReveal,
  MotionStagger,
} from "@/components/ui/motion";
import { NexusSearchBar } from "@/components/ui/nexus-search-bar";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { buildAgentChatUrl } from "@/lib/agent-prompts";
import { suggestedPrompts } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function NexusHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const goToAgent = (prompt: string) => {
    router.push(buildAgentChatUrl(prompt));
  };

  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl min-w-0">
        <MotionReveal>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#14F195]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14F195]" />
              </span>
              The Intelligence Layer for Monad
            </p>
            <NexusStatusBadge label="Aomi Powered" tone="aomi" />
            <NexusStatusBadge label="Demo intelligence data" tone="demo" />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ask anything about{" "}
            <span className="bg-gradient-to-r from-[#14F195] via-[#B7FF7A] to-[#14F195] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
              Monad.
            </span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.14}>
          <p className="mt-4 text-base leading-relaxed text-[#A3A3A3] sm:text-lg">
            Monad Nexus turns ecosystem data, wallet activity, and protocol signals
            into clear AI-powered intelligence.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.2} className="mt-8">
          <NexusSearchBar
            value={query}
            onChange={setQuery}
            onSubmit={goToAgent}
            placeholder="Ask Nexus to analyze a wallet, find protocols, or surface opportunities..."
            submitLabel="Send"
            ariaLabel="Ask Nexus"
            emptyHint="Type a question about Monad to open Agent Chat."
          />
        </MotionReveal>

        <MotionStagger className="mt-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <MotionItem key={prompt}>
              <MotionButton
                type="button"
                onClick={() => goToAgent(prompt)}
                className="rounded-full border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs text-[#A3A3A3] transition-colors hover:border-[#14F195]/40 hover:text-white hover:shadow-[0_0_16px_rgba(20,241,149,0.1)]"
              >
                {prompt}
              </MotionButton>
            </MotionItem>
          ))}
        </MotionStagger>

        <MotionReveal delay={0.28} className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <MotionLink
            href="/dashboard"
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#14F195] px-5 py-3 text-sm font-semibold text-[#050505] shadow-[0_0_24px_rgba(20,241,149,0.2)] transition-shadow hover:shadow-[0_0_36px_rgba(20,241,149,0.35)] sm:w-auto",
            )}
          >
            Launch App
            <ArrowRight size={16} />
          </MotionLink>
          <MotionLink
            href="/opportunities"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#242424] bg-[#0E0E0E] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#14F195]/40 sm:w-auto"
          >
            Explore Protocols
          </MotionLink>
        </MotionReveal>
      </div>
    </section>
  );
}
