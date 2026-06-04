import { ecosystemProtocols } from "@/lib/protocols-data";

export type OpportunityCategory =
  | "Yield"
  | "Staking"
  | "DEX Activity"
  | "New Protocols"
  | "Wallet Signals";

export type Opportunity = {
  id: string;
  title: string;
  category: OpportunityCategory;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  protocol: string;
  description: string;
};

export const opportunityCategories: OpportunityCategory[] = [
  "Yield",
  "Staking",
  "DEX Activity",
  "New Protocols",
  "Wallet Signals",
];

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "Apriori staking APR expansion",
    category: "Yield",
    confidence: 88,
    risk: "Medium",
    protocol: "Apriori",
    description: "Yield curve favors medium-term locks on testnet.",
  },
  {
    id: "2",
    title: "Magma validator queue shortening",
    category: "Staking",
    confidence: 81,
    risk: "Low",
    protocol: "Magma",
    description: "Faster unstake windows observed across validators.",
  },
  {
    id: "3",
    title: "Kuru swap volume breakout",
    category: "DEX Activity",
    confidence: 94,
    risk: "Low",
    protocol: "Kuru",
    description: "24h volume +31% vs 7-day baseline.",
  },
  {
    id: "4",
    title: "Ambient liquidity depth record",
    category: "DEX Activity",
    confidence: 89,
    risk: "Low",
    protocol: "Ambient",
    description: "Major pair depth at weekly highs.",
  },
  {
    id: "5",
    title: "Bean Exchange new market launch",
    category: "New Protocols",
    confidence: 72,
    risk: "Medium",
    protocol: "Bean Exchange",
    description: "New pairs listed with early liquidity.",
  },
  {
    id: "6",
    title: "Smart money DeFi rotation",
    category: "Wallet Signals",
    confidence: 86,
    risk: "Medium",
    protocol: "Multi",
    description: "14 wallets added liquidity in 6h window.",
  },
  {
    id: "7",
    title: "MonadSwap momentum signal",
    category: "DEX Activity",
    confidence: 78,
    risk: "Medium",
    protocol: "MonadSwap",
    description: "Swap activity trending on native pairs.",
  },
];

export const radarScores: Record<OpportunityCategory, number> = {
  Yield: 82,
  Staking: 76,
  "DEX Activity": 91,
  "New Protocols": 64,
  "Wallet Signals": 88,
};

export const protocolOpportunityHints = ecosystemProtocols.map((p) => ({
  name: p.name,
  actionPrompt: p.actionPrompt,
  confidence: p.confidence,
  risk: p.risk,
}));
