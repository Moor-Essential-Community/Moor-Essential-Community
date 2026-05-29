import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const FEATURES = [
  {
    icon: "⚖️",
    title: "On-Chain Governance",
    description: "Propose and vote on treasury actions, protocol upgrades, and community initiatives.",
    to: "/governance",
  },
  {
    icon: "🏦",
    title: "Community Treasury",
    description: "A multi-sig compatible treasury holding ETH and ERC-20 assets governed collectively.",
    to: "/treasury",
  },
  {
    icon: "🌱",
    title: "Staking & Rewards",
    description: "Stake $MECCA to earn yield and amplify your governance voting power.",
    to: "/staking",
  },
  {
    icon: "🎖️",
    title: "Membership NFTs",
    description: "Soulbound identity NFTs in three tiers: Ally, Community, and Founding.",
    to: "/membership",
  },
  {
    icon: "❤️",
    title: "Philanthropy Vault",
    description: "A dedicated vault where the DAO votes to fund charitable causes and community projects.",
    to: "/philanthropy",
  },
  {
    icon: "🎮",
    title: "GameFi (Coming Soon)",
    description: "Play-to-earn mechanisms that reward community participation and engagement.",
    to: "/",
  },
];

const STATS = [
  { label: "Max Supply", value: "777,777,777", unit: "MECCA" },
  { label: "Founding Members", value: "777", unit: "Slots" },
  { label: "Community Members", value: "7,777", unit: "Slots" },
  { label: "Voting Quorum", value: "4%", unit: "of Supply" },
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-16 space-y-6">
        <div className="inline-block text-xs font-semibold tracking-widest text-mecca-gold uppercase bg-mecca-gold/10 px-4 py-2 rounded-full border border-mecca-gold/20">
          Moor Essential Community Collective Advancement
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold">
          <span className="bg-gold-gradient bg-clip-text text-transparent">MECCA.DAO</span>
        </h1>
        <p className="text-xl text-mecca-muted max-w-2xl mx-auto">
          A sovereign on-chain institution built to produce, promote, and protect
          generational wealth for humanity — governed by its members, forever.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/governance" className="btn-gold text-base px-8 py-3">
            Enter the DAO
          </Link>
          <a
            href="https://linktr.ee/moor_essential_community"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base px-8 py-3"
          >
            Connect
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ label, value, unit }) => (
          <div key={label} className="card text-center">
            <p className="stat-value">{value}</p>
            <p className="text-xs text-mecca-muted mt-1">{unit}</p>
            <p className="text-xs text-mecca-muted uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-display text-center text-mecca-text mb-8">
          The Infrastructure of Sovereignty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, description, to }) => (
            <Link
              key={title}
              to={to}
              className="card hover:border-mecca-gold/40 hover:bg-mecca-card/80 transition-all group"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="text-lg font-display text-mecca-text group-hover:text-mecca-gold transition-colors mb-2">
                {title}
              </h3>
              <p className="text-sm text-mecca-muted">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="card border-mecca-gold/30 bg-mecca-gold/5 text-center py-12">
        <blockquote className="text-2xl font-display text-mecca-gold italic max-w-3xl mx-auto">
          "Building generational wealth and sovereign prosperity for humanity — on-chain, forever."
        </blockquote>
        <p className="mt-4 text-mecca-muted">— Moor Essential Community</p>
      </section>
    </div>
  );
}
