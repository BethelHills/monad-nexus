"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MotionCard,
  MotionItem,
  MotionReveal,
  MotionSection,
  MotionStagger,
} from "@/components/ui/motion";
import { buildProtocolAnalyzeUrl } from "@/lib/agent-prompts";
import { protocolDirectory } from "@/lib/landing-data";

export function ProtocolUniverse() {
  const reduce = useReducedMotion();

  return (
    <MotionSection className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl min-w-0">
        <MotionReveal className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Protocol universe
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Directory
          </h2>
        </MotionReveal>

        <MotionCard className="hidden overflow-x-auto rounded-xl border border-[#242424] md:block">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[#242424] bg-[#141414] text-xs uppercase tracking-wider text-[#A3A3A3]">
              <tr>
                <th className="px-5 py-3 font-medium">Protocol</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Signal</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424] bg-[#0E0E0E]">
              {protocolDirectory.map((row, i) => (
                <motion.tr
                  key={row.protocol}
                  className="text-white"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={
                    reduce
                      ? undefined
                      : { backgroundColor: "rgba(20, 241, 149, 0.05)" }
                  }
                >
                  <td className="px-5 py-4 font-medium">{row.protocol}</td>
                  <td className="px-5 py-4 text-[#A3A3A3]">{row.category}</td>
                  <td className="px-5 py-4 text-[#B7FF7A]">{row.signal}</td>
                  <td className="px-5 py-4 text-[#A3A3A3]">{row.risk}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={buildProtocolAnalyzeUrl(row.protocol)}
                      className="text-xs font-medium text-[#14F195] hover:underline"
                    >
                      Analyze
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </MotionCard>

        <MotionStagger className="space-y-3 md:hidden">
          {protocolDirectory.map((row) => (
            <MotionItem key={row.protocol}>
              <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-white">{row.protocol}</p>
                  <span className="text-xs text-[#A3A3A3]">{row.category}</span>
                </div>
                <p className="mt-2 text-sm text-[#B7FF7A]">{row.signal}</p>
                <p className="mt-1 text-xs text-[#A3A3A3]">Risk: {row.risk}</p>
                <div className="mt-4">
                  <Link
                    href={buildProtocolAnalyzeUrl(row.protocol)}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-[#242424] bg-[#141414] px-4 py-2 text-xs font-medium text-[#14F195]"
                  >
                    Analyze
                  </Link>
                </div>
              </MotionCard>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
