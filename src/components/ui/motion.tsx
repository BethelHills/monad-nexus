"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { easeOut, fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

function useMotionEnabled() {
  const reduce = useReducedMotion();
  return !reduce;
}

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div";
};

export function MotionSection({
  children,
  className,
  delay = 0,
  as = "section",
}: MotionSectionProps) {
  const motionEnabled = useMotionEnabled();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={motionEnabled ? "hidden" : false}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      variants={fadeUp}
      transition={{ ...easeOut, delay }}
    >
      {children}
    </Component>
  );
}

export function MotionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      className={className}
      initial={motionEnabled ? { opacity: 0, y: 20 } : false}
      animate={motionEnabled ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      className={className}
      initial={motionEnabled ? "hidden" : false}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      className={className}
      variants={motionEnabled ? staggerItem : undefined}
      transition={easeOut}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      className={cn(
        "transition-[border-color,box-shadow] duration-300",
        className,
      )}
      whileHover={
        motionEnabled
          ? {
              y: -2,
              borderColor: "rgba(20, 241, 149, 0.35)",
              boxShadow: "0 0 32px rgba(20, 241, 149, 0.08)",
            }
          : undefined
      }
      transition={{ duration: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionButton({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.button
      className={className}
      whileHover={motionEnabled ? { scale: 1.02 } : undefined}
      whileTap={motionEnabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MotionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      whileHover={motionEnabled ? { scale: 1.02 } : undefined}
      whileTap={motionEnabled ? { scale: 0.98 } : undefined}
      className="inline-flex"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export function AnimatedSearchFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div
      className={cn("relative rounded-xl p-[1px]", className)}
      initial={motionEnabled ? { opacity: 0, y: 12 } : false}
      animate={motionEnabled ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...easeOut, delay: 0.15 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl nexus-search-glow opacity-80"
      />
      <div className="relative rounded-[11px] border border-[#242424] bg-[#0E0E0E]">
        {children}
      </div>
    </motion.div>
  );
}

export function NexusAmbient() {
  const motionEnabled = useMotionEnabled();

  if (!motionEnabled) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#14F195]/8 blur-[100px]" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[#B7FF7A]/6 blur-[110px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#14F195]/10 blur-[100px]"
        animate={{
          x: [0, 40, 0],
          y: [0, 24, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[#B7FF7A]/8 blur-[110px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#14F195]/6 blur-[90px]"
        animate={{
          x: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-40" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14F195]" />
    </span>
  );
}

export function drawVariants(delay = 0): Variants {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
}
