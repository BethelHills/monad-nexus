"use client";

import { ArrowRight } from "lucide-react";
import { MotionLink, MotionReveal, MotionSection } from "@/components/ui/motion";

export function FinalCta() {
  return (
    <MotionSection as="section" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-[#242424] bg-[#0E0E0E] px-6 py-12 text-center sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,241,149,0.12),transparent_65%)]"
        />
        <MotionReveal>
          <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Turn Monad into an intelligent experience.
          </h2>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <p className="relative mt-4 text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
            Discover, analyze, and navigate the Monad ecosystem from one AI command
            center.
          </p>
        </MotionReveal>
        <MotionReveal delay={0.2} className="relative mt-8">
          <MotionLink
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#14F195] px-6 py-3.5 text-sm font-semibold text-[#050505] shadow-[0_0_28px_rgba(20,241,149,0.25)] transition-shadow hover:shadow-[0_0_40px_rgba(20,241,149,0.4)] sm:w-auto"
          >
            Enter Monad Nexus
            <ArrowRight size={16} />
          </MotionLink>
        </MotionReveal>
      </div>
    </MotionSection>
  );
}
