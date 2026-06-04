"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionReveal, MotionSection } from "@/components/ui/motion";
import { walletReport } from "@/lib/dashboard-data";

export function WalletIntelligencePanel() {
  const reduce = useReducedMotion();

  return (
    <MotionSection as="div" delay={0.05}>
      <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
        <header className="border-b border-[#242424] pb-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Wallet intelligence
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Intelligence report
          </h2>
        </header>

        <dl className="mt-5 space-y-5 text-sm">
          {[
            { label: "Wallet status", value: walletReport.status, mono: true },
            {
              label: "Portfolio estimate",
              value: walletReport.portfolioEstimate,
              large: true,
            },
            { label: "Risk posture", value: walletReport.riskPosture },
          ].map((row, i) => (
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

          <MotionReveal delay={0.28}>
            <div>
              <dt className="text-xs text-[#A3A3A3]">Active sectors</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {walletReport.activeSectors.map((sector, i) => (
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
                  {walletReport.recentSignals.map((signal, i) => (
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
