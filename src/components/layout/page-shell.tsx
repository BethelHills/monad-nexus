"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NexusAmbient } from "@/components/ui/motion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-x-hidden bg-[#050505] text-white",
        className,
      )}
    >
      <NexusAmbient />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 nexus-grid opacity-[0.35]"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ ...easeOut, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
