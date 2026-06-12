"use client";

interface PanelProps {
  active: boolean;
  imageSrc: string | null;
}

/**
 * Panel 2 — Pennine Roofing Co., Greater Manchester roofers. Light stone
 * ground, industrial Anton headline, signal-orange accents, and the amber
 * roofline that draws itself across the foot of the page. The generated
 * slate photograph sits in the right column when it resolves; otherwise
 * the layout falls back to the original full-width composition.
 */
export default function PennineRoofing({ active, imageSrc }: PanelProps) {
  return (
    <section className={`panel p-roof ${active ? "is-active" : ""}`}>
      <div className="panel__inner">
        <header className="top">
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="wordmark rv" data-d="1" style={{ fontWeight: 700 }}>
              PENNINE ROOFING CO.
            </div>
            <span className="est rv" data-d="2">
              Est. 1987
            </span>
          </div>
          <a className="top-cta rv" data-d="3" href="tel:01615550192">
            0161 555 0192 · Call now
          </a>
        </header>

        <div className={`hero ${imageSrc ? "has-img" : ""}`}>
          <div>
            <div className="eyebrow rv" data-d="1">
              Pitched · Flat · Heritage Slate — Greater Manchester
            </div>
            <h1 style={{ margin: "18px 0 26px" }}>
              <span className="line">
                <span data-d="2">Roofs built to</span>
              </span>
              <span className="line">
                <span data-d="3">
                  <span className="hl">outlast</span> the
                </span>
              </span>
              <span className="line">
                <span data-d="4">weather.</span>
              </span>
            </h1>
            <p className="sub rv" data-d="4">
              Reroofs, repairs and heritage slate across Manchester, Stockport
              and the Pennine foothills. Fully insured, fixed written quotes,
              and a 25-year workmanship guarantee on every job.
            </p>
            <div className="cta-row rv" data-d="5" style={{ margin: "30px 0 38px" }}>
              <a className="btn primary" href="#">
                Get a free quote
              </a>
              <a className="btn ghost" href="#">
                See recent work <span className="arr">→</span>
              </a>
            </div>
            <div className="stats rv" data-d="6">
              <div className="stat">
                <div className="n">4,200+</div>
                <div className="l">Roofs completed</div>
              </div>
              <div className="stat">
                <div className="n">38 yrs</div>
                <div className="l">On the tools</div>
              </div>
              <div className="stat">
                <div className="n">4.9★</div>
                <div className="l">Checkatrade rated</div>
              </div>
            </div>
          </div>

          {imageSrc && (
            <div className="roofimg rv" data-d="3">
              <img
                src={imageSrc}
                alt="Slate roofline meeting brushed aluminium against an overcast sky"
              />
              <div className="cap">Heritage slate — Saddleworth</div>
            </div>
          )}
        </div>

        <footer className="meta rv" data-d="6">
          <div className="meta-list">
            <span>Fully insured</span>
            <span>25-year guarantee</span>
            <span>NFRC member</span>
          </div>
          <div className="meta-list">
            <span>Free roof survey</span>
          </div>
        </footer>
      </div>

      {/* signature roofline */}
      <div className="roofline" aria-hidden="true">
        <svg viewBox="0 0 1440 84" preserveAspectRatio="none">
          <path d="M0,72 L160,30 L320,72 L480,22 L640,72 L800,30 L960,72 L1120,22 L1280,72 L1440,34" />
        </svg>
      </div>
    </section>
  );
}
