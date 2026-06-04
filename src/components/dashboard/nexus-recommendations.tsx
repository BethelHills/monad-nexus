import { Bot } from "lucide-react";
import { nexusRecommendations } from "@/lib/dashboard-data";

export function NexusRecommendations() {
  return (
    <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
      <header className="mb-5 flex items-center gap-3 border-b border-[#242424] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#242424] bg-[#141414] text-[#14F195]">
          <Bot size={18} />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Nexus AI
          </p>
          <h2 className="text-lg font-semibold text-white">Recommendations</h2>
        </div>
      </header>

      <ol className="space-y-4">
        {nexusRecommendations.map((rec, i) => (
          <li key={rec} className="flex gap-3 text-sm leading-relaxed">
            <span className="shrink-0 font-mono text-xs text-[#14F195]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[#A3A3A3]">{rec}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
