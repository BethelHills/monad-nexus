export function buildAgentChatUrl(prompt: string): string {
  return `/agent-chat?prompt=${encodeURIComponent(prompt)}`;
}

export function buildOpportunityAnalyzeUrl(
  title: string,
  protocol: string,
): string {
  return buildAgentChatUrl(`Analyze ${title} on ${protocol} on Monad`);
}
