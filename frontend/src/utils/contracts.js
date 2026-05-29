export const CONTRACT_ADDRESSES = {
  MECCAToken: import.meta.env.VITE_MECCA_TOKEN || "",
  MECCAGovernor: import.meta.env.VITE_MECCA_GOVERNOR || "",
  MECCATreasury: import.meta.env.VITE_MECCA_TREASURY || "",
  MECCANFTMembership: import.meta.env.VITE_MECCA_NFT || "",
  MECCAStaking: import.meta.env.VITE_MECCA_STAKING || "",
  MECCAPhilanthropyVault: import.meta.env.VITE_MECCA_VAULT || "",
};

export const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function MAX_SUPPLY() view returns (uint256)",
  "function getVotes(address) view returns (uint256)",
  "function delegate(address delegatee)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

export const GOVERNOR_ABI = [
  "function proposalCount() view returns (uint256)",
  "function state(uint256 proposalId) view returns (uint8)",
  "function castVote(uint256 proposalId, uint8 support)",
  "function propose(address[] targets, uint256[] values, bytes[] calldatas, string description) returns (uint256)",
  "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 voteStart, uint256 voteEnd, string description)",
];

export const STAKING_ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()",
  "function earned(address) view returns (uint256)",
  "function stakes(address) view returns (uint256 amount, uint256 rewardPerTokenPaid, uint256 rewards, uint256 stakedAt)",
  "function totalStaked() view returns (uint256)",
  "function rewardRate() view returns (uint256)",
  "function canUnstake(address) view returns (bool)",
];

export const NFT_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function tokenTier(uint256) view returns (uint8)",
  "function tierMintCount(uint8) view returns (uint256)",
  "function MAX_COMMUNITY() view returns (uint256)",
  "function MAX_FOUNDING() view returns (uint256)",
];

export const TREASURY_ABI = [
  "function ethBalance() view returns (uint256)",
  "function tokenBalance(address) view returns (uint256)",
];

export const VAULT_ABI = [
  "function ethBalance() view returns (uint256)",
  "function allocationCount() view returns (uint256)",
  "function allocations(uint256) view returns (address recipient, address token, uint256 amount, string cause, uint256 timestamp)",
  "function donateERC20(address token, uint256 amount)",
];

export const PROPOSAL_STATES = [
  "Pending", "Active", "Canceled", "Defeated",
  "Succeeded", "Queued", "Expired", "Executed",
];
