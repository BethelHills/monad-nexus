"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MotionCard,
  MotionItem,
  MotionSection,
  MotionStagger,
} from "@/components/ui/motion";
import { protocolSignals } from "@/lib/dashboard-data";

export function ProtocolSignalTable() {
  const reduce = useReducedMotion();

  return (
    <MotionSection as="div" delay={0.14}>
      <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
        <header className="mb-5 border-b border-[#242424] pb-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Protocol signals
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Signal table</h2>
        </header>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#242424] text-xs uppercase tracking-wider text-[#A3A3A3]">
                <th className="pb-3 pr-4 font-medium">Protocol</th>
                <th className="pb-3 pr-4 font-medium">Sector</th>
                <th className="pb-3 pr-4 font-medium">Signal</th>
                <th className="pb-3 pr-4 font-medium">Confidence</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424]">
              {protocolSignals.map((row, i) => (
                <motion.tr
                  key={row.protocol}
                  className="text-white"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={
                    reduce
                      ? undefined
                      : { backgroundColor: "rgba(20, 241, 149, 0.04)" }
                  }
                >
                  <td className="py-3 pr-4 font-medium">{row.protocol}</td>
                  <td className="py-3 pr-4 text-[#A3A3A3]">{row.sector}</td>
                  <td className="py-3 pr-4 text-[#B7FF7A]">{row.signal}</td>
                  <td className="py-3 pr-4 font-mono text-[#14F195]">
                    {row.confidence}%
                  </td>
                  <td className="py-3">
                    <span className="rounded border border-[#242424] px-2 py-0.5 text-xs">
                      {row.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <MotionStagger className="space-y-3 md:hidden">
          {protocolSignals.map((row) => (
            <MotionItem key={row.protocol}>
              <MotionCard className="rounded-lg border border-[#242424] bg-[#141414] p-3">
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-white">{row.protocol}</span>
                  <span className="text-xs text-[#A3A3A3]">{row.sector}</span>
                </div>
                <p className="mt-2 text-sm text-[#B7FF7A]">{row.signal}</p>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="font-mono text-[#14F195]">
                    {row.confidence}% confidence
                  </span>
                  <span className="text-[#A3A3A3]">{row.status}</span>
                </div>
              </MotionCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </MotionCard>
    </MotionSection>
  );
}
