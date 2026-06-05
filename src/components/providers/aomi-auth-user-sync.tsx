"use client";

import { useEffect } from "react";
import { useUser } from "@aomi-labs/react";
import { useAomiAuthAdapter } from "@/lib/aomi-auth-adapter";

/** Syncs wagmi wallet identity into Aomi runtime user state. Mount inside AomiFrame only. */
export function AomiAuthUserSync() {
  const adapter = useAomiAuthAdapter();
  const { setUser } = useUser();
  const identity = adapter.identity;

  useEffect(() => {
    setUser({
      address: identity.address ?? undefined,
      walletKind: identity.walletKind ?? undefined,
      chainId: identity.chainId ?? undefined,
      isConnected: identity.isConnected,
      svmAddress: identity.svmAddress ?? undefined,
      walletProvider: identity.isConnected
        ? (identity.walletProvider ?? null)
        : null,
      walletProviderSubject: identity.isConnected
        ? (identity.walletProviderSubject ?? null)
        : null,
      authMethod: identity.isConnected
        ? (identity.authMethod ?? null)
        : null,
      authValue: identity.isConnected ? (identity.authValue ?? null) : null,
      authVerifiedAt: identity.isConnected
        ? (identity.authVerifiedAt ?? null)
        : null,
      sponsored: identity.isConnected ? (identity.sponsored ?? null) : null,
      sponsorProvider: identity.isConnected
        ? (identity.sponsorProvider ?? null)
        : null,
      sponsorAccount: identity.isConnected
        ? (identity.sponsorAccount ?? null)
        : null,
    });
  }, [
    identity.address,
    identity.authMethod,
    identity.authValue,
    identity.authVerifiedAt,
    identity.chainId,
    identity.isConnected,
    identity.walletKind,
    identity.sponsorAccount,
    identity.sponsorProvider,
    identity.sponsored,
    identity.svmAddress,
    identity.walletProvider,
    identity.walletProviderSubject,
    setUser,
  ]);

  return null;
}
