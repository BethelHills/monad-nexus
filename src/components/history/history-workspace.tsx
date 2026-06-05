"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Bot, Search, TrendingUp, Wallet } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion";
import { NexusSearchBar } from "@/components/ui/nexus-search-bar";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { buildHistoryReviewUrl } from "@/lib/agent-prompts";
import {
  historyEntries,
  type HistoryFilter,
  type HistoryType,
} from "@/lib/history-data";
import { cn } from "@/lib/utils";

const filters: { id: HistoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "agent", label: "Agent" },
  { id: "wallet", label: "Wallet" },
  { id: "protocol", label: "Protocol" },
  { id: "opportunity", label: "Opportunity" },
];

function typeIcon(type: HistoryType) {
  if (type === "ai") return Bot;
  if (type === "wallet") return Wallet;
  if (type === "opportunity") return TrendingUp;
  return Search;
}

function matchesFilter(entry: (typeof historyEntries)[number], filter: HistoryFilter) {
  if (filter === "all") return true;
  if (filter === "agent") return entry.type === "ai";
  return entry.type === filter;
}

export function HistoryWorkspace() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HistoryFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return historyEntries.filter((entry) => {
      const matchesFilterType = matchesFilter(entry, filter);
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.timestamp.toLowerCase().includes(q) ||
        entry.type.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilterType && matchesQuery;
    });
  }, [query, filter]);

  const grouped = useMemo(() => {
    const ai = filtered.filter((e) => e.type === "ai");
    const wallet = filtered.filter((e) => e.type === "wallet");
    const protocol = filtered.filter((e) => e.type === "protocol");
    const opportunity = filtered.filter((e) => e.type === "opportunity");
    return { ai, wallet, protocol, opportunity };
  }, [filtered]);

  const showEmpty = filtered.length === 0;

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <MotionReveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          History
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Research archive
        </h1>
        <p className="mt-2 text-sm text-[#A3A3A3]">
          Search and filter past AI insights, wallet analysis, and protocol
          research.
        </p>
        <div className="mt-3">
          <NexusStatusBadge label="Demo intelligence data" tone="demo" />
        </div>
      </MotionReveal>

      <div className="mt-6 space-y-4">
        <NexusSearchBar
          value={draft}
          onChange={setDraft}
          onSubmit={(value) => setQuery(value)}
          placeholder="Search by title, category, status, protocol, or timestamp..."
          submitLabel="Search"
          ariaLabel="Search history"
          emptyHint="Enter a term to filter history."
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.id
                  ? "border-[#14F195]/40 bg-[#14F195]/10 text-[#14F195]"
                  : "border-[#242424] text-[#A3A3A3] hover:text-white",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {showEmpty ? (
        <div className="mt-10 rounded-xl border border-dashed border-[#242424] bg-[#0E0E0E] px-6 py-16 text-center">
          <p className="text-sm font-medium text-white">No history found</p>
          <p className="mt-2 text-xs text-[#A3A3A3]">
            Try a different search term or filter.
          </p>
          {(query || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setDraft("");
                setQuery("");
                setFilter("all");
              }}
              className="mt-4 rounded-lg border border-[#242424] px-4 py-2 text-xs text-white hover:border-[#14F195]/40"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {(
            [
              { key: "ai" as const, title: "Agent insight history" },
              { key: "wallet" as const, title: "Wallet analysis history" },
              { key: "protocol" as const, title: "Protocol research history" },
              { key: "opportunity" as const, title: "Opportunity history" },
            ] as const
          ).map(
            (section) =>
              grouped[section.key].length > 0 && (
                <section key={section.key}>
                  <h2 className="mb-4 text-sm font-semibold text-white">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {grouped[section.key].map((entry) => {
                      const Icon = typeIcon(entry.type);
                      return (
                        <li
                          key={entry.id}
                          className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                            <div className="flex min-w-0 flex-1 gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#242424] bg-[#141414] text-[#14F195]">
                                <Icon size={16} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                  <p className="text-sm font-medium text-white">
                                    {entry.title}
                                  </p>
                                  <span className="text-[10px] text-[#A3A3A3]">
                                    {entry.timestamp}
                                  </span>
                                </div>
                                <p className="mt-2 text-xs leading-relaxed text-[#A3A3A3]">
                                  {entry.summary}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {entry.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded border border-[#242424] px-1.5 py-0.5 text-[10px] text-[#B7FF7A]"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Link
                              href={buildHistoryReviewUrl(entry.title)}
                              className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-[#242424] bg-[#141414] px-4 py-2.5 text-xs font-medium text-[#14F195] transition-colors hover:border-[#14F195]/40 sm:w-auto sm:shrink-0"
                            >
                              Review
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ),
          )}
        </div>
      )}
    </div>
  );
}
