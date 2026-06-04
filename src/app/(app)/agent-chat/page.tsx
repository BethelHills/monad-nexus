import { AgentChatWorkspace } from "@/components/agent-chat/agent-chat-workspace";

export default async function AgentChatPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt } = await searchParams;
  return <AgentChatWorkspace initialPrompt={prompt} />;
}
