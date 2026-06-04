import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Wallet,
  Compass,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Layers3,
  Database,
  Zap,
} from "lucide-react";

const stats = [
  { label: "Protocols Tracked", value: "120+", icon: Layers3 },
  { label: "Ecosystem TVL", value: "$320M+", icon: BarChart3 },
  { label: "Active Wallets", value: "248K+", icon: Wallet },
  { label: "Block Time", value: "1.0s", icon: Zap },
];

const features = [
  {
    title: "AI Agent",
    text: "Ask questions about Monad protocols, wallets, transactions, and opportunities.",
    icon: Bot,
  },
  {
    title: "Portfolio Intelligence",
    text: "Analyze wallet balances, exposure, allocation, and ecosystem risk.",
    icon: Wallet,
  },
  {
    title: "Protocol Explorer",
    text: "Discover Monad-native protocols, categories, activity, and insights.",
    icon: Compass,
  },
  {
    title: "Opportunity Scanner",
    text: "Find yield, staking, DeFi, and new ecosystem opportunities faster.",
    icon: Sparkles,
  },
  {
    title: "Activity History",
    text: "Track AI insights, wallet activity, protocol research, and past analysis.",
    icon: Database,
  },
  {
    title: "Secure by Design",
    text: "Non-custodial wallet connection with user-controlled actions.",
    icon: ShieldCheck,
  },
];

const protocols = ["Kuru", "Ambient", "Bean Exchange", "Apriori", "Magma"];

export default function MonadNexusLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020607] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,241,149,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_32%),linear-gradient(180deg,#020607_0%,#061014_50%,#020607_100%)]" />
      <div className="fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-[#14F195] via-cyan-300 to-lime-200 shadow-[0_0_38px_rgba(20,241,149,0.35)]">
              <div className="absolute inset-3 rotate-45 rounded-md border-[3px] border-[#041014] border-b-transparent border-l-transparent" />
            </div>

            <span className="text-2xl font-black tracking-[-0.04em]">
              Monad Nexus
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-400 lg:flex">
            <span>Features</span>
            <span>Ecosystem</span>
            <span>Portfolio</span>
            <span>Opportunities</span>
            <span>Docs</span>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-gradient-to-r from-[#14F195] to-cyan-300 px-5 py-3 text-sm font-black text-[#031014] shadow-[0_0_35px_rgba(20,241,149,0.28)]"
          >
            Launch App
          </Link>
        </nav>

        <div className="grid items-center gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              <Sparkles size={14} />
              The Intelligence Layer for Monad
            </div>

            <h2 className="max-w-3xl text-6xl font-black leading-[0.88] tracking-[-0.075em] md:text-8xl">
              Navigate Monad with{" "}
              <span className="bg-gradient-to-r from-[#14F195] via-cyan-300 to-lime-200 bg-clip-text text-transparent">
                AI clarity.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Monad Nexus helps users discover protocols, analyze portfolios,
              track opportunities, and understand the Monad ecosystem through one
              AI-powered command center.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#14F195] to-cyan-300 px-7 py-4 font-black text-[#031014] shadow-[0_0_40px_rgba(20,241,149,0.28)]"
              >
                Launch Monad Nexus
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-bold text-slate-200 backdrop-blur-xl"
              >
                View Demo
              </Link>
            </div>

            <div className="mt-12">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-600">
                Designed for the Monad ecosystem
              </p>

              <div className="mt-5 flex flex-wrap gap-5 text-lg font-black text-slate-300">
                {protocols.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-emerald-400/25 bg-[#061014]/90 p-4 shadow-[0_0_100px_rgba(20,241,149,0.18)] backdrop-blur-2xl lg:-rotate-2">
            <div className="absolute -inset-10 -z-10 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <p className="font-black">Monad Nexus</p>
                  <p className="text-xs text-slate-500">AI ecosystem terminal</p>
                </div>

                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Monad · Live
                </span>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-bold text-slate-300">
                    Portfolio Intelligence
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      ["Total Value", "$18,240"],
                      ["Risk Score", "Low"],
                      ["Opportunities", "14"],
                      ["Protocols", "8"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <p className="text-xs text-slate-500">{label}</p>
                        <p className="mt-2 text-2xl font-black">{value}</p>
                      </div>
                    ))}
                  </div>

                  <svg viewBox="0 0 520 190" className="mt-6 h-44 w-full">
                    <defs>
                      <linearGradient id="nexusArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#14F195" stopOpacity="0.5" />
                        <stop
                          offset="100%"
                          stopColor="#14F195"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 145 C55 115 85 160 130 100 C180 40 215 112 270 84 C325 50 350 130 410 78 C455 34 490 52 520 24 L520 190 L0 190 Z"
                      fill="url(#nexusArea)"
                    />
                    <path
                      d="M0 145 C55 115 85 160 130 100 C180 40 215 112 270 84 C325 50 350 130 410 78 C455 34 490 52 520 24"
                      fill="none"
                      stroke="#14F195"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-bold text-slate-300">
                    Protocol Signals
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      ["Kuru", "Trending"],
                      ["Ambient", "High TVL"],
                      ["Apriori", "Yield"],
                      ["Magma", "Staking"],
                    ].map(([name, tag]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                      >
                        <span className="font-bold">{name}</span>
                        <span className="text-xs font-bold text-emerald-300">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 pb-16 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                  <Icon size={23} />
                </div>

                <p className="text-3xl font-black">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </section>

        <section className="py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
              AI-powered ecosystem intelligence
            </p>

            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">
              Everything users need to understand Monad.
            </h2>

            <p className="mt-5 text-slate-400">
              Monad Nexus turns fragmented ecosystem data into simple,
              actionable intelligence.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-xl font-black">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-white/[0.035] p-6 backdrop-blur-xl md:p-10">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                How it works
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">
                From wallet connection to ecosystem insight.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "01",
                  "Connect Wallet",
                  "Connect and load your Monad context.",
                ],
                [
                  "02",
                  "Ask Nexus",
                  "Use AI to explore protocols and opportunities.",
                ],
                [
                  "03",
                  "Review Insights",
                  "Understand portfolio, risk, and trends.",
                ],
                [
                  "04",
                  "Take Action",
                  "Move with clear ecosystem intelligence.",
                ],
              ].map(([num, title, text]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <p className="text-lg font-black text-emerald-300">{num}</p>
                  <h3 className="mt-4 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/25 bg-gradient-to-br from-emerald-400/15 via-cyan-400/10 to-lime-300/10 p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="max-w-2xl text-4xl font-black leading-none tracking-[-0.05em] md:text-5xl">
                  Turn Monad into an intelligent experience.
                </h2>

                <p className="mt-4 max-w-xl text-slate-300">
                  Discover, analyze, and navigate the Monad ecosystem through
                  one AI command center.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#14F195] to-cyan-300 px-7 py-4 font-black text-[#031014]"
              >
                Enter Monad Nexus
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-5 border-t border-white/10 py-10 text-sm text-slate-500 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#14F195] to-cyan-300" />
            <span className="font-black text-white">Monad Nexus</span>
          </div>

          <p>The Intelligence Layer for Monad.</p>
        </footer>
      </section>
    </main>
  );
}
