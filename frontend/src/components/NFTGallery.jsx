const TIER_LABELS = ["Ally", "Community", "Founding"];
const TIER_COLORS = [
  "border-mecca-border text-mecca-muted",
  "border-blue-500/50 text-blue-400",
  "border-mecca-gold/70 text-mecca-gold",
];
const TIER_BG = ["bg-mecca-card", "bg-blue-950/30", "bg-yellow-950/20"];

export default function NFTGallery({ nfts, tierCounts }) {
  return (
    <div className="space-y-6">
      {/* Tier stats */}
      <div className="grid grid-cols-3 gap-4">
        {TIER_LABELS.map((label, i) => (
          <div key={label} className={`card border ${TIER_COLORS[i]} ${TIER_BG[i]}`}>
            <p className="stat-label">{label}</p>
            <p className={`stat-value ${i === 2 ? "text-mecca-gold" : i === 1 ? "text-blue-400" : "text-mecca-text"}`}>
              {tierCounts?.[i]?.toLocaleString() ?? "0"}
            </p>
            <p className="text-xs text-mecca-muted mt-1">
              {i === 0 ? "Unlimited" : i === 1 ? "/ 7,777" : "/ 777"}
            </p>
          </div>
        ))}
      </div>

      {/* NFT grid */}
      {nfts && nfts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className={`card border ${TIER_COLORS[nft.tier]} ${TIER_BG[nft.tier]} text-center hover:scale-105 transition-transform`}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold-gradient flex items-center justify-center text-2xl font-display text-mecca-black font-bold">
                M
              </div>
              <p className="text-xs text-mecca-muted">Token #{nft.tokenId}</p>
              <p className={`font-semibold ${TIER_COLORS[nft.tier].split(" ")[1]}`}>
                {TIER_LABELS[nft.tier]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12 text-mecca-muted">
          No membership NFTs found for this wallet
        </div>
      )}
    </div>
  );
}
