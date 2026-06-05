"use client";

import { useEffect } from "react";
import { logAomiApiKeyDiagnostics } from "@/lib/aomi-api-key-debug";
import { useControl } from "@aomi-labs/react";

type AomiApiKeyRuntimeDiagnosticsProps = {
  propApiKey?: string;
  clientOptionsApiKey?: string;
};

export function AomiApiKeyRuntimeDiagnostics({
  propApiKey,
  clientOptionsApiKey,
}: AomiApiKeyRuntimeDiagnosticsProps) {
  const { state } = useControl();

  useEffect(() => {
    logAomiApiKeyDiagnostics("client:runtime", {
      source: "prop",
      apiKey: propApiKey,
      clientOptionsApiKey,
      runtimeControlApiKey: state.apiKey,
      hideApiKey: Boolean(propApiKey),
    });
  }, [clientOptionsApiKey, propApiKey, state.apiKey]);

  return null;
}
