"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionSection } from "@/components/ui/motion";
import { compactEcosystemNodes } from "@/lib/dashboard-data";

const positions: Record<string, { x: number; y: number }> = {
  monad: { x: 50, y: 50 },
  kuru: { x: 78, y: 32 },
  ambient: { x: 82, y: 58 },
  apriori: { x: 58, y: 78 },
  magma: { x: 32, y: 72 },
  bean: { x: 22, y: 48 },
};

export function EcosystemMapPanel() {
  const center = compactEcosystemNodes[0];
  const nodes = compactEcosystemNodes.slice(1);
  const reduce = useReducedMotion();

  return (
    <MotionSection as="div" delay={0.1}>
      <MotionCard className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
        <header className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Ecosystem map
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Active protocol nodes
          </h2>
        </header>

        <div className="overflow-x-auto">
          <motion.svg
            viewBox="0 0 100 80"
            className="h-48 w-full min-w-[280px] sm:h-56"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {nodes.map((node, i) => {
              const pos = positions[node.id];
              if (!pos) return null;
              return (
                <motion.line
                  key={`edge-${node.id}`}
                  x1={50}
                  y1={50}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#242424"
                  strokeWidth="0.4"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                />
              );
            })}
            {nodes.map((node, i) => {
              const pos = positions[node.id];
              if (!pos) return null;
              return (
                <g key={node.id}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="4"
                    fill="#141414"
                    stroke={node.active ? "#14F195" : "#242424"}
                    strokeWidth="0.8"
                    initial={reduce ? false : { scale: 0, opacity: 0.5 }}
                    whileInView={
                      reduce
                        ? undefined
                        : {
                            scale: 1,
                            opacity: node.active ? [0.65, 1, 0.65] : 1,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      scale: { delay: 0.15 + i * 0.05, type: "spring" },
                      opacity: node.active
                        ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 },
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 8}
                    textAnchor="middle"
                    className="fill-[#A3A3A3] text-[3px]"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
            <circle
              cx={50}
              cy={50}
              r="6"
              fill="#141414"
              stroke="#14F195"
              strokeWidth="1"
              className="nexus-node-pulse"
            />
            <text
              x={50}
              y={50.8}
              textAnchor="middle"
              className="fill-white text-[4px] font-semibold"
            >
              {center.label}
            </text>
          </motion.svg>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          {compactEcosystemNodes.map((n, i) => (
            <motion.li
              key={n.id}
              className={n.active ? "text-[#14F195]" : "text-[#A3A3A3]"}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.04 }}
            >
              {n.label}
              {n.active ? " · active" : ""}
            </motion.li>
          ))}
        </ul>
      </MotionCard>
    </MotionSection>
  );
}
