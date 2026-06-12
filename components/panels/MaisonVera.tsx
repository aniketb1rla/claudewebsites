"use client";

interface PanelProps {
  active: boolean;
  imageSrc: string | null;
}

/**
 * Panel 1 — Maison Véra, interior architecture. Deep forest green, cream,
 * and brass; Fraunces editorial serif. The generated interior photograph
 * fills the plaster frame; without it, the arched cast-of-light fallback
 * keeps the composition intact.
 */
export default function MaisonVera({ active, imageSrc }: PanelProps) {
  return (
    <section className={`panel p-decor ${active ? "is-active" : ""}`}>
      <div className="panel__inner">
        <header className="top">
          <div className="wordmark rv" data-d="1">
            MAISON&nbsp;VÉRA
          </div>
          <nav className="nav">
            <a className="rv" data-d="1" href="#">
              Work
            </a>
            <a className="rv" data-d="2" href="#">
              Studio
            </a>
            <a className="rv" data-d="3" href="#">
              Journal
            </a>
            <a className="rv" data-d="4" href="#">
              Contact
            </a>
          </nav>
          <a className="top-cta rv" data-d="4" href="#">
            Enquire
          </a>
        </header>

        <div className="hero">
          <div>
            <div className="eyebrow rv" data-d="1">
              Interior Architecture — London &amp; Surrey
            </div>
            <h1 style={{ margin: "22px 0 28px" }}>
              <span className="line">
                <span data-d="2">Rooms that hold</span>
              </span>
              <span className="line">
                <span data-d="3">
                  their <em>quiet.</em>
                </span>
              </span>
            </h1>
            <p className="sub rv" data-d="4">
              We design considered residential interiors — slow, tactile, and
              built to be lived in for decades, not seasons. Every commission
              begins with how a space should feel before how it should look.
            </p>
            <div className="cta-row rv" data-d="5" style={{ marginTop: 34 }}>
              <a className="btn primary" href="#">
                Book a consultation
              </a>
              <a className="btn ghost" href="#">
                Selected work <span className="arr">→</span>
              </a>
            </div>
          </div>

          <div className="plaster rv" data-d="3">
            {imageSrc ? (
              <img
                className="pimg"
                src={imageSrc}
                alt="Minimalist living space — polished concrete meeting raw linen"
              />
            ) : (
              <>
                <div className="arch" />
                <div className="floorline" />
              </>
            )}
            <div className={`cap ${imageSrc ? "" : "flat"}`}>
              Project N°.014 — Belgravia residence
            </div>
          </div>
        </div>

        <footer className="meta rv" data-d="6">
          <div className="meta-list">
            <span>Residential</span>
            <span>Heritage</span>
            <span>Hospitality</span>
          </div>
          <div className="meta-list">
            <span>Est. 2009</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
