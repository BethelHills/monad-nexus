"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionReveal, MotionSection } from "@/components/ui/motion";
import { ecosystemNodes } from "@/lib/landing-data";

export function EcosystemGraph() {
  const center = ecosystemNodes.find((n) => n.id === "monad")!;
  const satellites = ecosystemNodes.filter((n) => n.id !== "monad");
  const reduce = useReducedMotion();

  return (
    <MotionSection className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <MotionReveal className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Ecosystem map
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Protocol intelligence graph
          </h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">
            Relationships across Monad-native infrastructure and bridges.
          </p>
        </MotionReveal>

        <MotionCard className="overflow-x-auto rounded-xl border border-[#242424] bg-[#0E0E0E] p-4 sm:p-8">
          <motion.svg
            viewBox="0 0 100 100"
            className="mx-auto h-[min(70vw,420px)] w-full max-w-3xl"
            role="img"
            aria-label="Monad ecosystem protocol graph"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {satellites.map((node, i) => (
              <motion.line
                key={`line-${node.id}`}
                x1={center.x}
                y1={center.y}
                x2={node.x}
                y2={node.y}
                stroke="#242424"
                strokeWidth="0.35"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
              />
            ))}

            {satellites.map((node, i) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="3.2"
                  fill="#141414"
                  stroke="#14F195"
                  strokeWidth="0.6"
                  className="drop-shadow-[0_0_6px_rgba(20,241,149,0.45)]"
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  whileInView={
                    reduce
                      ? undefined
                      : { scale: 1, opacity: 1 }
                  }
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 200 }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          scale: [1, 1.12, 1],
                          opacity: [0.85, 1, 0.85],
                        }
                  }
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <text
                  x={node.x}
                  y={node.y + 6.5}
                  textAnchor="middle"
                  className="fill-[#A3A3A3] text-[2.8px] font-medium"
                >
                  {node.label}
                </text>
              </g>
            ))}

            <motion.circle
              cx={center.x}
              cy={center.y}
              r="5"
              fill="#141414"
              stroke="#14F195"
              strokeWidth="1"
              className="drop-shadow-[0_0_12px_rgba(20,241,149,0.6)] nexus-node-pulse"
              initial={reduce ? false : { scale: 0 }}
              whileInView={reduce ? undefined : { scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 160, delay: 0.1 }}
            />
            <text
              x={center.x}
              y={center.y + 1.2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-[3.5px] font-semibold"
            >
              {center.label}
            </text>
          </motion.svg>
        </MotionCard>
      </div>
    </MotionSection>
  );
}
