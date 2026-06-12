"use client";

import SectionImage from "@/components/SectionImage";

interface PanelProps {
  active: boolean;
  imageSrc: string | null;
  studioImageSrc: string | null;
  portfolioImageSrc: string | null;
}

/**
 * Panel 1 — Maison Véra, interior architecture. Deep forest green, cream,
 * and brass; Fraunces editorial serif. Expanded to 4 rich sections:
 * Hero, Philosophy, Selected Work, and Enquiry.
 */
export default function MaisonVera({
  active,
  imageSrc,
  studioImageSrc,
  portfolioImageSrc,
}: PanelProps) {
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

        {/* 1. HERO SECTION */}
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

        {/* 2. PHILOSOPHY SECTION */}
        <div className="brand-section rv" data-d="4">
          <div className="grid-2col">
            <div>
              <SectionImage
                src={studioImageSrc}
                alt="Maison Véra studio materials detail"
                className="aspect-[4/3] w-full shadow-[0_24px_80px_rgba(20,32,27,0.15)]"
              />
            </div>
            <div>
              <h2 className="section-title">
                Sensory <em>restraint.</em>
              </h2>
              <p className="section-desc">
                We believe a home should be a sanctuary from the digital world. Our work is defined by the absence of noise, the presence of light, and the honest expression of raw, tactile materials. We detail every element ourselves, working with master stone-masons, carpenters, and weavers.
              </p>
              <div className="meta-list" style={{ marginTop: 24 }}>
                <span>Raw Oak</span>
                <span>Clay Plaster</span>
                <span>Honed Travertine</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SELECTED WORK SECTION */}
        <div className="brand-section rv" data-d="5">
          <div className="grid-2col reverse">
            <div>
              <h2 className="section-title">
                Belgravia <em>Residence.</em>
              </h2>
              <p className="section-desc">
                A complete restructuring of a Grade II listed Georgian townhouse. The design balances heritage conservation with contemporary minimalist living, revolving around a solid-stone kitchen hearth and custom oak joinery that filters light throughout the ground floor.
              </p>
              <div className="cta-row" style={{ marginTop: 20 }}>
                <a className="btn ghost" href="#">
                  View project case study <span className="arr">→</span>
                </a>
              </div>
            </div>
            <div>
              <SectionImage
                src={portfolioImageSrc}
                alt="Belgravia kitchen interior - travertine and dark walnut"
                className="aspect-[16/10] w-full shadow-[0_24px_80px_rgba(20,32,27,0.15)]"
              />
            </div>
          </div>
        </div>

        {/* 4. ENQUIRE SECTION */}
        <div className="brand-section rv" data-d="6" style={{ paddingBottom: 80 }}>
          <div className="grid-2col">
            <div>
              <h2 className="section-title">
                Begin a <em>conversation.</em>
              </h2>
              <p className="section-desc">
                We accept a limited number of commissions each year to ensure every home receives our absolute attention. Contact our studio to arrange an initial consultation at our London office or on-site.
              </p>
              <div className="meta-list" style={{ marginTop: 40, gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>Studio Line</div>
                  <div style={{ fontSize: 14, marginTop: 4, fontWeight: 500 }}>+44 (0) 20 7555 0143</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>General Inquiries</div>
                  <div style={{ fontSize: 14, marginTop: 4, fontWeight: 500 }}>studio@maisonvera.com</div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group">
                  <label htmlFor="maison-name">Name</label>
                  <input type="text" id="maison-name" placeholder="E.g., Charlotte Miller" required />
                </div>
                <div className="form-group">
                  <label htmlFor="maison-email">Email Address</label>
                  <input type="email" id="maison-email" placeholder="c.miller@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="maison-message">Project Brief</label>
                  <textarea id="maison-message" rows={4} placeholder="Describe the scope, location, and timeline of your project..." required />
                </div>
                <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                  Send enquiry
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="meta rv" data-d="6" style={{ marginTop: 'auto', paddingTop: 40, paddingBottom: 20, borderTop: '1px solid rgba(233, 226, 211, 0.12)' }}>
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
