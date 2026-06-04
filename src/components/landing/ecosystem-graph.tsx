import { ecosystemNodes } from "@/lib/landing-data";

export function EcosystemGraph() {
  const center = ecosystemNodes.find((n) => n.id === "monad")!;
  const satellites = ecosystemNodes.filter((n) => n.id !== "monad");

  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Ecosystem map
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Protocol intelligence graph
          </h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">
            Relationships across Monad-native infrastructure and bridges.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#242424] bg-[#0E0E0E] p-4 sm:p-8">
          <svg
            viewBox="0 0 100 100"
            className="mx-auto h-[min(70vw,420px)] w-full max-w-3xl"
            role="img"
            aria-label="Monad ecosystem protocol graph"
          >
            {satellites.map((node) => {
              const cx = center.x;
              const cy = center.y;
              return (
                <line
                  key={`line-${node.id}`}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  stroke="#242424"
                  strokeWidth="0.35"
                />
              );
            })}

            {satellites.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3.2"
                  fill="#141414"
                  stroke="#14F195"
                  strokeWidth="0.6"
                  className="drop-shadow-[0_0_6px_rgba(20,241,149,0.45)]"
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

            <circle
              cx={center.x}
              cy={center.y}
              r="5"
              fill="#141414"
              stroke="#14F195"
              strokeWidth="1"
              className="drop-shadow-[0_0_10px_rgba(20,241,149,0.55)]"
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
          </svg>
        </div>
      </div>
    </section>
  );
}
