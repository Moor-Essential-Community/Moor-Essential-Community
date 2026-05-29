import { useState } from "react";
import { useAccount } from "wagmi";

export default function StakingPanel({ stakeInfo, earned, onStake, onUnstake, onClaim, canUnstake }) {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");

  if (!isConnected) {
    return (
      <div className="card text-center py-12">
        <p className="text-mecca-muted">Connect your wallet to stake $MECCA</p>
      </div>
    );
  }

  const stakedAmt = stakeInfo ? Number(stakeInfo.amount) / 1e18 : 0;
  const earnedAmt = earned ? Number(earned) / 1e18 : 0;

  return (
    <div className="card space-y-6">
      <h2 className="text-xl font-display text-mecca-gold">Your Staking Position</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="stat-label">Staked</p>
          <p className="stat-value">{stakedAmt.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-mecca-muted">MECCA</p>
        </div>
        <div>
          <p className="stat-label">Earned</p>
          <p className="stat-value text-green-400">{earnedAmt.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
          <p className="text-xs text-mecca-muted">MECCA</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-mecca-muted mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full bg-mecca-dark border border-mecca-border rounded-lg px-4 py-3 text-mecca-text focus:outline-none focus:border-mecca-gold transition-colors"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onStake(amount)}
          disabled={!amount || Number(amount) <= 0}
          className="btn-gold flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Stake
        </button>
        <button
          onClick={() => onUnstake(amount)}
          disabled={!canUnstake || !amount || Number(amount) <= 0}
          className="btn-outline flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Unstake
        </button>
      </div>

      {earnedAmt > 0 && (
        <button onClick={onClaim} className="w-full btn-gold">
          Claim {earnedAmt.toFixed(4)} MECCA Rewards
        </button>
      )}

      {!canUnstake && stakedAmt > 0 && (
        <p className="text-xs text-yellow-400 text-center">
          7-day lock period active — unstaking available after lock expires
        </p>
      )}
    </div>
  );
}
