import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Compass,
  Database,
  Gauge,
  Globe2,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

const stats = [
  {
    label: "Portfolio Value",
    value: "$18,240",
    change: "+8.4%",
    icon: Wallet,
  },
  {
    label: "Opportunity Score",
    value: "92",
    change: "High",
    icon: Gauge,
  },
  {
    label: "Protocols Watched",
    value: "24",
    change: "+6 new",
    icon: Layers3,
  },
  {
    label: "AI Insights",
    value: "148",
    change: "+21 today",
    icon: Bot,
  },
];

const protocols = [
  {
    name: "Kuru",
    category: "DEX",
    signal: "Trending",
    score: 96,
    tvl: "$48.2M",
  },
  {
    name: "Ambient",
    category: "DEX",
    signal: "High Liquidity",
    score: 91,
    tvl: "$62.5M",
  },
  {
    name: "Apriori",
    category: "Staking",
    signal: "Yield",
    score: 88,
    tvl: "$34.1M",
  },
  {
    name: "Magma",
    category: "Staking",
    signal: "Watchlist",
    score: 84,
    tvl: "$29.8M",
  },
];

const insights = [
  "Your wallet has strong exposure to liquid assets.",
  "Kuru is showing high activity across swap volume.",
  "Apriori staking opportunities match your current risk profile.",
  "Portfolio risk is currently low based on asset distribution.",
];

const activity = [
  {
    title: "Portfolio analyzed",
    detail: "AI completed wallet risk review",
    time: "2 mins ago",
  },
  {
    title: "Kuru opportunity detected",
    detail: "High volume and liquidity signal",
    time: "18 mins ago",
  },
  {
    title: "Protocol watchlist updated",
    detail: "Added Ambient and Magma",
    time: "42 mins ago",
  },
];

const trustItems: {
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Non-Custodial",
    text: "You control every wallet action.",
  },
  {
    icon: Globe2,
    title: "Monad Native",
    text: "Designed for Monad ecosystem growth.",
  },
  {
    icon: Database,
    title: "AI Memory",
    text: "Keep track of previous insights.",
  },
  {
    icon: TrendingUp,
    title: "Opportunity Signals",
    text: "Find what matters faster.",
  },
];

export default function MonadNexusDashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020607] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,241,149,0.15),transparent_32%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_34%),linear-gradient(180deg,#020607_0%,#061014_55%,#020607_100%)]" />
      <div className="fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block text-xs font-bold text-slate-500 transition-colors hover:text-emerald-300"
            >
              ← Back to home
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} />
              Monad ecosystem intelligence
            </div>

            <h1 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              Nexus{" "}
              <span className="bg-gradient-to-r from-[#14F195] via-cyan-300 to-lime-200 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Monitor wallet health, discover Monad protocols, review AI insights,
              and track ecosystem opportunities from one command center.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 backdrop-blur-xl"
            >
              <Wallet size={17} />
              Connect Wallet
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#14F195] to-cyan-300 px-5 py-3 text-sm font-black text-[#031014]"
            >
              <Network size={17} />
              Monad Testnet
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <Icon size={22} />
                  </div>

                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-black text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                    Ecosystem Signal
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    Monad Activity Index
                  </h2>
                </div>

                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Live intelligence
                </span>
              </div>

              <svg viewBox="0 0 720 280" className="h-72 w-full">
                <defs>
                  <linearGradient
                    id="dashboardArea"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#14F195" stopOpacity="0.48" />
                    <stop offset="100%" stopColor="#14F195" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 210 C65 165 95 230 155 150 C220 60 270 140 335 105 C410 58 455 195 535 102 C610 22 660 75 720 38 L720 280 L0 280 Z"
                  fill="url(#dashboardArea)"
                />
                <path
                  d="M0 210 C65 165 95 230 155 150 C220 60 270 140 335 105 C410 58 455 195 535 102 C610 22 660 75 720 38"
                  fill="none"
                  stroke="#14F195"
                  strokeWidth="5"
                />
              </svg>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["Network Activity", "High"],
                  ["Protocol Growth", "+14.2%"],
                  ["Opportunity Momentum", "Strong"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-2 text-xl font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  Protocol Explorer
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Top Monad Protocols
                </h2>
              </div>

              <div className="space-y-4">
                {protocols.map((protocol) => (
                  <div
                    key={protocol.name}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_0.7fr_0.7fr_0.5fr] md:items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                            <Compass size={18} />
                          </div>

                          <div>
                            <p className="font-black text-white">
                              {protocol.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {protocol.category}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Signal</p>
                        <p className="font-bold text-emerald-300">
                          {protocol.signal}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">TVL</p>
                        <p className="font-bold text-white">{protocol.tvl}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Score</p>
                        <p className="text-2xl font-black text-white">
                          {protocol.score}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#14F195] to-cyan-300 px-5 py-4 font-black text-[#031014]"
              >
                Open Protocol Explorer
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/10 via-white/[0.03] to-cyan-400/10 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                  <Bot size={23} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
                    AI Summary
                  </p>
                  <h2 className="text-xl font-black text-white">
                    Nexus Intelligence
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {insights.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-300">
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-emerald-300"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 font-bold text-emerald-200"
              >
                Ask Nexus Agent
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="mb-5">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  Portfolio Mix
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Wallet Allocation
                </h2>
              </div>

              <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(from_90deg,#14F195_0deg,#22d3ee_150deg,#d7ff73_240deg,#64748b_300deg,#14F195_360deg)] p-4 shadow-[0_0_55px_rgba(20,241,149,0.2)]">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061014]">
                  <p className="text-sm text-slate-500">Health</p>
                  <p className="text-5xl font-black text-emerald-300">92</p>
                  <p className="text-xs text-emerald-300">Strong</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["MON", "42%"],
                  ["Stables", "24%"],
                  ["DeFi", "20%"],
                  ["NFT / Other", "14%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{label}</span>
                      <span className="font-bold text-white">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#14F195] to-cyan-300"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
              <div className="mb-5">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-300">
                  Activity
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Recent Signals
                </h2>
              </div>

              <div className="space-y-4">
                {activity.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="font-black text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                    <p className="mt-3 text-xs text-emerald-300">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl md:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <Icon className="text-emerald-300" size={25} />
              <h3 className="mt-3 font-black">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
