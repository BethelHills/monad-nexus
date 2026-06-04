export const agentSuggestedPrompts = [
  "Analyze my Monad wallet",
  "Show trending Monad protocols",
  "Find staking opportunities",
  "Explain recent ecosystem activity",
  "Compare Kuru, Ambient, and Apriori",
] as const;

export type InsightCard = {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "warning";
};

export type AgentMockResponse = {
  promptMatch: string;
  reply: string;
  insights: InsightCard[];
  walletContext?: string;
  protocolContext?: string;
};

export const agentMockResponses: AgentMockResponse[] = [
  {
    promptMatch: "Analyze my Monad wallet",
    reply:
      "Your wallet shows balanced exposure across native assets and DeFi. Stablecoin allocation increased 6% this week while protocol concentration remains moderate across three venues.",
    insights: [
      { label: "Portfolio", value: "$18,240", tone: "positive" },
      { label: "Risk", value: "Low–moderate", tone: "neutral" },
      { label: "Top sector", value: "DEX liquidity", tone: "positive" },
    ],
    walletContext: "0x8f3a…c21d · 8 protocols · 4 active positions",
    protocolContext: "Kuru, Ambient, Apriori",
  },
  {
    promptMatch: "Show trending Monad protocols",
    reply:
      "Kuru leads swap momentum with +31% volume vs 7d baseline. Ambient liquidity depth improved on major pairs. Apriori staking inflows are accelerating on testnet.",
    insights: [
      { label: "Top signal", value: "Kuru volume", tone: "positive" },
      { label: "Liquidity", value: "Ambient ↑", tone: "positive" },
      { label: "Watch", value: "Bean Exchange", tone: "neutral" },
    ],
    walletContext: "No wallet required for ecosystem scan",
    protocolContext: "Kuru · Ambient · Apriori · Magma",
  },
  {
    promptMatch: "Find staking opportunities",
    reply:
      "Apriori offers the strongest yield curve for medium-term locks. Magma validator queue times are shortening. Combined staking exposure should stay below 40% for your risk profile.",
    insights: [
      { label: "Best yield", value: "Apriori ~12%", tone: "positive" },
      { label: "Lock risk", value: "Medium", tone: "warning" },
      { label: "Fit score", value: "88/100", tone: "positive" },
    ],
    walletContext: "Staking cap recommendation: 40% of portfolio",
    protocolContext: "Apriori · Magma",
  },
  {
    promptMatch: "Explain recent ecosystem activity",
    reply:
      "Network activity is elevated with DEX volume leading growth. Wallet clusters rotated into liquidity pools while staking deposits ticked higher. Bridge inflows remain steady via LayerZero and Wormhole.",
    insights: [
      { label: "Activity index", value: "High", tone: "positive" },
      { label: "DEX growth", value: "+14.2%", tone: "positive" },
      { label: "Bridge flow", value: "Stable", tone: "neutral" },
    ],
    walletContext: "Ecosystem-wide · last 24h",
    protocolContext: "DEX · Staking · Bridges",
  },
  {
    promptMatch: "Compare Kuru, Ambient, and Apriori",
    reply:
      "Kuru excels on swap velocity and short-term trading signals. Ambient leads on liquidity depth and pair stability. Apriori is the standout for yield with moderate lock requirements.",
    insights: [
      { label: "Kuru", value: "DEX · 96 score", tone: "positive" },
      { label: "Ambient", value: "DEX · 91 score", tone: "positive" },
      { label: "Apriori", value: "Stake · 88 score", tone: "neutral" },
    ],
    walletContext: "Comparison uses public protocol signals",
    protocolContext: "Kuru vs Ambient vs Apriori",
  },
];

export const defaultAgentReply: AgentMockResponse = {
  promptMatch: "default",
  reply:
    "I can analyze wallets, surface protocol signals, and explain Monad ecosystem activity. Try a suggested prompt or ask a specific question about protocols, yield, or wallet exposure.",
  insights: [
    { label: "Status", value: "Ready", tone: "positive" },
    { label: "Network", value: "Monad Testnet", tone: "neutral" },
  ],
  walletContext: "Connect wallet for personalized analysis",
  protocolContext: "120+ protocols indexed",
};

export function findMockResponse(prompt: string): AgentMockResponse {
  const normalized = prompt.trim().toLowerCase();
  const match = agentMockResponses.find(
    (r) =>
      normalized.includes(r.promptMatch.toLowerCase()) ||
      r.promptMatch.toLowerCase().includes(normalized),
  );
  return match ?? defaultAgentReply;
}
