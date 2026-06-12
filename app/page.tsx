"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Loader from "@/components/Loader";
import Chrome, { type PanelMeta } from "@/components/Chrome";
import MaisonVera from "@/components/panels/MaisonVera";
import PennineRoofing from "@/components/panels/PennineRoofing";
import AshcroftGray from "@/components/panels/AshcroftGray";
import { loadAllAssets, EMPTY_ASSETS, type AssetMap } from "@/lib/imageService";

/** Loader stays up at least this long so the counter reads as deliberate. */
const MIN_PRELOAD_MS = 2200;
/** Buffer after load completes for the counter to glide to 100. */
const COUNTER_SETTLE_MS = 1200;
/** Dwell time on each page before autoplay advances. */
const DWELL_MS = 6800;
/** Page transition duration — must match the track animation below. */
const PAGE_EASE = [0.7, 0, 0.2, 1] as const;

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
  const [playing, setPlaying] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);

  const startedRef = useRef(false);
  const indexRef = useRef(0);
  const playingRef = useRef(false);
  const elapsedRef = useRef(0);
  const coolRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const fillProgress = useMotionValue(0);

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
      playingRef.current = true;
      setPlaying(true);
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
      elapsedRef.current = 0;
      fillProgress.set(0);
      setIndex(next);
    },
    [fillProgress]
  );

  const step = useCallback(
    (dir: number) => {
      setHintHidden(true);
      go(indexRef.current + dir);
    },
    [go]
  );

  /* tone of the fixed chrome follows the active panel */
  useEffect(() => {
    document.body.classList.toggle("tone-light", PANELS[index].tone === "light");
    document.body.classList.toggle("tone-dark", PANELS[index].tone !== "light");
  }, [index]);

  /* autoplay + progress fill, driven by rAF for exact pause/resume */
  useEffect(() => {
    if (phase !== "live") return;
    let raf: number;
    let last = performance.now();
    const tick = (ts: number) => {
      const dt = ts - last;
      last = ts;
      if (playingRef.current) {
        elapsedRef.current += dt;
        fillProgress.set(Math.min(elapsedRef.current / DWELL_MS, 1));
        if (elapsedRef.current >= DWELL_MS) go(indexRef.current + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, go, fillProgress]);

  /* wheel / keyboard / touch */
  useEffect(() => {
    if (phase !== "live") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now < coolRef.current) return;
      if (Math.abs(e.deltaY) < 14) return;
      coolRef.current = now + 850;
      step(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
        setHintHidden(true);
      } else if (["1", "2", "3"].includes(e.key)) {
        setHintHidden(true);
        go(Number(e.key) - 1);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchYRef.current === null) return;
      const dy = touchYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) step(dy > 0 ? 1 : -1);
      touchYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, step, go]);

  function togglePlay() {
    setPlaying((prev) => {
      playingRef.current = !prev;
      return !prev;
    });
  }

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
        <motion.div
          className="track"
          animate={{ y: `-${index * 100}vh` }}
          transition={{ duration: 1.15, ease: PAGE_EASE }}
        >
          <MaisonVera active={armed && index === 0} imageSrc={assets.auraSpatial} />
          <PennineRoofing
            active={armed && index === 1}
            imageSrc={assets.apexHeritage}
          />
          <AshcroftGray
            active={armed && index === 2}
            imageSrc={assets.vanguardLegal}
          />
        </motion.div>
      </div>

      <Chrome
        panels={PANELS}
        index={index}
        fillProgress={fillProgress}
        playing={playing}
        hintHidden={hintHidden}
        onTogglePlay={togglePlay}
        onSelect={(n) => {
          setHintHidden(true);
          go(n);
        }}
      />

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
