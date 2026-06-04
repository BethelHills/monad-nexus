"use client";

import Link from "next/link";
import { Search, Wallet } from "lucide-react";
import { commandSuggestions } from "@/lib/dashboard-data";

export function NexusCommandCenter() {
  return (
    <section className="border-b border-[#242424] bg-[#0E0E0E] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-xs text-[#A3A3A3] hover:text-[#14F195]"
            >
              ← Monad Nexus
            </Link>
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Command center
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-[#242424] bg-[#141414] px-2.5 py-1 text-xs font-medium text-[#B7FF7A]">
              Monad Testnet
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-white"
            >
              <Wallet size={14} className="text-[#14F195]" />
              Connect wallet
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[#242424] bg-[#050505] p-1 focus-within:border-[#14F195]/40">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={18} />
            <input
              type="text"
              readOnly
              placeholder="Command Nexus — analyze wallet, protocols, or opportunities..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3]"
              aria-label="Nexus command input"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {commandSuggestions.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="rounded-md border border-[#242424] px-2.5 py-1 text-xs text-[#A3A3A3] hover:border-[#14F195]/30 hover:text-white"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
