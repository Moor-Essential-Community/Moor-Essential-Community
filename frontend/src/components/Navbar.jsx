import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/governance", label: "Governance" },
  { to: "/staking", label: "Staking" },
  { to: "/treasury", label: "Treasury" },
  { to: "/membership", label: "Membership" },
  { to: "/philanthropy", label: "Philanthropy" },
  { to: "/services", label: "Services" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="border-b border-mecca-border bg-mecca-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold bg-gold-gradient bg-clip-text text-transparent">
              MECCA.DAO
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? "text-mecca-gold bg-mecca-card"
                    : "text-mecca-muted hover:text-mecca-text hover:bg-mecca-card"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Wallet */}
          <ConnectButton accountStatus="avatar" chainStatus="icon" />
        </div>
      </div>
    </nav>
  );
}
