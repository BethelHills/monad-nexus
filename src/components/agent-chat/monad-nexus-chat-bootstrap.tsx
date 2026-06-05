"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAssistantApi } from "@assistant-ui/react";
import { useAomiRuntime, useControl } from "@aomi-labs/react";

export const MONAD_NEXUS_DEFAULT_PROMPT =
  "What protocols are active on Monad?";

type MonadNexusChatBootstrapProps = {
  initialPrompt?: string;
  autoSend?: boolean;
  onPromptSent?: (prompt: string) => void;
};

export function MonadNexusChatBootstrap({
  initialPrompt: initialPromptProp,
  autoSend = false,
  onPromptSent,
}: MonadNexusChatBootstrapProps) {
  const searchParams = useSearchParams();
  const promptFromUrl = searchParams.get("prompt")?.trim();
  const initialPrompt =
    promptFromUrl || initialPromptProp || MONAD_NEXUS_DEFAULT_PROMPT;

  const api = useAssistantApi();
  const { sendMessage, getMessages, threadViewKey } = useAomiRuntime();
  const { getAvailableModels, getAuthorizedApps, syncCurrentThreadControl } =
    useControl();
  const hasAutoSentRef = useRef(false);
  const lastPromptRef = useRef(initialPrompt);

  useEffect(() => {
    void getAvailableModels();
    void getAuthorizedApps();
  }, [getAvailableModels, getAuthorizedApps]);

  useEffect(() => {
    let cancelled = false;
    const promptChanged = lastPromptRef.current !== initialPrompt;
    if (promptChanged) {
      lastPromptRef.current = initialPrompt;
      if (promptFromUrl) {
        hasAutoSentRef.current = false;
      }
    }

    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (cancelled) return;

      try {
        api.composer().setText(initialPrompt);
      } catch (error) {
        console.error("Failed to set composer text:", error);
      }

      const shouldAutoSend =
        autoSend && !hasAutoSentRef.current && getMessages().length === 0;

      if (!shouldAutoSend) {
        return;
      }

      try {
        await syncCurrentThreadControl();
        await sendMessage(initialPrompt);
        hasAutoSentRef.current = true;
        onPromptSent?.(initialPrompt);
      } catch (error) {
        console.error("Failed to send initial Monad Nexus prompt:", error);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    api,
    autoSend,
    getMessages,
    initialPrompt,
    onPromptSent,
    promptFromUrl,
    sendMessage,
    syncCurrentThreadControl,
    threadViewKey,
  ]);

  return null;
}
