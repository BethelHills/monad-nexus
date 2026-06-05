import { MonadNexusAomiChat } from "@/components/agent-chat/monad-nexus-aomi-chat";

export default async function AgentChatPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt } = await searchParams;
  const aomiApiKey =
    process.env.AOMI_API_KEY?.trim() ||
    process.env.OPENROUTER_API_KEY?.trim() ||
    undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <MonadNexusAomiChat initialPrompt={prompt} aomiApiKey={aomiApiKey} />
    </div>
  );
}
