"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import MaisonVera from "@/components/panels/MaisonVera";
import PennineRoofing from "@/components/panels/PennineRoofing";
import AshcroftGray from "@/components/panels/AshcroftGray";
import { loadAllAssets, EMPTY_ASSETS, type AssetMap } from "@/lib/imageService";

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

  const startedRef = useRef(false);
  const indexRef = useRef(0);

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

  /* ----- reel navigation ----- */
  const go = useCallback(
    (n: number) => {
      const next = ((n % PANELS.length) + PANELS.length) % PANELS.length;
      indexRef.current = next;
      setIndex(next);

      // Smooth scroll to the corresponding panel
      const panels = document.querySelectorAll(".panel");
      const targetPanel = panels[next];
      if (targetPanel) {
        targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  /* tone of the fixed chrome follows the active panel */
  useEffect(() => {
    document.body.classList.toggle("tone-light", PANELS[index].tone === "light");
    document.body.classList.toggle("tone-dark", PANELS[index].tone !== "light");
  }, [index]);

  /* track active panel index on scroll */
  useEffect(() => {
    if (phase !== "live") return;

    const handleScroll = () => {
      const panels = document.querySelectorAll(".panel");
      let activeIndex = indexRef.current;
      const viewportCenter = window.innerHeight / 2;

      panels.forEach((panel, idx) => {
        const rect = panel.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          activeIndex = idx;
        }
      });

      if (activeIndex !== indexRef.current) {
        indexRef.current = activeIndex;
        setIndex(activeIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phase]);

  /* intersection observer for scrolling reveal animations */
  useEffect(() => {
    if (phase !== "live") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".rv, .line");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [phase]);

  /* keyboard panel shortcuts & spacebar toggle */
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

  /* panels arm beneath the curtain so page 1 is mid-reveal as it lifts */
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

      <div className="reel">
        <div className="track">
          <MaisonVera
            active={armed && index === 0}
            imageSrc={assets.auraSpatial}
            studioImageSrc={assets.maisonStudio}
            portfolioImageSrc={assets.maisonPortfolio}
          />
          <PennineRoofing
            active={armed && index === 1}
            imageSrc={assets.apexHeritage}
            servicesImageSrc={assets.roofingServices}
            projectsImageSrc={assets.roofingProjects}
          />
          <AshcroftGray
            active={armed && index === 2}
            imageSrc={assets.vanguardLegal}
            officeImageSrc={assets.lawOffice}
            libraryImageSrc={assets.lawLibrary}
          />
        </div>
      </div>

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

