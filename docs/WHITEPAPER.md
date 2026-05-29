# MECCA.DAO — Whitepaper

**Moor Essential Community Collective Advancement**
*Version 1.0 | 2024*

---

## Abstract

MECCA.DAO is a fully on-chain Decentralized Autonomous Organization designed to produce, promote, and protect generational wealth for the Moor Essential Community and humanity. It is governed by $MECCA token holders, secured by Ethereum, and architected around seven core smart contracts covering governance, treasury, staking, NFT membership, and philanthropic allocation.

This paper describes the vision, architecture, tokenomics, and governance framework of MECCA.DAO.

---

## 1. Vision

The Moor Essential Community (MEC) was founded on the principle that sovereignty — financial, cultural, and civic — is a human birthright. MECCA.DAO extends this principle into the digital realm: a living institution that no single authority can seize, censor, or corrupt.

MECCA.DAO is:
- **Sovereign** — governed entirely by code and community vote
- **Transparent** — all actions, funds, and votes are on-chain and auditable forever
- **Regenerative** — designed to compound wealth across generations, not extract it
- **Philanthropic** — hardcoded to allocate resources to causes the community selects

---

## 2. Architecture

### 2.1 Smart Contract Stack

| Contract | Purpose |
|---|---|
| `MECCAToken` | ERC-20 governance token with vote delegation and snapshot |
| `MECCAGovernor` | On-chain proposal, voting, and execution engine |
| `MECCATimelockController` | 2-day execution delay for all governance actions |
| `MECCATreasury` | Multi-asset community treasury (ETH + ERC-20) |
| `MECCANFTMembership` | Soulbound ERC-721 membership in three tiers |
| `MECCAStaking` | Stake MECCA to earn rewards; amplifies voting power |
| `MECCAPhilanthropyVault` | Dedicated charitable allocation vault |

### 2.2 Governance Flow

```
Member → Proposal → Voting Delay (1 day) → Voting Period (7 days)
→ Quorum Check (4%) → Timelock Queue (2 days) → Execution
```

No action bypasses this flow. The Timelock is the sole administrator of all contracts after deployment. The deployer key is revoked.

---

## 3. Tokenomics

See [TOKENOMICS.md](TOKENOMICS.md) for full detail.

MECCA.DAO runs a **dual-token architecture**:

### $MEC — Governance Token
**Max Supply: 144,000,000** (sacred number of the sealed elect)

| Allocation | % | Amount (MEC) |
|---|---|---|
| Community Treasury | 35% | 50,400,000 |
| Founding Members | 15% | 21,600,000 |
| Public Distribution | 20% | 28,800,000 |
| Staking Rewards | 20% | 28,800,000 |
| Development Fund | 5% | 7,200,000 |
| Philanthropy Vault | 5% | 7,200,000 |

### $MECCA — Ecosystem Token
**Max Supply: 9,000,000,000** (9 billion — abundance for all)

| Allocation | % | Amount (MECCA) |
|---|---|---|
| Staking Rewards Pool | 30% | 2,700,000,000 |
| Community Treasury | 25% | 2,250,000,000 |
| Public Distribution | 20% | 1,800,000,000 |
| GameFi Rewards | 15% | 1,350,000,000 |
| Philanthropy Vault | 5% | 450,000,000 |
| Development Fund | 5% | 450,000,000 |

---

## 4. Membership

### Tiers

| Tier | Name | Supply | Rights |
|---|---|---|---|
| 2 | Founding | 777 | Full governance, treasury access, genesis votes |
| 1 | Community | 7,777 | Full governance, staking, philanthropy votes |
| 0 | Ally | Unlimited | Observer, path to upgrade |

Membership NFTs are **soulbound** — permanently bound to the holder's address. They cannot be sold, transferred, or taken away. This design ensures governance power reflects genuine community alignment, not capital concentration.

---

## 5. Staking

Members stake $MECCA to:
1. Earn yield (rewards funded from the staking allocation)
2. Signal long-term commitment (7-day lock period)
3. Access future GameFi multipliers

Staking does not create new tokens beyond the pre-allocated reward pool, preventing inflation beyond the max supply cap.

---

## 6. Philanthropy

The Philanthropy Vault holds a dedicated allocation of ETH and MECCA for charitable causes. Any community member may propose an allocation via governance. The DAO votes, and if it passes the timelock, funds are sent directly to the cause's address. Every allocation is permanently recorded on-chain — an immutable ledger of generosity.

---

## 7. Security

- All contracts use OpenZeppelin 5.x battle-tested implementations
- Timelock enforces a mandatory 2-day delay on all governance executions
- Deployer admin key is revoked after deployment — the Timelock is the sole admin
- Reentrancy guards on all fund-moving functions
- SafeERC20 for all token transfers
- Formal audit planned before mainnet deployment

---

## 8. Roadmap

| Phase | Description | Timeline |
|---|---|---|
| Genesis | Contract deployment + Founding NFT mint | Q3 2024 |
| Founding | Token distribution + first proposals | Q4 2024 |
| Treasury | Treasury activation + staking launch | Q1 2025 |
| Philanthropy | First vault allocation vote | Q2 2025 |
| GameFi | Play-to-earn module | Q3 2025 |
| Cross-chain | Polygon bridge + multi-chain presence | Q4 2025 |

---

## 9. Legal Disclaimer

MECCA.DAO is a decentralized protocol. $MECCA tokens are governance tokens that confer voting rights in the DAO, not securities or investment instruments. Participation is at the user's own risk. This document is not financial or legal advice.

---

*MECCA.DAO — Built for the people. Governed by the people. Preserved for generations.*
