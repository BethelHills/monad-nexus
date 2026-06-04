import { walletReport } from "@/lib/dashboard-data";

export function WalletIntelligencePanel() {
  return (
    <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5 sm:p-6">
      <header className="border-b border-[#242424] pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          Wallet intelligence
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          Intelligence report
        </h2>
      </header>

      <dl className="mt-5 space-y-5 text-sm">
        <div>
          <dt className="text-xs text-[#A3A3A3]">Wallet status</dt>
          <dd className="mt-1 font-mono text-white">{walletReport.status}</dd>
        </div>
        <div>
          <dt className="text-xs text-[#A3A3A3]">Portfolio estimate</dt>
          <dd className="mt-1 text-xl font-semibold text-white">
            {walletReport.portfolioEstimate}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-[#A3A3A3]">Risk posture</dt>
          <dd className="mt-1 text-white">{walletReport.riskPosture}</dd>
        </div>
        <div>
          <dt className="text-xs text-[#A3A3A3]">Active sectors</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {walletReport.activeSectors.map((sector) => (
              <span
                key={sector}
                className="rounded border border-[#242424] bg-[#141414] px-2 py-0.5 text-xs text-[#B7FF7A]"
              >
                {sector}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-[#A3A3A3]">Recent signals</dt>
          <dd className="mt-2">
            <ul className="space-y-2 border-l border-[#242424] pl-3">
              {walletReport.recentSignals.map((signal) => (
                <li key={signal} className="text-[#A3A3A3] leading-relaxed">
                  {signal}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
