# MECCA.DAO — Moor Essential Community Collective Advancement

> *"Building generational wealth and sovereign prosperity for humanity — on-chain, forever."*

---

## What is MECCA.DAO?

**MECCA.DAO** is a fully on-chain Decentralized Autonomous Organization built by and for the **Moor Essential Community**. It is a living institution designed to produce, promote, and protect generational wealth through transparent governance, philanthropic coordination, DeFi infrastructure, GameFi integration, and sovereign digital identity via NFT membership.

MECCA.DAO is not a project — it is a people's treasury, governed by its members, accountable to no master but the community's collective will.

---

## Vision

- **Sovereignty** — Members hold power. No centralized authority controls funds or governance.
- **Generational Wealth** — Staking, yield, and treasury growth compound across generations.
- **Philanthropy** — A dedicated on-chain vault funds community-voted charitable causes.
- **Education** — Contract-Law, DeFi literacy, and Web3 sovereignty for all members.
- **GameFi** — Play-to-earn mechanisms that reward community participation.

---

## Architecture

```
MECCA.DAO
├── contracts/               # Solidity smart contracts
│   ├── MECCAToken.sol       # ERC-20 governance token (ERC20Votes)
│   ├── MECCAGovernor.sol    # On-chain governance (OpenZeppelin Governor)
│   ├── MECCATimelockController.sol  # Execution delay timelock
│   ├── MECCATreasury.sol    # Community treasury (ETH + ERC-20)
│   ├── MECCANFTMembership.sol       # Soulbound ERC-721 membership NFTs
│   ├── MECCAStaking.sol     # Token staking for rewards + voting boost
│   └── MECCAPhilanthropyVault.sol   # Charitable allocation vault
├── scripts/                 # Deployment & verification scripts
├── test/                    # Hardhat test suites
├── frontend/                # React + Vite + TailwindCSS dApp
└── docs/                    # Whitepaper, governance, tokenomics
```

---

## Dual-Token Model

| Token | Symbol | Max Supply | Role |
|---|---|---|---|
| MEC Governance Token | $MEC | **144,000,000** | Governance votes, proposals, DAO control |
| MECCA Ecosystem Token | $MECCA | **9,000,000,000** | Staking rewards, GameFi, DeFi utility |

See [docs/TOKENOMICS.md](docs/TOKENOMICS.md) for full distribution and vesting details.

---

## Governance

Proposals → Voting → Timelock → Execution. Every treasury action, vault allocation, and protocol upgrade is voted on by $MECCA holders. See [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

---

## Membership NFTs

Three soulbound tiers bind identity to the DAO:

| Tier | Name | Supply |
|---|---|---|
| 0 | Ally | Unlimited |
| 1 | Community | 7,777 |
| 2 | Founding | 777 |

---

## Tech Stack

- **Smart Contracts**: Solidity 0.8.24, OpenZeppelin 5.x, Hardhat
- **Testing**: Hardhat + Ethers.js v6 + Chai
- **Frontend**: React 18, Vite, TailwindCSS, Wagmi v2, RainbowKit v2
- **Networks**: Ethereum Mainnet, Polygon, Goerli (testnet)

---

## Quick Start

```bash
# Clone
git clone https://github.com/moor-essential-community/moor-essential-community
cd moor-essential-community

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy locally
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Start frontend
cd frontend && npm install && npm run dev
```

---

## Roadmap

| Phase | Milestone | Status |
|---|---|---|
| Genesis | Smart contracts + DAO infrastructure | 🟡 In Progress |
| Founding | Founding NFT mint + token distribution | ⬜ Upcoming |
| Treasury | Treasury activation + first proposals | ⬜ Upcoming |
| Philanthropy | First charity vault allocation vote | ⬜ Upcoming |
| GameFi | Play-to-earn module integration | ⬜ Planned |
| Expansion | Cross-chain bridge (Polygon ↔ ETH) | ⬜ Planned |

---

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md). All community members are welcome.

---

## Connect

- Linktree: https://linktr.ee/moor_essential_community
- Email: mooressentialcommunity@protonmail.com

---

*MECCA.DAO — Built for the people. Governed by the people. Preserved for generations.*
