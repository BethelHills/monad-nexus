export function buildAgentChatUrl(prompt: string): string {
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

export function buildOpportunityAnalyzeUrl(title: string): string {
  return buildAgentChatUrl(`Analyze ${title} on Monad`);
}

export function buildProtocolAnalyzeUrl(protocol: string): string {
  return buildAgentChatUrl(`Analyze ${protocol} on Monad`);
}

export function buildHistoryReviewUrl(title: string): string {
  return buildAgentChatUrl(`Review this Monad insight: ${title}`);
}
