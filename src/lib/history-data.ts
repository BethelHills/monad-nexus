export type HistoryType = "ai" | "wallet" | "protocol" | "opportunity";

export type HistoryEntry = {
  id: string;
  type: HistoryType;
  title: string;
  summary: string;
  timestamp: string;
  tags: string[];
  reviewPrompt: string;
};

export const historyEntries: HistoryEntry[] = [
  {
    id: "h1",
    type: "ai",
    title: "Wallet risk review completed",
    summary: "AI classified portfolio risk as low–moderate with stablecoin drift +6%.",
    timestamp: "Today · 2:14 PM",
    tags: ["wallet", "risk"],
    reviewPrompt: "Analyze my Monad wallet risk profile",
  },
  {
    id: "h2",
    type: "protocol",
    title: "Kuru volume analysis",
    summary: "Compared 24h swap volume against 7d baseline — +31% breakout detected.",
    timestamp: "Today · 11:02 AM",
    tags: ["kuru", "dex"],
    reviewPrompt: "Analyze Kuru on Monad",
  },
  {
    id: "h3",
    type: "wallet",
    title: "Portfolio allocation snapshot",
    summary: "MON 42%, Stables 24%, DeFi 20%, Other 14%. Health score 92.",
    timestamp: "Yesterday · 6:40 PM",
    tags: ["allocation"],
    reviewPrompt: "Analyze my Monad wallet allocation",
  },
  {
    id: "h4",
    type: "opportunity",
    title: "Staking opportunity scan",
    summary: "Apriori and Magma flagged as best-fit yield venues for current profile.",
    timestamp: "Yesterday · 3:18 PM",
    tags: ["staking", "yield", "opportunity"],
    reviewPrompt: "Find staking opportunities on Monad",
  },
  {
    id: "h5",
    type: "protocol",
    title: "Ambient liquidity report",
    summary: "Depth improved across major pairs; recommended for liquidity providers.",
    timestamp: "Mar 2 · 9:55 AM",
    tags: ["ambient", "liquidity"],
    reviewPrompt: "Analyze Ambient on Monad",
  },
  {
    id: "h6",
    type: "wallet",
    title: "Anomaly check — no flags",
    summary: "No unusual outflows or contract interactions in the last 48 hours.",
    timestamp: "Mar 1 · 8:12 PM",
    tags: ["security"],
    reviewPrompt: "Explain recent wallet activity on Monad",
  },
];

export type HistoryFilter =
  | "all"
  | "agent"
  | "wallet"
  | "protocol"
  | "opportunity";
