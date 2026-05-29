import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Governance from "./pages/Governance";
import Staking from "./pages/Staking";
import Treasury from "./pages/Treasury";
import Membership from "./pages/Membership";
import Philanthropy from "./pages/Philanthropy";

export default function App() {
  return (
    <div className="min-h-screen bg-mecca-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/philanthropy" element={<Philanthropy />} />
        </Routes>
      </main>
      <footer className="border-t border-mecca-border mt-16 py-8 text-center text-mecca-muted text-sm">
        <p>MECCA.DAO — Built for the people. Governed by the people. Preserved for generations.</p>
        <p className="mt-1">© {new Date().getFullYear()} Moor Essential Community</p>
      </footer>
    </div>
  );
}
