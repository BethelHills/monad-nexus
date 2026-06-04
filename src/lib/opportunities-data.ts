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
  },
  {
    id: "2",
    title: "Magma validator queue shortening",
    category: "Staking",
    confidence: 81,
    risk: "Low",
    protocol: "Magma",
  },
  {
    id: "3",
    title: "Kuru swap volume breakout",
    category: "DEX Activity",
    confidence: 94,
    risk: "Low",
    protocol: "Kuru",
  },
  {
    id: "4",
    title: "Ambient liquidity depth record",
    category: "DEX Activity",
    confidence: 89,
    risk: "Low",
    protocol: "Ambient",
  },
  {
    id: "5",
    title: "Bean Exchange new market launch",
    category: "New Protocols",
    confidence: 72,
    risk: "Medium",
    protocol: "Bean Exchange",
  },
  {
    id: "6",
    title: "Smart money DeFi rotation",
    category: "Wallet Signals",
    confidence: 86,
    risk: "Medium",
    protocol: "Multi",
  },
];

export const radarScores: Record<OpportunityCategory, number> = {
  Yield: 82,
  Staking: 76,
  "DEX Activity": 91,
  "New Protocols": 64,
  "Wallet Signals": 88,
};
