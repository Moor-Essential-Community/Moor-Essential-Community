# Contributing to MECCA.DAO

Thank you for wanting to contribute to the Moor Essential Community's on-chain infrastructure. Every pull request, bug report, and idea makes MECCA.DAO stronger.

---

## Ways to Contribute

| Type | Description |
|---|---|
| Smart Contracts | Solidity improvements, gas optimizations, new modules |
| Frontend | UI/UX improvements, new pages, accessibility |
| Tests | Increase test coverage, add edge case tests |
| Documentation | Whitepaper updates, governance guides, tutorials |
| Governance | Participate in DAO votes and forum discussions |
| Audit | Security review, vulnerability disclosure |

---

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/moor-essential-community/moor-essential-community
cd moor-essential-community

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Compile contracts
npx hardhat compile

# Run test suite (all must pass)
npx hardhat test

# Start local node
npx hardhat node

# Deploy to local node
npx hardhat run scripts/deploy.js --network localhost

# Start frontend
cd frontend && npm install && npm run dev
```

---

## Code Standards

### Solidity
- Solidity version: `^0.8.24`
- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use OpenZeppelin battle-tested contracts wherever possible — do not reinvent security primitives
- Every public/external function must have NatSpec comments
- All state-changing functions must emit events
- Run `npm run lint` before submitting

### JavaScript / React
- Use functional components and hooks
- Keep components focused and composable
- No console.log in production code
- TailwindCSS for styling — no custom CSS unless necessary

### Git
- Branch from `main` with descriptive branch names: `feat/staking-ui`, `fix/governor-quorum`
- Write clear commit messages in imperative mood: "Add staking reward claim button"
- Keep PRs focused — one feature or fix per PR
- All PRs require passing tests and lint

---

## Pull Request Checklist

- [ ] Tests written and passing (`npx hardhat test`)
- [ ] No new lint errors (`npm run lint`)
- [ ] Contracts compile without warnings (`npx hardhat compile`)
- [ ] Documentation updated if behavior changed
- [ ] No hardcoded private keys or secrets
- [ ] PR description explains what changed and why

---

## Security Vulnerability Disclosure

Do **not** open a public issue for security vulnerabilities. Email:
**mooressentialcommunity@protonmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

Responsible disclosures will be credited in the changelog.

---

## Community

- Linktree: https://linktr.ee/moor_essential_community
- Email: mooressentialcommunity@protonmail.com

---

*Your contribution is a covenant with this community and generations to come.*
