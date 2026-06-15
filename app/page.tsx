"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import MaisonVera from "@/components/panels/MaisonVera";
import PennineRoofing from "@/components/panels/PennineRoofing";
import AshcroftGray from "@/components/panels/AshcroftGray";
import { loadAllAssets, EMPTY_ASSETS, type AssetMap } from "@/lib/imageService";
import Lenis from "lenis";

/** Loader stays up at least this long so the counter reads as deliberate. */
const MIN_PRELOAD_MS = 2200;
/** Buffer after load completes for the counter to glide to 100. */
const COUNTER_SETTLE_MS = 1200;

interface PanelMeta {
  key: string;
  name: string;
  tone: "dark" | "light";
}

const PANELS: PanelMeta[] = [
  { key: "decor", name: "Maison Véra", tone: "dark" },
  { key: "roof", name: "Pennine Roofing Co.", tone: "light" },
  { key: "law", name: "Ashcroft & Gray", tone: "dark" },
];

type Phase = "loading" | "reveal" | "live";

export default function Home() {
  const [assets, setAssets] = useState<AssetMap>(EMPTY_ASSETS);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [curtainUp, setCurtainUp] = useState(false);
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Dynamic layout measurements
  const [panelHeights, setPanelHeights] = useState<number[]>([1000, 1000, 1000]);
  const [viewportHeight, setViewportHeight] = useState(1000);

  const startedRef = useRef(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  /* ----- phase 1: generate all imagery, gate the loader on it ----- */
  useEffect(() => {
    if (startedRef.current) return; // guard React StrictMode double-mount
    startedRef.current = true;

    let cancelled = false;
    const minDelay = new Promise((r) => setTimeout(r, MIN_PRELOAD_MS));
    const load = loadAllAssets(
      (fraction) => {
        if (!cancelled) setProgress(fraction);
      },
      (key, src) => {
        if (!cancelled) setAssets((prev) => ({ ...prev, [key]: src }));
      }
    );

    Promise.all([load, minDelay]).then(([result]) => {
      if (cancelled) return;
      setAssets(result);
      setProgress(1);
      setTimeout(() => {
        if (!cancelled) setPhase("reveal");
      }, COUNTER_SETTLE_MS);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ----- phase 2: loader lifts, curtain rises, reel goes live ----- */
  useEffect(() => {
    if (phase !== "reveal") return;
    const liftCurtain = setTimeout(() => setCurtainUp(true), 260);
    const goLive = setTimeout(() => {
      setPhase("live");
    }, 260 + 1000);
    return () => {
      clearTimeout(liftCurtain);
      clearTimeout(goLive);
    };
  }, [phase]);

  /* ----- Lenis Smooth Scroll Initialization ----- */
  useEffect(() => {
    if (phase !== "live") return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    setLenis(lenisInstance);

    let rafId: number;
    const update = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phase]);

  /* ----- Measure panel inner heights dynamically ----- */
  useEffect(() => {
    if (phase !== "live") return;

    const measure = () => {
      const panels = document.querySelectorAll(".panel");
      const heights = Array.from(panels).map((panel) => {
        return panel ? panel.getBoundingClientRect().height : window.innerHeight;
      });
      setPanelHeights(heights);
      setViewportHeight(window.innerHeight);
    };

    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [phase, assets]);

  /* ----- Calculations for Scroll-Linked Dissolves & Content Translation ----- */
  const getPanelLayouts = useCallback((y: number) => {
    return panelHeights.map((H, i) => {
      const V = viewportHeight;
      const S = Math.max(0, H - V); // scrollable space inside this panel
      const T = V; // transition fade zone is 1 viewport height
      
      let start = 0;
      for (let prev = 0; prev < i; prev++) {
        const prevH = panelHeights[prev] || V;
        const prevS = Math.max(0, prevH - V);
        start += prevS + T;
      }
      
      const end = start + S;
      
      let opacity = 0;
      let translation = 0;
      
      // Calculate translation (panel slides up and off-screen during transition)
      if (y < start) {
        translation = 0;
      } else if (y <= end) {
        translation = -(y - start);
      } else {
        // Continue translating upwards past the end to slide off-screen
        translation = -S - (y - end);
      }

      // Calculate opacity (stays fully visible until completely off-screen)
      if (y < start - T) {
        opacity = 0;
      } else if (y <= end + T) {
        opacity = 1;
      } else {
        opacity = 0;
      }
      
      return {
        opacity,
        translation,
        start,
        end,
        scrollable: S,
      };
    });
  }, [panelHeights, viewportHeight]);

  const layouts = getPanelLayouts(scrollY);
  const lastLayout = layouts[layouts.length - 1];
  const totalScrollHeight = lastLayout ? lastLayout.end + viewportHeight : viewportHeight * 3;

  /* ----- Track active panel index based on dominant opacity ----- */
  useEffect(() => {
    if (phase !== "live") return;
    const activeIdx = layouts.findIndex((l) => l.opacity > 0.5);
    if (activeIdx !== -1 && activeIdx !== index) {
      setIndex(activeIdx);
    }
  }, [layouts, phase, index]);

  /* ----- Update body classes for tones and scrollbar styling ----- */
  useEffect(() => {
    const activeTone = PANELS[index].tone;
    document.body.classList.toggle("tone-light", activeTone === "light");
    document.body.classList.toggle("tone-dark", activeTone !== "light");

    // Dynamic scrollbar colors based on the active landing page
    document.documentElement.classList.toggle("active-decor", index === 0);
    document.documentElement.classList.toggle("active-roof", index === 1);
    document.documentElement.classList.toggle("active-law", index === 2);
    document.body.classList.toggle("active-decor", index === 0);
    document.body.classList.toggle("active-roof", index === 1);
    document.body.classList.toggle("active-law", index === 2);
  }, [index]);

  /* ----- Manual scroll-reveal handler for inner panel elements ----- */
  useEffect(() => {
    if (phase !== "live") return;

    const handleReveal = () => {
      const elements = document.querySelectorAll(".rv, .line");
      elements.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
          el.classList.add("is-visible");
        }
      });
    };

    handleReveal();
    window.addEventListener("scroll", handleReveal, { passive: true });
    return () => window.removeEventListener("scroll", handleReveal);
  }, [phase, scrollY]);

  /* ----- Autoplay / Slide Show Logic ----- */
  const getSectionScrollPositions = useCallback(() => {
    const positions: number[] = [];
    const panels = document.querySelectorAll(".panel");
    
    layouts.forEach((layout, i) => {
      const panel = panels[i];
      if (!panel) return;
      
      const sections = panel.querySelectorAll(".hero, .brand-section");
      sections.forEach((sec) => {
        const offsetTop = (sec as HTMLElement).offsetTop;
        positions.push(layout.start + offsetTop);
      });
    });
    
    return positions;
  }, [layouts]);

  useEffect(() => {
    if (!isPlaying || phase !== "live") return;

    const interval = setInterval(() => {
      const sectionPositions = getSectionScrollPositions();
      if (sectionPositions.length === 0) return;
      
      const currentY = window.scrollY;
      let nextIdx = 0;
      
      for (let i = 0; i < sectionPositions.length; i++) {
        if (currentY < sectionPositions[i] - 10) {
          nextIdx = i;
          break;
        }
      }
      
      const targetY = sectionPositions[nextIdx];
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.5 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }, 6800);

    return () => clearInterval(interval);
  }, [isPlaying, phase, lenis, getSectionScrollPositions]);

  /* ----- Navigation to specific brand panel ----- */
  const getPanelScrollStart = useCallback((i: number) => {
    let start = 0;
    const V = viewportHeight;
    const T = V;
    for (let prev = 0; prev < i; prev++) {
      const prevH = panelHeights[prev] || V;
      const prevS = Math.max(0, prevH - V);
      start += prevS + T;
    }
    return start;
  }, [panelHeights, viewportHeight]);

  const go = useCallback(
    (n: number) => {
      const next = ((n % PANELS.length) + PANELS.length) % PANELS.length;
      const targetY = getPanelScrollStart(next);
      
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.5 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [lenis, getPanelScrollStart]
  );

  /* ----- Keyboard shortcuts ----- */
  useEffect(() => {
    if (phase !== "live") return;

    const onKey = (e: KeyboardEvent) => {
      if (["1", "2", "3"].includes(e.key)) {
        e.preventDefault();
        go(Number(e.key) - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, go]);

  const armed = phase !== "loading";

  return (
    <main>
      {/* film grain */}
      <svg className="grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="n">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>

      {/* FIXED VIEWPORT REEL */}
      <div className="reel">
        <div className="track">
          {/* Maison Véra (Panel 0) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 12,
              opacity: layouts[0]?.opacity ?? 0,
              pointerEvents: (layouts[0]?.opacity ?? 0) > 0 ? "auto" : "none",
              visibility: (layouts[0]?.opacity ?? 0) > 0 ? "visible" : "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                transform: `translateY(${layouts[0]?.translation ?? 0}px)`,
              }}
            >
              <MaisonVera
                active={armed && index === 0}
                imageSrc={assets.auraSpatial}
                studioImageSrc={assets.maisonStudio}
                portfolioImageSrc={assets.maisonPortfolio}
              />
            </div>
          </div>

          {/* Pennine Roofing (Panel 1) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 11,
              opacity: layouts[1]?.opacity ?? 0,
              pointerEvents: (layouts[1]?.opacity ?? 0) > 0 ? "auto" : "none",
              visibility: (layouts[1]?.opacity ?? 0) > 0 ? "visible" : "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                transform: `translateY(${layouts[1]?.translation ?? 0}px)`,
              }}
            >
              <PennineRoofing
                active={armed && index === 1}
                imageSrc={assets.apexHeritage}
                servicesImageSrc={assets.roofingServices}
                projectsImageSrc={assets.roofingProjects}
              />
            </div>
          </div>

          {/* Ashcroft & Gray (Panel 2) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 10,
              opacity: layouts[2]?.opacity ?? 0,
              pointerEvents: (layouts[2]?.opacity ?? 0) > 0 ? "auto" : "none",
              visibility: (layouts[2]?.opacity ?? 0) > 0 ? "visible" : "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                transform: `translateY(${layouts[2]?.translation ?? 0}px)`,
              }}
            >
              <AshcroftGray
                active={armed && index === 2}
                imageSrc={assets.vanguardLegal}
                officeImageSrc={assets.lawOffice}
                libraryImageSrc={assets.lawLibrary}
              />
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC SCROLL SPACER */}
      {phase === "live" && (
        <div
          className="scroll-spacer"
          style={{
            height: `${totalScrollHeight}px`,
            width: "100%",
            pointerEvents: "none",
          }}
        />
      )}



      {phase !== "live" && (
        <>
          <div className={`curtain ${curtainUp ? "up" : ""}`} />
          <Loader
            progress={progress}
            backgroundSrc={assets.preloader}
            lifted={phase === "reveal"}
          />
        </>
      )}
    </main>
  );
}
