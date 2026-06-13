"use client";

import SectionImage from "@/components/SectionImage";

interface PanelProps {
  active: boolean;
  imageSrc: string | null;
  servicesImageSrc: string | null;
  projectsImageSrc: string | null;
}

/**
 * Panel 2 — Pennine Roofing Co., Greater Manchester roofers. Light stone
 * ground, industrial Anton headline, signal-orange accents, and the amber
 * roofline that draws itself across the foot of the page. Expanded to 4
 * rich scrollable sections: Hero, Services, Heritage, and Quote.
 */
export default function PennineRoofing({
  active,
  imageSrc,
  servicesImageSrc,
  projectsImageSrc,
}: PanelProps) {
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

        {/* 1. HERO SECTION */}
        <div className={`hero ${imageSrc ? "has-bg-img" : ""}`}>
          {imageSrc && (
            <div className="hero-bg-wrap rv" data-d="3">
              <img
                src={imageSrc}
                alt="Slate roofline meeting brushed aluminium against an overcast sky"
                className="hero-bg-img"
              />
              <div className="hero-bg-overlay" />
              <div className="cap">Heritage slate — Saddleworth</div>
            </div>
          )}

          <div className="hero-content-wrapper">
            <div className="hero-content">
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
          </div>
        </div>

        {/* 2. SERVICES SECTION */}
        <div className="brand-section rv" data-d="4">
          <div className="grid-2col">
            <div>
              <h2 className="section-title">
                Pitched, flat &amp; <span>heritage</span> slate.
              </h2>
              <p className="section-desc">
                We specialize in traditional slating, stone flagging, and high-performance flat roofing systems. Whether restoring a Victorian terrace or building a new commercial complex, our team delivers craftsmanship built to withstand the toughest Pennine winters.
              </p>
              <div className="services-grid">
                <div className="service-card">
                  <span className="icon">🏠</span>
                  <h3>Pitched Slate</h3>
                  <p>Traditional Welsh and stone slating, fully guaranteed for decades.</p>
                </div>
                <div className="service-card">
                  <span className="icon">🛡️</span>
                  <h3>Flat Roofs</h3>
                  <p>High-performance single-ply membranes and glass-fiber installs.</p>
                </div>
                <div className="service-card">
                  <span className="icon">⚙️</span>
                  <h3>Leadwork</h3>
                  <p>Precision lead flashing, valleys, and custom decorative details.</p>
                </div>
              </div>
            </div>
            <div>
              <SectionImage
                src={servicesImageSrc}
                alt="Roofing craftsmanship installing dark slate tiles"
                className="aspect-[4/3] w-full shadow-[0_20px_60px_rgba(22,24,26,0.12)]"
              />
            </div>
          </div>
        </div>

        {/* 3. HERITAGE PROJECTS SECTION */}
        <div className="brand-section rv" data-d="5">
          <div className="grid-2col reverse">
            <div>
              <SectionImage
                src={projectsImageSrc}
                alt="Restored cottage slate roof under dramatic skies"
                className="aspect-[16/10] w-full shadow-[0_20px_60px_rgba(22,24,26,0.12)]"
              />
            </div>
            <div>
              <h2 className="section-title">
                Heritage <span>restoration</span>.
              </h2>
              <p className="section-desc">
                We are approved contractors for listed buildings and heritage properties. Sourcing reclaimed local stone and matching original laying patterns, we preserve architectural history while integrating modern breathable membranes and insulation.
              </p>
              <div className="cta-row" style={{ marginTop: 20 }}>
                <a className="btn ghost" href="#">
                  Case studies <span className="arr">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. GET A QUOTE SECTION */}
        <div className="brand-section rv" data-d="6" style={{ paddingBottom: 100 }}>
          <div className="grid-2col">
            <div>
              <h2 className="section-title">
                Get a <span>free quote</span>.
              </h2>
              <p className="section-desc">
                Need a quick repair or a complete reroof survey? Speak directly to our estimators. We provide full written quotes with no obligation and fixed pricing.
              </p>
              <div className="stats" style={{ marginTop: 40 }}>
                <div className="stat">
                  <div className="n" style={{ color: '#e8541e' }}>24 hr</div>
                  <div className="l">Emergency callouts</div>
                </div>
                <div className="stat">
                  <div className="n" style={{ color: '#e8541e' }}>100%</div>
                  <div className="l">Fixed written quotes</div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="form-group">
                  <label htmlFor="roof-name" style={{ color: '#16181a' }}>Your Name</label>
                  <input type="text" id="roof-name" placeholder="Johnathan Clegg" required />
                </div>
                <div className="form-group">
                  <label htmlFor="roof-phone" style={{ color: '#16181a' }}>Phone Number</label>
                  <input type="tel" id="roof-phone" placeholder="07700 900077" required />
                </div>
                <div className="form-group">
                  <label htmlFor="roof-service" style={{ color: '#16181a' }}>Service Required</label>
                  <select id="roof-service" required>
                    <option value="">Select a service...</option>
                    <option value="repair">Roof Repair</option>
                    <option value="reroof">Complete Reroof</option>
                    <option value="flat">Flat Roof Installation</option>
                    <option value="heritage">Heritage Slate Work</option>
                    <option value="survey">Roof Survey / Inspection</option>
                  </select>
                </div>
                <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                  Request Callback
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="meta rv" data-d="6" style={{ marginTop: 'auto', paddingTop: 40, paddingBottom: 20, borderTop: '1px solid rgba(22, 24, 26, 0.1)' }}>
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
    </section>
  );
}
