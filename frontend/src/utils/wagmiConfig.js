import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { mainnet, polygon, sepolia, hardhat } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = getDefaultConfig({
  appName: "MECCA.DAO",
  appDescription: "Moor Essential Community Collective Advancement",
  appUrl: typeof window !== "undefined" ? window.location.origin : "https://mecca.dao",
  projectId,
  wallets: [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        trustWallet,
        rainbowWallet,
      ],
    },
  ],
  chains: [mainnet, polygon, sepolia, hardhat],
  ssr: false,
});
