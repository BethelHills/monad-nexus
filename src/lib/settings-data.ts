export const SETTINGS_STORAGE_KEY = "monad-nexus-settings";

export type AiVerbosity = "concise" | "balanced" | "detailed";
export type RiskPreference = "conservative" | "moderate" | "aggressive";

export type NexusSettings = {
  aiVerbosity: AiVerbosity;
  riskPreference: RiskPreference;
  notifications: {
    opportunities: boolean;
    wallet: boolean;
    protocols: boolean;
  };
  wallet: {
    autoAnalyzeOnConnect: boolean;
    showTestnetBanner: boolean;
  };
  dataSources: {
    onChain: boolean;
    protocolApis: boolean;
    ecosystemIndex: boolean;
  };
};

export const defaultSettings: NexusSettings = {
  aiVerbosity: "balanced",
  riskPreference: "moderate",
  notifications: {
    opportunities: true,
    wallet: true,
    protocols: false,
  },
  wallet: {
    autoAnalyzeOnConnect: true,
    showTestnetBanner: true,
  },
  dataSources: {
    onChain: true,
    protocolApis: true,
    ecosystemIndex: true,
  },
};

export function loadSettings(): NexusSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) } as NexusSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: NexusSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
