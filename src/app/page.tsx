import { EcosystemGraph } from "@/components/landing/ecosystem-graph";
import { FinalCta } from "@/components/landing/final-cta";
import { IntelligenceFeed } from "@/components/landing/intelligence-feed";
import { NexusHero } from "@/components/landing/nexus-hero";
import { OpportunityRadar } from "@/components/landing/opportunity-radar";
import { ProtocolUniverse } from "@/components/landing/protocol-universe";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";

export default function LandingPage() {
  return (
    <PageShell>
      <SiteHeader />

      <main>
        <NexusHero />
        <EcosystemGraph />
        <IntelligenceFeed />
        <OpportunityRadar />
        <ProtocolUniverse />
        <FinalCta />
      </main>

      <footer className="border-t border-[#242424] px-4 py-8 text-center text-xs text-[#A3A3A3] sm:px-6">
        Monad Nexus — The Intelligence Layer for Monad
      </footer>
    </PageShell>
  );
}
