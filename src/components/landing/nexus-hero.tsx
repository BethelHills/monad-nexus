"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";
import {
  AnimatedSearchFrame,
  MotionButton,
  MotionItem,
  MotionLink,
  MotionReveal,
  MotionStagger,
} from "@/components/ui/motion";
import { suggestedPrompts } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function NexusHero() {
  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <MotionReveal>
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#14F195]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14F195]" />
            </span>
            The Intelligence Layer for Monad
          </p>
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

        <AnimatedSearchFrame className="mt-8">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={20} />
            <input
              type="text"
              readOnly
              placeholder="Ask Nexus to analyze a wallet, find protocols, or surface opportunities..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3] sm:text-base"
              aria-label="Ask Nexus"
            />
            <MotionButton
              type="button"
              className="hidden shrink-0 rounded-lg bg-[#14F195] px-4 py-2 text-xs font-semibold text-[#050505] sm:inline-flex sm:items-center sm:gap-1"
            >
              <Sparkles size={14} />
              Ask
            </MotionButton>
          </div>
        </AnimatedSearchFrame>

        <MotionStagger className="mt-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <MotionItem key={prompt}>
              <MotionButton
                type="button"
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
            Launch Nexus
            <ArrowRight size={16} />
          </MotionLink>
          <MotionLink
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#242424] bg-[#0E0E0E] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#14F195]/40 sm:w-auto"
          >
            Explore Protocols
          </MotionLink>
        </MotionReveal>
      </div>
    </section>
  );
}
