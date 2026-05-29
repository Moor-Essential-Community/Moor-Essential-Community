import NFTGallery from "../components/NFTGallery";
import { useAccount } from "wagmi";

const TIER_INFO = [
  {
    tier: 2,
    name: "Founding Member",
    supply: "777",
    color: "border-mecca-gold text-mecca-gold",
    bg: "bg-yellow-950/20",
    perks: [
      "Lifetime DAO voting membership",
      "Founding tier governance multiplier",
      "Access to genesis treasury allocation votes",
      "Permanent on-chain identity record",
      "Priority access to future GameFi features",
    ],
  },
  {
    tier: 1,
    name: "Community Member",
    supply: "7,777",
    color: "border-blue-500 text-blue-400",
    bg: "bg-blue-950/20",
    perks: [
      "Full DAO voting rights",
      "Access to community governance proposals",
      "Staking rewards eligibility",
      "Philanthropy vault voting",
    ],
  },
  {
    tier: 0,
    name: "Ally",
    supply: "Unlimited",
    color: "border-mecca-border text-mecca-muted",
    bg: "bg-mecca-card",
    perks: [
      "Observer status in DAO discussions",
      "Access to public governance information",
      "Path to Community membership",
    ],
  },
];

export default function Membership() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display text-mecca-gold">Membership</h1>
        <p className="text-mecca-muted mt-1">
          Soulbound NFTs that bind your identity and status to the MECCA.DAO forever.
        </p>
      </div>

      {/* Tier breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIER_INFO.map(({ name, supply, color, bg, perks }) => (
          <div key={name} className={`card border ${color} ${bg}`}>
            <h3 className={`font-display text-xl mb-1 ${color.split(" ")[1]}`}>{name}</h3>
            <p className="text-xs text-mecca-muted mb-4">Supply: {supply}</p>
            <ul className="space-y-1.5">
              {perks.map(p => (
                <li key={p} className="text-sm text-mecca-muted flex gap-2">
                  <span className="text-mecca-gold">✦</span> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* My NFTs */}
      <div>
        <h2 className="text-xl font-display text-mecca-text mb-4">
          {isConnected ? "My Memberships" : "Membership Gallery"}
        </h2>
        <NFTGallery nfts={[]} tierCounts={[0, 0, 0]} />
      </div>

      <div className="card bg-mecca-gold/5 border-mecca-gold/20 text-center py-8">
        <h3 className="font-display text-mecca-gold text-xl mb-2">Soulbound Forever</h3>
        <p className="text-mecca-muted text-sm max-w-lg mx-auto">
          MECCA membership NFTs cannot be sold, transferred, or taken away. Your membership
          is yours for life — a permanent record of your covenant with this community.
        </p>
      </div>
    </div>
  );
}
