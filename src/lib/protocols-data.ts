export type ProtocolStatus = "Active" | "Watch" | "New" | "Bridge";

export type EcosystemProtocol = {
  id: string;
  name: string;
  category: string;
  signal: string;
  confidence: number;
  risk: "Low" | "Medium" | "High";
  status: ProtocolStatus;
  description: string;
  actionPrompt: string;
  sector?: string;
};

export const ecosystemProtocols: EcosystemProtocol[] = [
  {
    id: "kuru",
    name: "Kuru",
    category: "DEX",
    sector: "DEX",
    signal: "Volume breakout",
    confidence: 94,
    risk: "Low",
    status: "Active",
    description:
      "High-velocity swap venue with rising 24h volume versus the 7-day baseline.",
    actionPrompt: "Analyze Kuru on Monad",
  },
  {
    id: "ambient",
    name: "Ambient",
    category: "DEX",
    sector: "DEX",
    signal: "Liquidity depth",
    confidence: 89,
    risk: "Low",
    status: "Active",
    description:
      "Concentrated liquidity across major pairs with improving depth metrics.",
    actionPrompt: "Analyze Ambient on Monad",
  },
  {
    id: "apriori",
    name: "Apriori",
    category: "Staking",
    sector: "Staking",
    signal: "Yield expansion",
    confidence: 86,
    risk: "Medium",
    status: "Watch",
    description:
      "Staking inflows accelerating with medium-term lock yield opportunities.",
    actionPrompt: "Analyze Apriori staking on Monad",
  },
  {
    id: "magma",
    name: "Magma",
    category: "Staking",
    sector: "Staking",
    signal: "Inflow steady",
    confidence: 81,
    risk: "Low",
    status: "Active",
    description: "Validator flows remain stable with shortening queue times.",
    actionPrompt: "Analyze Magma on Monad",
  },
  {
    id: "bean",
    name: "Bean Exchange",
    category: "DEX",
    sector: "DEX",
    signal: "New market",
    confidence: 72,
    risk: "Medium",
    status: "New",
    description: "New trading pairs listed with early liquidity formation.",
    actionPrompt: "Analyze Bean Exchange on Monad",
  },
  {
    id: "monadswap",
    name: "MonadSwap",
    category: "DEX",
    sector: "DEX",
    signal: "Swap momentum",
    confidence: 78,
    risk: "Medium",
    status: "Active",
    description: "Native swap activity trending on Monad testnet pairs.",
    actionPrompt: "Analyze MonadSwap on Monad",
  },
  {
    id: "layerzero",
    name: "LayerZero",
    category: "Bridge",
    sector: "Infrastructure",
    signal: "Bridge steady",
    confidence: 85,
    risk: "Low",
    status: "Bridge",
    description: "Cross-chain messaging volume stable into Monad ecosystem.",
    actionPrompt: "Explain LayerZero activity on Monad",
  },
  {
    id: "wormhole",
    name: "Wormhole",
    category: "Bridge",
    sector: "Infrastructure",
    signal: "Inflow stable",
    confidence: 83,
    risk: "Low",
    status: "Bridge",
    description: "Bridge inflows consistent with DeFi rotation patterns.",
    actionPrompt: "Explain Wormhole bridge activity on Monad",
  },
];

export function getProtocolByName(name: string): EcosystemProtocol | undefined {
  return ecosystemProtocols.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );
}

export function getProtocolById(id: string): EcosystemProtocol | undefined {
  return ecosystemProtocols.find((p) => p.id === id);
}

export const protocolSignals = ecosystemProtocols.map((p) => ({
  protocol: p.name,
  sector: p.sector ?? p.category,
  signal: p.signal,
  confidence: p.confidence,
  status: p.status,
}));
