"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MotionCard,
  MotionItem,
  MotionReveal,
  MotionSection,
  MotionStagger,
  PulseDot,
} from "@/components/ui/motion";
import { intelligenceFeedItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

function confidenceStyles(level: string) {
  if (level === "High") {
    return "border-[#14F195]/30 bg-[#14F195]/10 text-[#14F195]";
  }
  return "border-[#242424] bg-[#141414] text-[#A3A3A3]";
}

export function IntelligenceFeed() {
  const reduce = useReducedMotion();

  return (
    <MotionSection className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionReveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
              Live feed
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Intelligence stream
            </h2>
          </div>
          <span className="flex w-fit items-center gap-2 rounded-md border border-[#242424] px-2 py-1 text-xs text-[#A3A3A3]">
            <PulseDot />
            Updated continuously
          </span>
        </MotionReveal>

        <MotionCard className="overflow-hidden rounded-xl border border-[#242424] bg-[#0E0E0E]">
          <MotionStagger>
            <ul className="divide-y divide-[#242424]">
              {intelligenceFeedItems.map((item) => (
                <MotionItem key={item.id}>
                  <motion.li
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                    whileHover={
                      reduce
                        ? undefined
                        : { backgroundColor: "rgba(20, 241, 149, 0.04)" }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                      <span className="shrink-0 font-mono text-xs text-[#A3A3A3]">
                        {item.timestamp}
                      </span>
                      <span className="w-fit shrink-0 rounded border border-[#242424] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#B7FF7A]">
                        {item.category}
                      </span>
                      <p className="min-w-0 text-sm text-white">{item.insight}</p>
                    </div>
                    <span
                      className={cn(
                        "w-fit shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase",
                        confidenceStyles(item.confidence),
                      )}
                    >
                      {item.confidence}
                    </span>
                  </motion.li>
                </MotionItem>
              ))}
            </ul>
          </MotionStagger>
        </MotionCard>
      </div>
    </MotionSection>
  );
}
