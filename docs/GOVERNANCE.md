# MECCA.DAO — Governance Guide

## Overview

MECCA.DAO is governed entirely on-chain using the OpenZeppelin Governor framework. Every significant action — treasury withdrawals, contract upgrades, staking parameters, philanthropy allocations — must pass a community vote before it can be executed.

---

## Governance Parameters

| Parameter | Value |
|---|---|
| Voting Delay | 1 day (time between proposal submission and voting start) |
| Voting Period | 7 days |
| Quorum | 4% of total delegated supply |
| Proposal Threshold | 10,000 MECCA (required to create a proposal) |
| Timelock Delay | 2 days (mandatory delay before execution) |

---

## Lifecycle of a Proposal

```
1. PROPOSE   — Member with ≥ 10,000 MECCA submits a proposal
2. PENDING   — Waiting 1 day for voting to open
3. ACTIVE    — 7-day voting window (For / Against / Abstain)
4. SUCCEEDED — Quorum met, majority For
5. QUEUED    — Entered 2-day timelock
6. EXECUTED  — Action carried out on-chain
```

Alternative outcomes:
- **DEFEATED** — Quorum not met, or majority Against
- **CANCELED** — Proposer cancels before execution (if still pending/active)
- **EXPIRED** — Passed but not executed within the execution window

---

## How to Create a Proposal

### Prerequisites
- Hold or have delegated to you ≥ 10,000 MECCA at the snapshot block
- Identify the target contract, function, and arguments for your proposed action

### Steps
1. Connect your wallet to [MECCA.DAO](https://mecca.dao)
2. Navigate to Governance → New Proposal
3. Enter the proposal description (be clear and thorough — this is on-chain forever)
4. Specify the target contract calls (address, calldata, ETH value if any)
5. Submit the transaction

### Writing a Good Proposal
- State the **problem** you are solving
- Describe the **proposed solution** precisely
- Include **expected outcomes** and how the community will benefit
- Specify **risk mitigations**
- Link to any off-chain discussion (Discord, forum)

---

## Delegation

$MECCA votes must be delegated to count. You can:
- Delegate to yourself: `token.delegate(yourAddress)`
- Delegate to a trusted community member
- Delegation is gasless via EIP-712 permit

---

## Proposal Types

| Type | Description |
|---|---|
| Treasury Withdrawal | Move ETH or tokens from treasury to a recipient |
| Philanthropy Allocation | Direct vault funds to a charitable cause |
| Staking Parameters | Adjust reward rate, lock period |
| Protocol Upgrade | Replace a contract implementation |
| Governance Parameters | Adjust quorum, voting period, proposal threshold |
| NFT Minting | Authorize new membership NFT mints |

---

## Emergency Procedures

In a security emergency, the Timelock's CANCELLER_ROLE (held by the Governor) can cancel queued proposals. There is no emergency pause function — the DAO is designed to be censorship-resistant. For critical vulnerabilities, the community should submit an emergency proposal with a 0-day timelock (a future governance parameter).

---

## Off-Chain Discussion

Before submitting an on-chain proposal, present your idea in the community:
- Linktree: https://linktr.ee/moor_essential_community
- Build consensus before spending proposal threshold tokens

---

*Governance is how the community speaks. Vote with intention.*
