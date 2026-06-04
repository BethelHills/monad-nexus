import type { StructuredCardData } from "@/lib/agent-chat-data";
import { cn } from "@/lib/utils";

const cardStyles: Record<
  StructuredCardData["type"],
  { border: string; accent: string }
> = {
  "wallet-intelligence": {
    border: "border-[#14F195]/25",
    accent: "text-[#14F195]",
  },
  "protocol-insight": {
    border: "border-[#B7FF7A]/25",
    accent: "text-[#B7FF7A]",
  },
  "opportunity-recommendation": {
    border: "border-cyan-500/25",
    accent: "text-cyan-400",
  },
  "risk-summary": {
    border: "border-amber-500/25",
    accent: "text-amber-400",
  },
};

export function AgentStructuredCards({
  cards,
}: {
  cards: StructuredCardData[];
}) {
  if (!cards.length) return null;

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {cards.map((card) => {
        const style = cardStyles[card.type];
        return (
          <div
            key={`${card.type}-${card.title}`}
            className={cn(
              "rounded-lg border bg-[#141414] p-3",
              style.border,
            )}
          >
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                style.accent,
              )}
            >
              {card.title}
            </p>
            <dl className="mt-2 space-y-1.5">
              {card.items.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between gap-2 text-xs"
                >
                  <dt className="text-[#A3A3A3]">{item.label}</dt>
                  <dd className="text-right font-medium text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
