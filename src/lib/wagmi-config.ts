import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";
import { monadTestnet } from "@/lib/chains/monad";

const monadRpc =
  process.env.NEXT_PUBLIC_MONAD_RPC_URL ?? "https://testnet-rpc.monad.xyz";

export const wagmiConfig = createConfig({
  chains: [monadTestnet, mainnet],
  connectors: [
    injected({ target: "metaMask" }),
    injected({ target: "coinbaseWallet" }),
    injected(),
    coinbaseWallet({ appName: "Monad Nexus" }),
  ],
  transports: {
    [monadTestnet.id]: http(monadRpc, { timeout: 12_000 }),
    [mainnet.id]: http(),
  },
  ssr: true,
});
