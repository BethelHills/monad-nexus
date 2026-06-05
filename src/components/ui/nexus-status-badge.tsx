import { cn } from "@/lib/utils";

export type NexusBadgeTone = "demo" | "wallet" | "aomi" | "neutral";

const toneStyles: Record<NexusBadgeTone, string> = {
  demo: "border-[#242424] bg-[#141414] text-[#A3A3A3]",
  wallet: "border-[#14F195]/30 bg-[#14F195]/10 text-[#14F195]",
  aomi: "border-[#B7FF7A]/30 bg-[#B7FF7A]/10 text-[#B7FF7A]",
  neutral: "border-[#242424] bg-[#0E0E0E] text-[#A3A3A3]",
};

type NexusStatusBadgeProps = {
  label: string;
  tone?: NexusBadgeTone;
  className?: string;
};

export function NexusStatusBadge({
  label,
  tone = "neutral",
  className,
}: NexusStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        toneStyles[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
