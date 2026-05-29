import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import ProposalCard from "../components/ProposalCard";
import { CONTRACT_ADDRESSES, GOVERNOR_ABI } from "../utils/contracts";

// Mock data — replace with useContractRead calls post-deployment
const MOCK_PROPOSALS = [
  {
    id: "1",
    description: "Allocate 5 ETH from Treasury to fund Moor Essential Community scholarship program",
    proposer: "0xAbCd1234AbCd1234AbCd1234AbCd1234AbCd1234",
    state: 1, // Active
    forVotes: BigInt("75000000000000000000000"),
    againstVotes: BigInt("5000000000000000000000"),
    abstainVotes: BigInt("2000000000000000000000"),
  },
  {
    id: "2",
    description: "Set staking reward rate to 0.5 MECCA/sec to incentivize long-term holding",
    proposer: "0xDeAd5678DeAd5678DeAd5678DeAd5678DeAd5678",
    state: 7, // Executed
    forVotes: BigInt("120000000000000000000000"),
    againstVotes: BigInt("1000000000000000000000"),
    abstainVotes: BigInt("0"),
  },
  {
    id: "3",
    description: "Mint 777 Founding membership NFTs for genesis community members",
    proposer: "0x1234AbCd1234AbCd1234AbCd1234AbCd1234AbCd",
    state: 0, // Pending
    forVotes: BigInt("0"),
    againstVotes: BigInt("0"),
    abstainVotes: BigInt("0"),
  },
];

export default function Governance() {
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [filter, setFilter] = useState("all");

  const handleVote = (proposalId, support) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MECCAGovernor,
      abi: GOVERNOR_ABI,
      functionName: "castVote",
      args: [BigInt(proposalId), support],
    });
  };

  const filtered = filter === "all"
    ? MOCK_PROPOSALS
    : MOCK_PROPOSALS.filter(p => {
        if (filter === "active") return p.state === 1;
        if (filter === "executed") return p.state === 7;
        return true;
      });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display text-mecca-gold">Governance</h1>
          <p className="text-mecca-muted mt-1">Vote on proposals that shape the future of MECCA.DAO</p>
        </div>
        {isConnected && (
          <button className="btn-gold">+ New Proposal</button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "active", "executed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f
                ? "bg-mecca-gold text-mecca-black"
                : "text-mecca-muted border border-mecca-border hover:text-mecca-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Proposals */}
      <div className="space-y-4">
        {filtered.map(p => (
          <ProposalCard key={p.id} proposal={p} onVote={isConnected ? handleVote : null} />
        ))}
      </div>

      {!isConnected && (
        <div className="card text-center py-8 text-mecca-muted border-dashed">
          Connect your wallet to vote on proposals
        </div>
      )}
    </div>
  );
}
