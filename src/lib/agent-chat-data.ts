import { getProtocolByName } from "@/lib/protocols-data";

export const agentSuggestedPrompts = [
  "What protocols are active on Monad?",
  "Analyze my Monad wallet",
  "Show staking opportunities on Monad",
  "Compare Kuru, Ambient, Apriori, and Magma",
  "Explain recent Monad ecosystem activity",
] as const;

export type InsightCard = {
  label: string;
  value: string;
  tone?: "neutral" | "positive" | "warning";
};

export type StructuredCardType =
  | "wallet-intelligence"
  | "protocol-insight"
  | "opportunity-recommendation"
  | "risk-summary";

export type StructuredCardData = {
  type: StructuredCardType;
  title: string;
  items: { label: string; value: string }[];
};

export type AgentMockResponse = {
  promptMatch: string;
  reply: string;
  insights: InsightCard[];
  structuredCards?: StructuredCardData[];
  walletContext?: string;
  protocolContext?: string;
};

const keywordMatchers: { pattern: RegExp; cards: StructuredCardType[] }[] = [
  {
    pattern: /wallet|portfolio|balance|address|transaction/i,
    cards: ["wallet-intelligence", "risk-summary"],
  },
  {
    pattern: /protocol|kuru|ambient|apriori|magma|bean|monadswap|layerzero|wormhole/i,
    cards: ["protocol-insight"],
  },
  {
    pattern: /opportunit|yield|staking|stake|defi/i,
    cards: ["opportunity-recommendation", "risk-summary"],
  },
  {
    pattern: /ecosystem|activity|network|trend/i,
    cards: ["protocol-insight", "risk-summary"],
  },
];

export function detectStructuredCards(prompt: string): StructuredCardType[] {
  const found = new Set<StructuredCardType>();
  for (const { pattern, cards } of keywordMatchers) {
    if (pattern.test(prompt)) {
      cards.forEach((c) => found.add(c));
    }
  }
  return [...found];
}

function buildStructuredCards(
  prompt: string,
  types: StructuredCardType[],
): StructuredCardData[] {
  const normalized = prompt.toLowerCase();

  return types.map((type) => {
    switch (type) {
      case "wallet-intelligence":
        return {
          type,
          title: "Wallet Intelligence",
          items: [
            { label: "Exposure", value: "3 protocols · moderate concentration" },
            { label: "Native assets", value: "42% MON" },
            { label: "Stablecoins", value: "24%" },
            { label: "Signal", value: "No anomalous outflows (48h)" },
          ],
        };
      case "protocol-insight": {
        const protocol =
          ["kuru", "ambient", "apriori", "magma", "bean", "monadswap"]
            .map((name) => getProtocolByName(name))
            .find((p) => p && normalized.includes(p.name.toLowerCase())) ??
          getProtocolByName("Kuru");

        return {
          type,
          title: "Protocol Insight",
          items: [
            { label: "Protocol", value: protocol?.name ?? "Kuru" },
            { label: "Category", value: protocol?.category ?? "DEX" },
            { label: "Signal", value: protocol?.signal ?? "Volume surge" },
            {
              label: "Confidence",
              value: `${protocol?.confidence ?? 94}%`,
            },
          ],
        };
      }
      case "opportunity-recommendation":
        return {
          type,
          title: "Opportunity Recommendation",
          items: [
            { label: "Primary", value: "Apriori staking — yield expansion" },
            { label: "Secondary", value: "Kuru DEX — volume breakout" },
            { label: "Confidence", value: "88% fit (moderate risk)" },
            { label: "Action", value: "Review lock period before sizing" },
          ],
        };
      case "risk-summary":
        return {
          type,
          title: "Risk Summary",
          items: [
            { label: "Posture", value: "Low–moderate" },
            { label: "Concentration", value: "Top 3 protocols · 68%" },
            { label: "Liquidity", value: "Strong" },
            { label: "Alert", value: "None critical" },
          ],
        };
      default:
        return { type, title: "Insight", items: [] };
    }
  });
}

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
    walletContext: "Connect wallet for live address · 8 protocols indexed",
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
    walletContext: "Ecosystem scan · no wallet required",
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
  const base = match ?? defaultAgentReply;
  const cardTypes = detectStructuredCards(prompt);
  const structuredCards =
    cardTypes.length > 0
      ? buildStructuredCards(prompt, cardTypes)
      : base.structuredCards;

  return {
    ...base,
    ...(structuredCards ? { structuredCards } : {}),
  };
}
