"use client";

import SectionImage from "@/components/SectionImage";

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
  officeImageSrc: string | null;
  libraryImageSrc: string | null;
}

/**
 * Panel 3 — Ashcroft & Gray, London solicitors. Deep navy, parchment, and
 * old gold; Playfair Display. Expanded to 4 rich sections: Hero, Practice,
 * History, and Consultation.
 */
export default function AshcroftGray({
  active,
  imageSrc,
  officeImageSrc,
  libraryImageSrc,
}: PanelProps) {
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

        {/* 1. HERO SECTION */}
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
                Our practice areas
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
          </div>
        </div>

        {/* 2. PRACTICE AREAS SECTION */}
        <div className="brand-section rv" data-d="4">
          <div className="grid-2col">
            <div>
              <SectionImage
                src={officeImageSrc}
                alt="Ashcroft & Gray boardroom in Mayfair, London"
                className="aspect-[4/3] w-full shadow-[0_24px_70px_rgba(14,27,48,0.35)]"
              />
            </div>
            <div>
              <h2 className="section-title">
                Bespoke <em>expertise.</em>
              </h2>
              <p className="section-desc">
                Our practitioners specialize in advising private clients, trusts, family estates, and growing corporate structures. We provide clear, objective expertise tailored to the unique financial and legal circumstances of each instruction.
              </p>
              <div className="practice" style={{ width: '100%' }}>
                {PRACTICE_AREAS.map(([idx, name, tag]) => (
                  <div className="pa" key={idx}>
                    <span className="nm">{name}</span>
                    <span className="meta-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. HISTORY & HERITAGE SECTION */}
        <div className="brand-section rv" data-d="5">
          <div className="grid-2col reverse">
            <div>
              <h2 className="section-title">
                Advising London <em>since 1964.</em>
              </h2>
              <p className="section-desc">
                For over six decades, we have partnered with individuals and commercial enterprises through milestones and transitions. We hold our client relationships as long-term trusts, preserving family capital and guiding corporate governance across generations.
              </p>
              <div className="cta-row" style={{ marginTop: 20 }}>
                <a className="btn ghost" href="#">
                  Our history &amp; partners
                </a>
              </div>
            </div>
            <div>
              <SectionImage
                src={libraryImageSrc}
                alt="Ashcroft & Gray private library with banker's lamp"
                className="aspect-[16/10] w-full shadow-[0_24px_70px_rgba(14,27,48,0.35)]"
              />
            </div>
          </div>
        </div>

        {/* 4. CONSULTATION SECTION */}
        <div className="brand-section rv" data-d="6" style={{ paddingBottom: 80 }}>
          <div className="grid-2col">
            <div>
              <h2 className="section-title">
                Request a <em>consultation.</em>
              </h2>
              <p className="section-desc">
                Speak with one of our specialized partners. Select your area of inquiry below, and a member of our Mayfair chamber will contact you within one business day.
              </p>
              <div className="meta-list" style={{ marginTop: 40, gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>Mayfair Chamber</div>
                  <div style={{ fontSize: 14, marginTop: 4, fontWeight: 500 }}>+44 (0) 20 7409 0199</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>Secure Fax</div>
                  <div style={{ fontSize: 14, marginTop: 4, fontWeight: 500 }}>+44 (0) 20 7409 0200</div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group">
                  <label htmlFor="law-name">Full Name</label>
                  <input type="text" id="law-name" placeholder="Lord Jonathan Sterling" required />
                </div>
                <div className="form-group">
                  <label htmlFor="law-email">Email Address</label>
                  <input type="email" id="law-email" placeholder="j.sterling@sterlingestates.co.uk" required />
                </div>
                <div className="form-group">
                  <label htmlFor="law-practice">Chamber of Inquiry</label>
                  <select id="law-practice" required>
                    <option value="">Select practice area...</option>
                    <option value="corporate">Corporate &amp; Commercial</option>
                    <option value="property">Property &amp; Conveyancing</option>
                    <option value="wills">Wills, Trusts &amp; Probate</option>
                    <option value="family">Family &amp; Matrimonial</option>
                    <option value="dispute">Dispute Resolution</option>
                  </select>
                </div>
                <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                  Request Callback
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="meta rv" data-d="6" style={{ marginTop: 'auto', paddingTop: 40, paddingBottom: 20, borderTop: '1px solid rgba(184, 153, 91, 0.15)' }}>
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
