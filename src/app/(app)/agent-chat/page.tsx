import { MonadNexusAomiChat } from "@/components/agent-chat/monad-nexus-aomi-chat";
import {
  logAomiApiKeyDiagnostics,
  resolveAomiApiKeyFromEnv,
} from "@/lib/aomi-api-key-debug";

export default async function AgentChatPage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt } = await searchParams;
  const envDiagnostics = resolveAomiApiKeyFromEnv();
  const aomiApiKey = envDiagnostics.apiKey;

  logAomiApiKeyDiagnostics("server:agent-chat/page", {
    source: envDiagnostics.source,
    apiKey: aomiApiKey,
    aomiApiKeySet: envDiagnostics.aomiApiKeySet,
    openRouterApiKeySet: envDiagnostics.openRouterApiKeySet,
    hideApiKey: Boolean(aomiApiKey),
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <MonadNexusAomiChat initialPrompt={prompt} aomiApiKey={aomiApiKey} />
    </div>
  );
}
