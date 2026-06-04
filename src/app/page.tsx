import Link from "next/link";
import { EcosystemGraph } from "@/components/landing/ecosystem-graph";
import { FinalCta } from "@/components/landing/final-cta";
import { IntelligenceFeed } from "@/components/landing/intelligence-feed";
import { NexusHero } from "@/components/landing/nexus-hero";
import { OpportunityRadar } from "@/components/landing/opportunity-radar";
import { ProtocolUniverse } from "@/components/landing/protocol-universe";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <header className="sticky top-0 z-20 border-b border-[#242424] bg-[#050505]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-tight text-white">
            Monad Nexus
          </Link>
          <nav className="hidden items-center gap-6 text-xs text-[#A3A3A3] sm:flex">
            <span>Ecosystem</span>
            <span>Intelligence</span>
            <span>Protocols</span>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-lg border border-[#242424] bg-[#0E0E0E] px-3 py-1.5 text-xs font-medium text-white hover:border-[#14F195]/40"
          >
            Launch
          </Link>
        </div>
      </header>

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
    </div>
  );
}
