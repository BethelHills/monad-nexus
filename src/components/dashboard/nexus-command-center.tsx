"use client";

import Link from "next/link";
import { Search, Wallet } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AnimatedSearchFrame,
  MotionButton,
  MotionReveal,
  MotionStagger,
  MotionItem,
  PulseDot,
} from "@/components/ui/motion";
import { commandSuggestions } from "@/lib/dashboard-data";
import { easeOut, slideDown } from "@/lib/motion";

export function NexusCommandCenter() {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="border-b border-[#242424] bg-[#0E0E0E]/90 px-4 py-6 backdrop-blur-sm sm:px-6 lg:px-8"
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      variants={slideDown}
      transition={easeOut}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <MotionReveal>
            <Link
              href="/"
              className="text-xs text-[#A3A3A3] transition-colors hover:text-[#14F195]"
            >
              ← Monad Nexus
            </Link>
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Command center
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.08} className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 rounded-md border border-[#242424] bg-[#141414] px-2.5 py-1 text-xs font-medium text-[#B7FF7A]">
              <PulseDot />
              Monad Testnet
            </span>
            <MotionButton
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-white hover:border-[#14F195]/40"
            >
              <Wallet size={14} className="text-[#14F195]" />
              Connect wallet
            </MotionButton>
          </MotionReveal>
        </div>

        <AnimatedSearchFrame>
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="shrink-0 text-[#A3A3A3]" size={18} />
            <input
              type="text"
              readOnly
              placeholder="Command Nexus — analyze wallet, protocols, or opportunities..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#A3A3A3]"
              aria-label="Nexus command input"
            />
          </div>
        </AnimatedSearchFrame>

        <MotionStagger className="mt-3 flex flex-wrap gap-2">
          {commandSuggestions.map((cmd) => (
            <MotionItem key={cmd}>
              <MotionButton
                type="button"
                className="rounded-md border border-[#242424] px-2.5 py-1 text-xs text-[#A3A3A3] hover:border-[#14F195]/30 hover:text-white"
              >
                {cmd}
              </MotionButton>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </motion.section>
  );
}
