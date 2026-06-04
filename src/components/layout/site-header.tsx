"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionLink } from "@/components/ui/motion";
import { easeOut, slideDown } from "@/lib/motion";

export function SiteHeader() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      className="sticky top-0 z-20 border-b border-[#242424] bg-[#050505]/90 backdrop-blur-md"
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      variants={slideDown}
      transition={easeOut}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group text-sm font-semibold tracking-tight text-white"
        >
          <motion.span
            className="inline-block"
            whileHover={reduce ? undefined : { x: 2 }}
          >
            Monad{" "}
            <span className="text-[#14F195] transition-colors group-hover:text-[#B7FF7A]">
              Nexus
            </span>
          </motion.span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs text-[#A3A3A3] sm:flex">
          {["Ecosystem", "Intelligence", "Protocols"].map((item, i) => (
            <motion.span
              key={item}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...easeOut, delay: 0.1 + i * 0.05 }}
              className="cursor-default transition-colors hover:text-white"
            >
              {item}
            </motion.span>
          ))}
        </nav>
        <MotionLink
          href="/dashboard"
          className="rounded-lg border border-[#242424] bg-[#0E0E0E] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#14F195]/50 hover:shadow-[0_0_20px_rgba(20,241,149,0.12)]"
        >
          Launch
        </MotionLink>
      </div>
    </motion.header>
  );
}
