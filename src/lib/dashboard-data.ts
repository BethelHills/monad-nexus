export const commandSuggestions = [
  "Analyze my wallet",
  "Find high-signal protocols",
  "Show opportunities",
  "Explain recent activity",
] as const;

export const walletReport = {
  status: "Connected · 0x8f3a…c21d",
  portfolioEstimate: "$18,240",
  riskPosture: "Conservative–moderate",
  activeSectors: ["DEX liquidity", "Staking", "Native assets"],
  recentSignals: [
    "Stablecoin allocation increased 6% this week",
    "Exposure concentrated in 3 protocols",
    "No anomalous outflows detected",
  ],
} as const;

export const compactEcosystemNodes = [
  { id: "monad", label: "Monad", active: true },
  { id: "kuru", label: "Kuru", active: true },
  { id: "ambient", label: "Ambient", active: true },
  { id: "apriori", label: "Apriori", active: false },
  { id: "magma", label: "Magma", active: true },
  { id: "bean", label: "Bean", active: false },
] as const;

export const opportunitySignals = [
  {
    id: "1",
    type: "Yield",
    title: "Apriori staking APR trending up",
    detail: "12% projected yield with moderate lock risk",
    time: "8m ago",
  },
  {
    id: "2",
    type: "Staking",
    title: "Magma validator queue shortening",
    detail: "Faster unstake windows observed on testnet",
    time: "22m ago",
  },
  {
    id: "3",
    type: "Protocol growth",
    title: "Kuru swap volume breakout",
    detail: "24h volume +31% vs 7d baseline",
    time: "41m ago",
  },
  {
    id: "4",
    type: "Wallet movement",
    title: "Smart money into Ambient pools",
    detail: "14 wallets added liquidity in 6h window",
    time: "1h ago",
  },
] as const;

export const protocolSignals = [
  {
    protocol: "Kuru",
    sector: "DEX",
    signal: "Volume breakout",
    confidence: 94,
    status: "Active",
  },
  {
    protocol: "Ambient",
    sector: "DEX",
    signal: "Liquidity depth",
    confidence: 89,
    status: "Active",
  },
  {
    protocol: "Apriori",
    sector: "Staking",
    signal: "Yield expansion",
    confidence: 86,
    status: "Watch",
  },
  {
    protocol: "Magma",
    sector: "Staking",
    signal: "Inflow steady",
    confidence: 81,
    status: "Active",
  },
  {
    protocol: "Bean Exchange",
    sector: "DEX",
    signal: "New market",
    confidence: 72,
    status: "New",
  },
] as const;

export const nexusRecommendations = [
  "Watch Kuru activity — swap volume is outpacing ecosystem average.",
  "Review Apriori staking — yield curve favors medium-term positions.",
  "Track Ambient liquidity — depth improved across major pairs.",
  "Explore new protocol launches — 2 entrants on Monad watchlist this week.",
] as const;
