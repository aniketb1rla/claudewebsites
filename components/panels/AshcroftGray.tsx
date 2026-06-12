"use client";

const PRACTICE_AREAS = [
  ["01", "Corporate & Commercial", "M&A"],
  ["02", "Property & Conveyancing", "Resi · Comm"],
  ["03", "Wills, Trusts & Probate", "Private"],
  ["04", "Family & Matrimonial", "Discreet"],
  ["05", "Dispute Resolution", "Litigation"],
] as const;

interface PanelProps {
  active: boolean;
  imageSrc: string | null;
}

/**
 * Panel 3 — Ashcroft & Gray, London solicitors. Deep navy, parchment, and
 * old gold; Playfair Display. The generated fountain-pen detail shot sits
 * above the gold-ruled practice-area index.
 */
export default function AshcroftGray({ active, imageSrc }: PanelProps) {
  return (
    <section className={`panel p-law ${active ? "is-active" : ""}`}>
      <div className="panel__inner">
        <header className="top">
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <div className="wordmark rv" data-d="1">
              Ashcroft &amp; Gray
            </div>
            <span
              className="rv"
              data-d="2"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.55,
                fontWeight: 500,
              }}
            >
              Solicitors · London
            </span>
          </div>
          <a className="top-cta rv" data-d="3" href="#">
            Request a callback
          </a>
        </header>

        <div className="hero">
          <div>
            <div className="eyebrow rv" data-d="1">
              Private Client · Corporate · Property · Disputes
            </div>
            <h1 style={{ margin: "24px 0 28px" }}>
              <span className="line">
                <span data-d="2">Considered counsel</span>
              </span>
              <span className="line">
                <span data-d="3">
                  for life&apos;s <em>defining</em>
                </span>
              </span>
              <span className="line">
                <span data-d="4">moments.</span>
              </span>
            </h1>
            <p className="sub rv" data-d="5">
              A London firm advising individuals and businesses since 1964.
              Clear advice, carefully given — and a partner on your matter from
              the first meeting to the last.
            </p>
            <div className="cta-row rv" data-d="5" style={{ marginTop: 34 }}>
              <a className="btn primary" href="#">
                Arrange a consultation
              </a>
              <a className="btn ghost" href="#">
                Our practice areas <span className="arr">→</span>
              </a>
            </div>
          </div>

          <div className="aside">
            {imageSrc && (
              <div className="lawimg rv" data-d="3">
                <img
                  src={imageSrc}
                  alt="Charcoal fountain pen resting on textured legal paper"
                />
              </div>
            )}
            <div className="practice rv" data-d="4">
              {PRACTICE_AREAS.map(([idx, name, tag]) => (
                <div className="pa" key={idx}>
                  <span className="idx">{idx}</span>
                  <span className="nm">{name}</span>
                  <span className="meta-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="meta rv" data-d="6">
          <div className="meta-list">
            <span>Established 1964</span>
            <span>The Legal 500</span>
            <span>Regulated by the SRA</span>
          </div>
          <div className="meta-list">
            <span>Mayfair, London W1</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
