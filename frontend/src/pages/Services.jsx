import { useState } from "react";
import TrustCover from "../components/TrustCover";
import NGOCover from "../components/NGOCover";

const DOCS = [
  {
    id: "trust",
    title: "MECCA Trust",
    subtitle: "Deed of Trust",
    description: "The foundational trust document establishing the legal and sovereign framework for the Moor Essential Community's wealth preservation and generational prosperity.",
    cover: <TrustCover />,
  },
  {
    id: "ngo",
    title: "Articles of Association",
    subtitle: "NGO Founding Document",
    description: "The governing articles of the Moor Essential Community as a Non-Governmental Organisation, establishing its philanthropic mandate and operational structure.",
    cover: <NGOCover />,
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display text-mecca-gold">Services &amp; Documents</h1>
        <p className="text-mecca-muted mt-1">
          Foundational documents governing the Moor Essential Community — sovereign, transparent, and permanent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOCS.map((doc) => (
          <div key={doc.id} className="card hover:border-mecca-gold/40 transition-all cursor-pointer"
            onClick={() => setActive(active === doc.id ? null : doc.id)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-display text-mecca-gold">{doc.title}</h2>
                <p className="text-xs text-mecca-muted uppercase tracking-widest mt-1">{doc.subtitle}</p>
              </div>
              <span className="text-mecca-gold text-2xl">{active === doc.id ? "↑" : "↓"}</span>
            </div>
            <p className="text-sm text-mecca-muted leading-relaxed">{doc.description}</p>
            <button className="btn-outline mt-4 text-sm py-1.5">
              {active === doc.id ? "Hide Document" : "View Document"}
            </button>
          </div>
        ))}
      </div>

      {DOCS.map((doc) => active === doc.id && (
        <div key={doc.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display text-mecca-text">{doc.title} — Cover</h2>
            <button
              onClick={() => window.print()}
              className="btn-gold text-sm py-1.5 px-4"
            >
              Print / Save as PDF
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-mecca-border">
            {doc.cover}
          </div>
        </div>
      ))}
    </div>
  );
}
