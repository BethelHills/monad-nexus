"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { WalletStatusButton } from "@/components/wallet/wallet-status-button";
import { MotionButton, MotionReveal } from "@/components/ui/motion";
import { NexusSearchBar } from "@/components/ui/nexus-search-bar";
import { NexusStatusBadge } from "@/components/ui/nexus-status-badge";
import { buildAgentChatUrl } from "@/lib/agent-prompts";
import {
  defaultSettings,
  loadSettings,
  saveSettings,
  type AiVerbosity,
  type NexusSettings,
  type RiskPreference,
} from "@/lib/settings-data";
import { cn } from "@/lib/utils";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span className="text-sm text-[#A3A3A3]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-[#14F195]" : "bg-[#242424]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked && "translate-x-5",
          )}
        />
      </button>
    </label>
  );
}

function SettingsForm() {
  const [settings, setSettings] = useState<NexusSettings>(() => loadSettings());
  const [providerSearch, setProviderSearch] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(
    "Settings restored from your device.",
  );

  function update<K extends keyof NexusSettings>(key: K, value: NexusSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
    setStatusMessage(null);
  }

  function handleSave() {
    saveSettings(settings);
    setStatusMessage("Settings saved successfully.");
    setTimeout(() => setStatusMessage(null), 3000);
  }

  function handleReset() {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
    setStatusMessage("Settings reset to defaults.");
    setTimeout(() => setStatusMessage(null), 3000);
  }

  const providerOptions = [
    "OpenRouter",
    "Aomi API",
    "Custom endpoint",
    "Local model",
  ];
  const filteredProviders = providerOptions.filter((p) =>
    p.toLowerCase().includes(providerSearch.trim().toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <MotionReveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
          Settings
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Preferences
        </h1>
        <p className="mt-2 text-sm text-[#A3A3A3]">
          Configure AI behavior, risk, notifications, and data sources. Saved to
          your browser.
        </p>
        <div className="mt-3">
          <NexusStatusBadge label="Demo intelligence data" tone="demo" />
        </div>
      </MotionReveal>

      <div className="mt-8 space-y-6">
        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">Wallet</h2>
          <p className="mt-2 text-xs text-[#A3A3A3]">
            Connect a wallet for personalized Monad analysis in Agent Chat.
          </p>
          <div className="mt-4">
            <WalletStatusButton className="w-full sm:w-auto sm:max-w-[260px]" />
          </div>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">AI provider</h2>
          <p className="mt-2 text-xs text-[#A3A3A3]">
            Search providers or open Agent Chat for setup help.
          </p>
          <div className="mt-4">
            <NexusSearchBar
              value={providerSearch}
              onChange={setProviderSearch}
              onSubmit={() => undefined}
              placeholder="Search AI providers..."
              submitLabel="Search"
              ariaLabel="Search AI providers"
              emptyHint="Type a provider name to filter the list."
            />
          </div>
          <ul className="mt-4 space-y-2">
            {filteredProviders.length === 0 ? (
              <li className="text-xs text-[#A3A3A3]">No providers match.</li>
            ) : (
              filteredProviders.map((provider) => (
                <li
                  key={provider}
                  className="rounded-lg border border-[#242424] bg-[#141414] px-3 py-2 text-sm text-white"
                >
                  {provider}
                </li>
              ))
            )}
          </ul>
          <Link
            href={buildAgentChatUrl(
              "Help me configure AI settings for Monad Nexus",
            )}
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-[#14F195]/30 bg-[#14F195]/10 px-4 py-2.5 text-sm font-medium text-[#14F195] transition-colors hover:border-[#14F195]/50 sm:w-auto"
          >
            Configure AI Provider
          </Link>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">AI behavior</h2>
          <label className="mt-4 block text-xs text-[#A3A3A3]">Verbosity</label>
          <select
            value={settings.aiVerbosity}
            onChange={(e) =>
              update("aiVerbosity", e.target.value as AiVerbosity)
            }
            className="mt-2 w-full rounded-lg border border-[#242424] bg-[#141414] px-3 py-2.5 text-sm text-white outline-none focus:border-[#14F195]/50"
          >
            <option value="concise">Concise</option>
            <option value="balanced">Balanced</option>
            <option value="detailed">Detailed</option>
          </select>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">Risk preference</h2>
          <label className="mt-4 block text-xs text-[#A3A3A3]">Profile</label>
          <select
            value={settings.riskPreference}
            onChange={(e) =>
              update("riskPreference", e.target.value as RiskPreference)
            }
            className="mt-2 w-full rounded-lg border border-[#242424] bg-[#141414] px-3 py-2.5 text-sm text-white outline-none focus:border-[#14F195]/50"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">Notifications</h2>
          <div className="mt-3 divide-y divide-[#242424]">
            <Toggle
              label="Opportunity alerts"
              checked={settings.notifications.opportunities}
              onChange={(v) =>
                update("notifications", {
                  ...settings.notifications,
                  opportunities: v,
                })
              }
            />
            <Toggle
              label="Wallet activity"
              checked={settings.notifications.wallet}
              onChange={(v) =>
                update("notifications", {
                  ...settings.notifications,
                  wallet: v,
                })
              }
            />
            <Toggle
              label="Protocol signals"
              checked={settings.notifications.protocols}
              onChange={(v) =>
                update("notifications", {
                  ...settings.notifications,
                  protocols: v,
                })
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">Wallet preferences</h2>
          <div className="mt-3 divide-y divide-[#242424]">
            <Toggle
              label="Auto-analyze on connect"
              checked={settings.wallet.autoAnalyzeOnConnect}
              onChange={(v) =>
                update("wallet", {
                  ...settings.wallet,
                  autoAnalyzeOnConnect: v,
                })
              }
            />
            <Toggle
              label="Show testnet banner"
              checked={settings.wallet.showTestnetBanner}
              onChange={(v) =>
                update("wallet", {
                  ...settings.wallet,
                  showTestnetBanner: v,
                })
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-5">
          <h2 className="text-sm font-semibold text-white">Data sources</h2>
          <div className="mt-3 divide-y divide-[#242424]">
            <Toggle
              label="On-chain data"
              checked={settings.dataSources.onChain}
              onChange={(v) =>
                update("dataSources", {
                  ...settings.dataSources,
                  onChain: v,
                })
              }
            />
            <Toggle
              label="Protocol APIs"
              checked={settings.dataSources.protocolApis}
              onChange={(v) =>
                update("dataSources", {
                  ...settings.dataSources,
                  protocolApis: v,
                })
              }
            />
            <Toggle
              label="Ecosystem index"
              checked={settings.dataSources.ecosystemIndex}
              onChange={(v) =>
                update("dataSources", {
                  ...settings.dataSources,
                  ecosystemIndex: v,
                })
              }
            />
          </div>
        </section>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <MotionButton
            type="button"
            onClick={handleSave}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#14F195] px-5 py-3 text-sm font-semibold text-[#050505] sm:flex-1"
          >
            Save settings
          </MotionButton>
          <MotionButton
            type="button"
            onClick={handleReset}
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#242424] bg-[#0E0E0E] px-5 py-3 text-sm font-medium text-white sm:flex-1"
          >
            Reset defaults
          </MotionButton>
        </div>

        {statusMessage && (
          <p className="text-center text-xs text-[#14F195]" role="status">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export function SettingsWorkspace() {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-sm text-[#A3A3A3]">
        Loading settings…
      </div>
    );
  }

  return <SettingsForm />;
}
