import { EcosystemMapPanel } from "@/components/dashboard/ecosystem-map-panel";
import { NexusCommandCenter } from "@/components/dashboard/nexus-command-center";
import { NexusRecommendations } from "@/components/dashboard/nexus-recommendations";
import { OpportunityFeed } from "@/components/dashboard/opportunity-feed";
import { ProtocolSignalTable } from "@/components/dashboard/protocol-signal-table";
import { WalletIntelligencePanel } from "@/components/dashboard/wallet-intelligence-panel";

export default function DashboardPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <NexusCommandCenter />

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <WalletIntelligencePanel />
          <EcosystemMapPanel />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <OpportunityFeed />
          <ProtocolSignalTable />
        </div>

        <NexusRecommendations />
      </div>
    </div>
  );
}
