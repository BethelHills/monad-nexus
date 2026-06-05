export type AomiApiKeySource = "AOMI_API_KEY" | "OPENROUTER_API_KEY" | null;

export type AomiApiKeyDiagnostics = {
  apiKey: string | undefined;
  source: AomiApiKeySource;
  aomiApiKeySet: boolean;
  openRouterApiKeySet: boolean;
};

export function maskApiKey(key: string | undefined | null): string {
  if (!key?.trim()) return "(empty)";
  const trimmed = key.trim();
  if (trimmed.length <= 8) return "***";
  return `${trimmed.slice(0, 7)}…${trimmed.slice(-4)} (${trimmed.length} chars)`;
}

export function resolveAomiApiKeyFromEnv(): AomiApiKeyDiagnostics {
  const aomiRaw = process.env.AOMI_API_KEY?.trim();
  const openRouterRaw = process.env.OPENROUTER_API_KEY?.trim();

  const aomiApiKeySet = Boolean(aomiRaw);
  const openRouterApiKeySet = Boolean(openRouterRaw);

  if (aomiRaw) {
    return {
      apiKey: aomiRaw,
      source: "AOMI_API_KEY",
      aomiApiKeySet,
      openRouterApiKeySet,
    };
  }

  if (openRouterRaw) {
    return {
      apiKey: openRouterRaw,
      source: "OPENROUTER_API_KEY",
      aomiApiKeySet,
      openRouterApiKeySet,
    };
  }

  return {
    apiKey: undefined,
    source: null,
    aomiApiKeySet,
    openRouterApiKeySet,
  };
}

export function logAomiApiKeyDiagnostics(
  label: string,
  details: {
    source?: AomiApiKeySource | "prop";
    apiKey?: string | undefined;
    aomiApiKeySet?: boolean;
    openRouterApiKeySet?: boolean;
    clientOptionsApiKey?: string | undefined;
    runtimeControlApiKey?: string | null;
    hideApiKey?: boolean;
  },
): void {
  const payload = {
    label,
    source: details.source ?? null,
    hasApiKey: Boolean(details.apiKey?.trim()),
    apiKeyPreview: maskApiKey(details.apiKey),
    aomiApiKeyEnvSet: details.aomiApiKeySet ?? null,
    openRouterApiKeyEnvSet: details.openRouterApiKeySet ?? null,
    clientOptionsHasApiKey: Boolean(details.clientOptionsApiKey?.trim()),
    clientOptionsApiKeyPreview: maskApiKey(details.clientOptionsApiKey),
    runtimeControlHasApiKey: Boolean(details.runtimeControlApiKey?.trim()),
    runtimeControlApiKeyPreview: maskApiKey(details.runtimeControlApiKey),
    hideApiKey: details.hideApiKey ?? null,
  };

  console.log("[Monad Nexus][Aomi API key]", payload);
}
