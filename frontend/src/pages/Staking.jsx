import { useAccount, useWriteContract } from "wagmi";
import StakingPanel from "../components/StakingPanel";
import { CONTRACT_ADDRESSES, STAKING_ABI, TOKEN_ABI } from "../utils/contracts";
import { parseEther } from "viem";

export default function Staking() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const handleStake = (amount) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MECCAToken,
      abi: TOKEN_ABI,
      functionName: "approve",
      args: [CONTRACT_ADDRESSES.MECCAStaking, parseEther(amount)],
    });
  };

  const handleUnstake = (amount) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MECCAStaking,
      abi: STAKING_ABI,
      functionName: "unstake",
      args: [parseEther(amount)],
    });
  };

  const handleClaim = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.MECCAStaking,
      abi: STAKING_ABI,
      functionName: "claimReward",
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-display text-mecca-gold">Staking</h1>
        <p className="text-mecca-muted mt-1">
          Stake $MECCA to earn rewards and amplify your governance voting power.
          Minimum stake: 100 MECCA. Lock period: 7 days.
        </p>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="stat-label">Total Staked</p>
          <p className="stat-value">—</p>
          <p className="text-xs text-mecca-muted">MECCA</p>
        </div>
        <div className="card text-center">
          <p className="stat-label">Reward Rate</p>
          <p className="stat-value">—</p>
          <p className="text-xs text-mecca-muted">MECCA/sec</p>
        </div>
        <div className="card text-center">
          <p className="stat-label">Lock Period</p>
          <p className="stat-value">7</p>
          <p className="text-xs text-mecca-muted">Days</p>
        </div>
      </div>

      <StakingPanel
        stakeInfo={null}
        earned={null}
        onStake={handleStake}
        onUnstake={handleUnstake}
        onClaim={handleClaim}
        canUnstake={false}
      />

      <div className="card bg-mecca-gold/5 border-mecca-gold/20">
        <h3 className="font-display text-mecca-gold mb-2">Staking Benefits</h3>
        <ul className="space-y-1 text-sm text-mecca-muted">
          <li>✦ Earn $MECCA rewards proportional to your stake</li>
          <li>✦ Staked balance counts toward governance voting power</li>
          <li>✦ Higher tiers unlock future GameFi multipliers</li>
          <li>✦ Compound rewards by re-staking claims</li>
        </ul>
      </div>
    </div>
  );
}
