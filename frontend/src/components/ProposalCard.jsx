import { PROPOSAL_STATES } from "../utils/contracts";

const STATE_COLORS = {
  Active: "text-green-400 bg-green-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10",
  Succeeded: "text-blue-400 bg-blue-400/10",
  Executed: "text-mecca-gold bg-mecca-gold/10",
  Defeated: "text-red-400 bg-red-400/10",
  Queued: "text-purple-400 bg-purple-400/10",
  Canceled: "text-mecca-muted bg-mecca-muted/10",
  Expired: "text-mecca-muted bg-mecca-muted/10",
};

export default function ProposalCard({ proposal, onVote }) {
  const stateName = PROPOSAL_STATES[proposal.state] ?? "Unknown";
  const colorClass = STATE_COLORS[stateName] ?? "text-mecca-muted bg-mecca-muted/10";

  const totalVotes = Number(proposal.forVotes + proposal.againstVotes + proposal.abstainVotes);
  const forPct = totalVotes > 0 ? (Number(proposal.forVotes) / totalVotes) * 100 : 0;
  const againstPct = totalVotes > 0 ? (Number(proposal.againstVotes) / totalVotes) * 100 : 0;

  return (
    <div className="card hover:border-mecca-gold/40 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display text-lg text-mecca-text line-clamp-2">{proposal.description}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${colorClass}`}>
          {stateName}
        </span>
      </div>

      <p className="text-xs text-mecca-muted mb-4">
        Proposer: {proposal.proposer?.slice(0, 6)}...{proposal.proposer?.slice(-4)}
      </p>

      {totalVotes > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-mecca-muted mb-1">
            <span>For {forPct.toFixed(1)}%</span>
            <span>Against {againstPct.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-mecca-border rounded-full overflow-hidden flex">
            <div className="h-full bg-green-500 transition-all" style={{ width: `${forPct}%` }} />
            <div className="h-full bg-red-500 transition-all" style={{ width: `${againstPct}%` }} />
          </div>
        </div>
      )}

      {stateName === "Active" && onVote && (
        <div className="flex gap-2 mt-4">
          <button onClick={() => onVote(proposal.id, 1)} className="btn-gold text-sm py-1.5 px-4">
            Vote For
          </button>
          <button onClick={() => onVote(proposal.id, 0)} className="btn-outline text-sm py-1.5 px-4">
            Vote Against
          </button>
          <button onClick={() => onVote(proposal.id, 2)} className="text-sm py-1.5 px-4 text-mecca-muted hover:text-mecca-text border border-mecca-border rounded-lg transition-colors">
            Abstain
          </button>
        </div>
      )}
    </div>
  );
}
