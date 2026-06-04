export const suggestedPrompts = [
  "Analyze my Monad wallet",
  "Show trending protocols",
  "Find staking opportunities",
  "Explain ecosystem activity",
] as const;

export const ecosystemNodes = [
  { id: "monad", label: "Monad", x: 50, y: 50, center: true },
  { id: "kuru", label: "Kuru", x: 72, y: 28 },
  { id: "ambient", label: "Ambient", x: 82, y: 50 },
  { id: "apriori", label: "Apriori", x: 72, y: 72 },
  { id: "magma", label: "Magma", x: 50, y: 82 },
  { id: "bean", label: "Bean Exchange", x: 28, y: 72 },
  { id: "monadswap", label: "MonadSwap", x: 18, y: 50 },
  { id: "layerzero", label: "LayerZero", x: 28, y: 28 },
  { id: "wormhole", label: "Wormhole", x: 50, y: 18 },
] as const;

export const intelligenceFeedItems = [
  {
    id: "1",
    timestamp: "2m ago",
    category: "DEX",
    insight: "Kuru volume increased 24%",
    confidence: "High",
  },
  {
    id: "2",
    timestamp: "14m ago",
    category: "Liquidity",
    insight: "Ambient liquidity reached a new weekly high",
    confidence: "High",
  },
  {
    id: "3",
    timestamp: "31m ago",
    category: "Staking",
    insight: "Apriori staking activity is rising",
    confidence: "Medium",
  },
  {
    id: "4",
    timestamp: "1h ago",
    category: "Watchlist",
    insight: "New protocols added to Monad watchlist",
    confidence: "Medium",
  },
  {
    id: "5",
    timestamp: "2h ago",
    category: "Wallets",
    insight: "Wallet clusters moved into DeFi positions",
    confidence: "High",
  },
] as const;

export const radarCategories = [
  { label: "Yield", score: 82, angle: 0 },
  { label: "Staking", score: 76, angle: 60 },
  { label: "DEX Activity", score: 91, angle: 120 },
  { label: "New Protocols", score: 64, angle: 180 },
  { label: "Governance", score: 48, angle: 240 },
  { label: "Wallet Signals", score: 88, angle: 300 },
] as const;

export const protocolDirectory = [
  {
    protocol: "Kuru",
    category: "DEX",
    signal: "Volume surge",
    risk: "Low",
  },
  {
    protocol: "Ambient",
    category: "DEX",
    signal: "Liquidity high",
    risk: "Low",
  },
  {
    protocol: "Apriori",
    category: "Staking",
    signal: "Yield rising",
    risk: "Medium",
  },
  {
    protocol: "Magma",
    category: "Staking",
    signal: "Stable inflow",
    risk: "Low",
  },
  {
    protocol: "Bean Exchange",
    category: "DEX",
    signal: "New pairs",
    risk: "Medium",
  },
  {
    protocol: "MonadSwap",
    category: "DEX",
    signal: "Swap momentum",
    risk: "Medium",
  },
] as const;
