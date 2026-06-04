"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionReveal, MotionSection } from "@/components/ui/motion";
import { useWalletPortfolio } from "@/hooks/use-wallet-portfolio";
import { cn } from "@/lib/utils";

export function WalletIntelligencePanel() {
  const reduce = useReducedMotion();
  const wallet = useWalletPortfolio();

  const rows = [
    {
      label: "Wallet status",
      value: wallet.statusLabel,
      mono: true,
    },
    {
      label: wallet.isDemoMode ? "Portfolio (demo)" : "Native balance",
      value: wallet.portfolioEstimate,
      large: true,
    },
    { label: "Risk posture", value: wallet.riskPosture },
  ];

  return (
    <MotionSection as="div" delay={0.05}>
      <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
        <header className="border-b border-[#242424] pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
                Wallet intelligence
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Intelligence report
              </h2>
            </div>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase",
                wallet.isDemoMode
                  ? "border-[#242424] text-[#A3A3A3]"
                  : "border-[#14F195]/30 bg-[#14F195]/10 text-[#14F195]",
              )}
            >
              {wallet.isDemoMode ? "Demo" : "Live"}
            </span>
          </div>
        </header>

        <dl className="mt-5 space-y-5 text-sm">
          {rows.map((row, i) => (
            <MotionReveal key={row.label} delay={0.08 + i * 0.06}>
              <div>
                <dt className="text-xs text-[#A3A3A3]">{row.label}</dt>
                <dd
                  className={
                    row.large
                      ? "mt-1 text-xl font-semibold text-white"
                      : row.mono
                        ? "mt-1 font-mono text-white"
                        : "mt-1 text-white"
                  }
                >
                  {row.value}
                </dd>
              </div>
            </MotionReveal>
          ))}

          {wallet.balanceNote && (
            <MotionReveal delay={0.22}>
              <p className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/90">
                {wallet.balanceNote}
              </p>
            </MotionReveal>
          )}

          <MotionReveal delay={0.28}>
            <div>
              <dt className="text-xs text-[#A3A3A3]">Active sectors</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {wallet.activeSectors.map((sector, i) => (
                  <motion.span
                    key={sector}
                    className="rounded border border-[#242424] bg-[#141414] px-2 py-0.5 text-xs text-[#B7FF7A]"
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.32 + i * 0.05 }}
                  >
                    {sector}
                  </motion.span>
                ))}
              </dd>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.34}>
            <div>
              <dt className="text-xs text-[#A3A3A3]">Recent signals</dt>
              <dd className="mt-2">
                <ul className="space-y-2 border-l border-[#242424] pl-3">
                  {wallet.recentSignals.map((signal, i) => (
                    <motion.li
                      key={signal}
                      className="text-[#A3A3A3] leading-relaxed"
                      initial={reduce ? false : { opacity: 0, x: -6 }}
                      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.38 + i * 0.06 }}
                    >
                      {signal}
                    </motion.li>
                  ))}
                </ul>
              </dd>
            </div>
          </MotionReveal>
        </dl>
      </MotionCard>
    </MotionSection>
  );
}
