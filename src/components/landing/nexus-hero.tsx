"use client";

import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { suggestedPrompts } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function NexusHero() {
  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#14F195]">
          The Intelligence Layer for Monad
        </p>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ask anything about Monad.
        </h1>

        <p className="mt-4 text-base leading-relaxed text-[#A3A3A3] sm:text-lg">
          Monad Nexus turns ecosystem data, wallet activity, and protocol signals
          into clear AI-powered intelligence.
        </p>

        <div className="mt-8 rounded-xl border border-[#242424] bg-[#0E0E0E] p-1 focus-within:border-[#14F195]/50">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={20} />
            <input
              type="text"
              readOnly
              placeholder="Ask Nexus to analyze a wallet, find protocols, or surface opportunities..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3] sm:text-base"
              aria-label="Ask Nexus"
            />
            <button
              type="button"
              className="hidden shrink-0 rounded-lg bg-[#14F195] px-4 py-2 text-xs font-semibold text-[#050505] sm:inline-flex sm:items-center sm:gap-1"
            >
              <Sparkles size={14} />
              Ask
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="rounded-full border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs text-[#A3A3A3] transition-colors hover:border-[#14F195]/40 hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/dashboard"
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#14F195] px-5 py-3 text-sm font-semibold text-[#050505] sm:w-auto",
            )}
          >
            Launch Nexus
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#242424] bg-[#0E0E0E] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#14F195]/40 sm:w-auto"
          >
            Explore Protocols
          </Link>
        </div>
      </div>
    </section>
  );
}
