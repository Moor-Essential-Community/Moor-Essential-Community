export default function Treasury() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display text-mecca-gold">Treasury</h1>
        <p className="text-mecca-muted mt-1">
          The community treasury holds all DAO assets. All withdrawals require a governance vote.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <p className="stat-label">ETH Balance</p>
          <p className="stat-value">—</p>
          <p className="text-xs text-mecca-muted">ETH</p>
        </div>
        <div className="card">
          <p className="stat-label">MECCA Balance</p>
          <p className="stat-value">—</p>
          <p className="text-xs text-mecca-muted">MECCA</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-display text-mecca-text mb-4">How the Treasury Works</h2>
        <div className="space-y-3 text-sm text-mecca-muted">
          <p>
            The MECCA.DAO Treasury is governed entirely on-chain. No single party — including the
            founding team — can move funds without a successful governance vote that passes quorum
            and survives the 2-day timelock.
          </p>
          <p>
            To request funds, submit a governance proposal with the recipient address and amount.
            The community votes, and if it passes, the timelock executes the transfer.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-display text-mecca-text mb-4">Recent Transactions</h2>
        <div className="text-center py-8 text-mecca-muted text-sm">
          No transactions yet — the treasury awaits its first governance action.
        </div>
      </div>
    </div>
  );
}
