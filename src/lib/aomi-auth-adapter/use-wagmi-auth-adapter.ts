"use client";

import { useCallback, useMemo } from "react";
import {
  toViemSignMessageArgs,
  toViemSignTypedDataArgs,
  type WalletEip712Payload,
  type WalletTxPayload,
} from "@aomi-labs/react";
import {
  useAccount,
  useConfig,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useSwitchChain,
} from "wagmi";
import { MONAD_TESTNET_CHAIN_ID } from "@/lib/chains/monad";
import {
  AOMI_AUTH_BOOTING_IDENTITY,
  AOMI_AUTH_DISCONNECTED_IDENTITY,
} from "./identity";
import type { AomiAuthAdapter, AomiAuthIdentity } from "./types";
import {
  executeAdapterTransaction,
  getPreferredRpcUrl,
} from "./wallet-execution";

export function useWagmiAuthAdapter(): AomiAuthAdapter {
  const wagmiConfig = useConfig();
  const {
    address,
    chainId,
    isConnected,
    isConnecting,
    isReconnecting,
  } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { signTypedDataAsync } = useSignTypedData();
  const { signMessageAsync } = useSignMessage();

  const isReady = !isConnecting && !isReconnecting;
  const supportedChains = wagmiConfig.chains;
  const chainsById = useMemo(
    () => Object.fromEntries(supportedChains.map((chain) => [chain.id, chain])),
    [supportedChains],
  );

  const identity: AomiAuthIdentity = useMemo(() => {
    if (!isReady) {
      return AOMI_AUTH_BOOTING_IDENTITY;
    }
    if (!isConnected) {
      return AOMI_AUTH_DISCONNECTED_IDENTITY;
    }
    return {
      status: "connected",
      isConnected: true,
      address,
      chainId,
      authMethod: "wagmi",
      walletKind: "eoa",
      aaMode: "none",
    };
  }, [isReady, isConnected, address, chainId]);

  const connect = useCallback(async () => {
    const connector =
      connectors.find((item) => item.ready) ?? connectors[0];
    if (!connector) {
      throw new Error("No wallet connector available");
    }
    await connectAsync({
      connector,
      chainId: MONAD_TESTNET_CHAIN_ID,
    });
  }, [connectAsync, connectors]);

  const disconnect = useCallback(async () => {
    await disconnectAsync();
  }, [disconnectAsync]);

  const switchChain = useCallback(
    async (nextChainId: number) => {
      await switchChainAsync({ chainId: nextChainId });
    },
    [switchChainAsync],
  );

  const effectiveChainId = chainId ?? MONAD_TESTNET_CHAIN_ID;

  return useMemo(
    (): AomiAuthAdapter => ({
      identity,
      isReady,
      isSwitchingChain,
      canConnect: isReady && !isConnected && connectors.length > 0,
      canOpenAccountUI: false,
      canDisconnect: isReady && isConnected,
      supportedChains,
      connect,
      disconnect: isConnected ? disconnect : undefined,
      switchChain: isConnected ? switchChain : undefined,
      sendTransaction: isConnected
        ? async (payload: WalletTxPayload) =>
            executeAdapterTransaction({
              payload,
              state: {
                currentChainId: effectiveChainId,
                sendTransactionAsync,
                switchChainAsync: switchChainAsync,
                chainsById,
                getPreferredRpcUrl,
              },
            })
        : undefined,
      signTypedData: isConnected
        ? async (payload: WalletEip712Payload) => {
            const signArgs = toViemSignTypedDataArgs(payload);
            if (!signArgs) {
              throw new Error("Missing typed_data payload");
            }
            const signature = await signTypedDataAsync(signArgs as never);
            return { signature };
          }
        : undefined,
      signMessage: isConnected
        ? async (payload: WalletEip712Payload) => {
            const messageArgs = toViemSignMessageArgs(payload);
            if (!messageArgs) {
              throw new Error("Missing message payload");
            }
            const signature = await signMessageAsync(messageArgs as never);
            return { signature };
          }
        : undefined,
    }),
    [
      identity,
      isReady,
      isSwitchingChain,
      isConnected,
      connectors.length,
      supportedChains,
      connect,
      disconnect,
      switchChain,
      sendTransactionAsync,
      signTypedDataAsync,
      signMessageAsync,
      effectiveChainId,
      switchChainAsync,
      chainsById,
    ],
  );
}
