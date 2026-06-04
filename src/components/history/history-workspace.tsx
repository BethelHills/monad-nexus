"use client";

import { useMemo, useState } from "react";
import { Bot, Search, Wallet } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion";
import {
  historyEntries,
  type HistoryFilter,
  type HistoryType,
} from "@/lib/history-data";
import { cn } from "@/lib/utils";

const filters: { id: HistoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI insights" },
  { id: "wallet", label: "Wallet" },
  { id: "protocol", label: "Protocol" },
];

function typeIcon(type: HistoryType) {
  if (type === "ai") return Bot;
  if (type === "wallet") return Wallet;
  return Search;
}

export function HistoryWorkspace() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HistoryFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return historyEntries.filter((entry) => {
      const matchesFilter = filter === "all" || entry.type === filter;
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const grouped = useMemo(() => {
    const ai = filtered.filter((e) => e.type === "ai");
    const wallet = filtered.filter((e) => e.type === "wallet");
    const protocol = filtered.filter((e) => e.type === "protocol");
    return { ai, wallet, protocol };
  }, [filtered]);

  const showEmpty = filtered.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
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
      </MotionReveal>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-1">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3]"
              aria-label="Search history"
            />
          </div>
        </div>

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
            Try a different search term or filter. New sessions will appear here
            automatically.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {(
            [
              { key: "ai" as const, title: "AI insight history" },
              { key: "wallet" as const, title: "Wallet analysis history" },
              { key: "protocol" as const, title: "Protocol research history" },
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
                          <div className="flex gap-3">
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
