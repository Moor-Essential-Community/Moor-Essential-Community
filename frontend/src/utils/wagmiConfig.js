import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, sepolia, polygonMumbai, hardhat } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "MECCA.DAO",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "mecca-dao-dev",
  chains: [mainnet, polygon, sepolia, polygonMumbai, hardhat],
  ssr: false,
});
