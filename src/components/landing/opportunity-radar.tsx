"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MotionCard,
  MotionItem,
  MotionReveal,
  MotionSection,
  MotionStagger,
} from "@/components/ui/motion";
import { radarCategories } from "@/lib/landing-data";

function polarPoint(angleDeg: number, radius: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function OpportunityRadar() {
  const cx = 120;
  const cy = 120;
  const maxR = 72;
  const reduce = useReducedMotion();

  const polygonPoints = radarCategories
    .map((c) => {
      const r = (c.score / 100) * maxR;
      const p = polarPoint(c.angle, r, cx, cy);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <MotionSection className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionReveal className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Opportunity radar
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Signal distribution
          </h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">
            Relative strength across yield, staking, DEX, and wallet dimensions.
          </p>
        </MotionReveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
          <MotionCard className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-[#242424] bg-[#0E0E0E] p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-40 w-40 rounded-full border border-[#14F195]/10 nexus-radar-ring" />
            </div>
            <motion.svg
              viewBox="0 0 240 240"
              className="relative h-auto w-full"
              role="img"
              aria-label="Opportunity radar chart"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[25, 50, 75, 100].map((pct) => (
                <circle
                  key={pct}
                  cx={cx}
                  cy={cy}
                  r={(pct / 100) * maxR}
                  fill="none"
                  stroke="#242424"
                  strokeWidth="0.75"
                />
              ))}

              {radarCategories.map((c) => {
                const outer = polarPoint(c.angle, maxR, cx, cy);
                return (
                  <line
                    key={`axis-${c.label}`}
                    x1={cx}
                    y1={cy}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#242424"
                    strokeWidth="0.75"
                  />
                );
              })}

              <motion.polygon
                points={polygonPoints}
                fill="rgba(20,241,149,0.12)"
                stroke="#14F195"
                strokeWidth="1.5"
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {radarCategories.map((c, i) => {
                const r = (c.score / 100) * maxR;
                const p = polarPoint(c.angle, r, cx, cy);
                const label = polarPoint(c.angle, maxR + 14, cx, cy);
                return (
                  <g key={c.label}>
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r="3"
                      fill="#14F195"
                      initial={reduce ? false : { scale: 0 }}
                      whileInView={reduce ? undefined : { scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-[#A3A3A3] text-[8px]"
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}
            </motion.svg>
          </MotionCard>

          <MotionStagger className="space-y-3">
            {radarCategories.map((c) => (
              <MotionItem key={c.label}>
                <MotionCard className="flex items-center justify-between rounded-lg border border-[#242424] bg-[#141414] px-4 py-3">
                  <span className="text-sm text-white">{c.label}</span>
                  <motion.span
                    className="font-mono text-sm font-semibold text-[#14F195]"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={reduce ? undefined : { opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {c.score}
                  </motion.span>
                </MotionCard>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </div>
    </MotionSection>
  );
}
