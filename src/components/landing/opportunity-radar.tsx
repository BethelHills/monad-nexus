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

  const polygonPoints = radarCategories
    .map((c) => {
      const r = (c.score / 100) * maxR;
      const p = polarPoint(c.angle, r, cx, cy);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Opportunity radar
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Signal distribution
          </h2>
          <p className="mt-2 text-sm text-[#A3A3A3]">
            Relative strength across yield, staking, DEX, and wallet dimensions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-[#242424] bg-[#0E0E0E] p-6">
            <svg viewBox="0 0 240 240" className="h-auto w-full" role="img" aria-label="Opportunity radar chart">
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

              <polygon
                points={polygonPoints}
                fill="rgba(20,241,149,0.12)"
                stroke="#14F195"
                strokeWidth="1.5"
              />

              {radarCategories.map((c) => {
                const r = (c.score / 100) * maxR;
                const p = polarPoint(c.angle, r, cx, cy);
                const label = polarPoint(c.angle, maxR + 14, cx, cy);
                return (
                  <g key={c.label}>
                    <circle cx={p.x} cy={p.y} r="3" fill="#14F195" />
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
            </svg>
          </div>

          <ul className="space-y-3">
            {radarCategories.map((c) => (
              <li
                key={c.label}
                className="flex items-center justify-between rounded-lg border border-[#242424] bg-[#141414] px-4 py-3"
              >
                <span className="text-sm text-white">{c.label}</span>
                <span className="font-mono text-sm font-semibold text-[#14F195]">
                  {c.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
