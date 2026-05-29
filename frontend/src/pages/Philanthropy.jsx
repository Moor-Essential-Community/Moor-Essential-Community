import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESSES, VAULT_ABI } from "../utils/contracts";

const PAST_ALLOCATIONS = [];

export default function Philanthropy() {
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [donateAmt, setDonateAmt] = useState("");

  const handleDonate = () => {
    // ETH donation via direct send — handled by wallet
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-mecca-gold">Philanthropy Vault</h1>
        <p className="text-mecca-muted mt-1">
          A dedicated on-chain vault where the community votes to fund charitable causes
          and uplifting projects.
        </p>
      </div>

      {/* Vault stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <p className="stat-label">Vault Balance</p>
          <p className="stat-value">—</p>
          <p className="text-xs text-mecca-muted">ETH</p>
        </div>
        <div className="card">
          <p className="stat-label">Total Allocated</p>
          <p className="stat-value">{PAST_ALLOCATIONS.length}</p>
          <p className="text-xs text-mecca-muted">Causes Funded</p>
        </div>
      </div>

      {/* Donate */}
      <div className="card">
        <h2 className="text-xl font-display text-mecca-text mb-4">Donate to the Vault</h2>
        <p className="text-sm text-mecca-muted mb-4">
          Anyone can donate ETH to the Philanthropy Vault. Only governance can allocate it.
        </p>
        <div className="flex gap-3">
          <input
            type="number"
            value={donateAmt}
            onChange={e => setDonateAmt(e.target.value)}
            placeholder="Amount in ETH"
            className="flex-1 bg-mecca-dark border border-mecca-border rounded-lg px-4 py-3 text-mecca-text focus:outline-none focus:border-mecca-gold transition-colors"
          />
          <button
            onClick={handleDonate}
            disabled={!isConnected || !donateAmt}
            className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Donate
          </button>
        </div>
      </div>

      {/* Mission */}
      <div className="card bg-mecca-gold/5 border-mecca-gold/20">
        <h2 className="text-xl font-display text-mecca-gold mb-3">Our Philanthropic Mission</h2>
        <p className="text-sm text-mecca-muted leading-relaxed">
          MECCA.DAO believes that decentralized technology is a tool for liberation. The
          Philanthropy Vault exists to convert collective wealth into collective upliftment —
          funding education, community development, health initiatives, and cultural preservation
          for the Moor Essential Community and humanity at large. Every allocation is voted on,
          transparent, and immutably recorded on-chain for future generations to verify.
        </p>
      </div>

      {/* Allocation history */}
      <div>
        <h2 className="text-xl font-display text-mecca-text mb-4">Allocation History</h2>
        {PAST_ALLOCATIONS.length === 0 ? (
          <div className="card text-center py-10 text-mecca-muted border-dashed">
            The first allocation awaits a governance vote. Submit a proposal to fund a cause.
          </div>
        ) : (
          <div className="space-y-3">
            {PAST_ALLOCATIONS.map((a, i) => (
              <div key={i} className="card flex justify-between items-center">
                <div>
                  <p className="font-medium text-mecca-text">{a.cause}</p>
                  <p className="text-xs text-mecca-muted">
                    To: {a.recipient.slice(0, 6)}...{a.recipient.slice(-4)}
                  </p>
                </div>
                <p className="text-mecca-gold font-semibold">{a.amount} ETH</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
