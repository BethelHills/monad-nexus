"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MotionCard,
  MotionItem,
  MotionSection,
  MotionStagger,
} from "@/components/ui/motion";
import { opportunitySignals } from "@/lib/dashboard-data";

export function OpportunityFeed() {
  const reduce = useReducedMotion();

  return (
    <MotionSection as="div" delay={0.12}>
      <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
        <header className="mb-5 border-b border-[#242424] pb-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Opportunity feed
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">AI signals</h2>
        </header>

        <MotionStagger>
          <ul className="space-y-0 divide-y divide-[#242424]">
            {opportunitySignals.map((item) => (
              <MotionItem key={item.id}>
                <motion.li
                  className="py-4 first:pt-0 last:pb-0"
                  whileHover={
                    reduce
                      ? undefined
                      : { x: 4, transition: { duration: 0.2 } }
                  }
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#14F195]">
                      {item.type}
                    </span>
                    <span className="font-mono text-[10px] text-[#A3A3A3]">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#A3A3A3]">
                    {item.detail}
                  </p>
                </motion.li>
              </MotionItem>
            ))}
          </ul>
        </MotionStagger>
      </MotionCard>
    </MotionSection>
  );
}
