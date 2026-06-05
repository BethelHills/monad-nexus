"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MotionCard, MotionReveal } from "@/components/ui/motion";
import { NexusSearchBar } from "@/components/ui/nexus-search-bar";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { buildOpportunityAnalyzeUrl } from "@/lib/agent-prompts";
import {
  opportunities,
  opportunityCategories,
  radarScores,
  type OpportunityCategory,
} from "@/lib/opportunities-data";
import { cn } from "@/lib/utils";

function polarPoint(angleDeg: number, radius: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

const categoryAngles: Record<OpportunityCategory, number> = {
  Yield: 0,
  Staking: 72,
  "DEX Activity": 144,
  "New Protocols": 216,
  "Wallet Signals": 288,
};

export function OpportunitiesWorkspace() {
  const [category, setCategory] = useState<OpportunityCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const filtered = useMemo(() => {
    const q = activeSearch.trim().toLowerCase();
    return opportunities.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;
      const signalText = `${item.confidence}%`;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.protocol.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.risk.toLowerCase().includes(q) ||
        signalText.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, activeSearch]);

  const cx = 100;
  const cy = 100;
  const maxR = 70;
  const polygonPoints = opportunityCategories
    .map((cat) => {
      const r = (radarScores[cat] / 100) * maxR;
      const p = polarPoint(categoryAngles[cat], r, cx, cy);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <MotionReveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          Opportunities
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Opportunity scanner
        </h1>
        <p className="mt-2 text-sm text-[#A3A3A3]">
          Yield, staking, DEX, and wallet signals ranked by confidence.
        </p>
        <div className="mt-3">
          <NexusStatusBadge label="Demo intelligence data" tone="demo" />
        </div>
      </MotionReveal>

      <div className="mt-6">
        <NexusSearchBar
          value={search}
          onChange={setSearch}
          onSubmit={(value) => setActiveSearch(value)}
          placeholder="Search by title, protocol, category, risk, or signal..."
          submitLabel="Search"
          ariaLabel="Search opportunities"
          emptyHint="Enter a term to filter opportunities."
        />
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,280px)_1fr] xl:grid-cols-[320px_1fr]">
        <MotionCard className="min-w-0 rounded-xl border border-[#242424] bg-[#0E0E0E] p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-white">Opportunity radar</h2>
          <svg
            viewBox="0 0 200 200"
            className="mt-4 h-auto w-full max-w-full"
            aria-label="Opportunity radar chart"
          >
            {[25, 50, 75, 100].map((pct) => (
              <circle
                key={pct}
                cx={cx}
                cy={cy}
                r={(pct / 100) * maxR}
                fill="none"
                stroke="#242424"
                strokeWidth="0.6"
              />
            ))}
            <polygon
              points={polygonPoints}
              fill="rgba(20,241,149,0.1)"
              stroke="#14F195"
              strokeWidth="1.2"
            />
          </svg>
          <ul className="mt-4 space-y-2">
            {opportunityCategories.map((cat) => (
              <li
                key={cat}
                className="flex justify-between text-xs text-[#A3A3A3]"
              >
                <span>{cat}</span>
                <span className="font-mono text-[#14F195]">
                  {radarScores[cat]}
                </span>
              </li>
            ))}
          </ul>
        </MotionCard>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                category === "All"
                  ? "border-[#14F195]/40 bg-[#14F195]/10 text-[#14F195]"
                  : "border-[#242424] text-[#A3A3A3]",
              )}
            >
              All
            </button>
            {opportunityCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium",
                  category === cat
                    ? "border-[#14F195]/40 bg-[#14F195]/10 text-[#14F195]"
                    : "border-[#242424] text-[#A3A3A3]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#242424] bg-[#0E0E0E] px-6 py-12 text-center">
              <p className="text-sm font-medium text-white">
                No opportunities match your search
              </p>
              <p className="mt-2 text-xs text-[#A3A3A3]">
                Try another keyword, category, or clear your search.
              </p>
              {activeSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveSearch("");
                  }}
                  className="mt-4 rounded-lg border border-[#242424] px-4 py-2 text-xs text-white hover:border-[#14F195]/40"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((item) => (
                <MotionCard
                  key={item.id}
                  className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#B7FF7A]">
                          {item.category}
                        </span>
                        <span className="font-mono text-[10px] text-[#14F195]">
                          Signal {item.confidence}%
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-medium",
                            item.risk === "Low"
                              ? "text-[#14F195]"
                              : item.risk === "Medium"
                                ? "text-amber-400"
                                : "text-red-400",
                          )}
                        >
                          Risk: {item.risk}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#A3A3A3]">
                        {item.protocol} · {item.description}
                      </p>
                    </div>
                    <Link
                      href={buildOpportunityAnalyzeUrl(item.title)}
                      className="inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-lg border border-[#242424] bg-[#141414] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-[#14F195]/40 sm:w-auto"
                    >
                      Analyze
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </MotionCard>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
