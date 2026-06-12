"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import AuraSpatial from "@/components/sections/AuraSpatial";
import ApexHeritage from "@/components/sections/ApexHeritage";
import VanguardLegal from "@/components/sections/VanguardLegal";
import { loadAllAssets, EMPTY_ASSETS, type AssetMap } from "@/lib/imageService";

/** Preloader stays up at least this long so the counter reads as deliberate. */
const MIN_PRELOAD_MS = 2400;
/** Buffer after load completes for the counter to glide to 100. */
const COUNTER_SETTLE_MS = 1200;
/** Dwell time on each page before auto-scrolling to the next. */
const AUTO_SCROLL_INTERVAL_MS = 4000;

export default function Home() {
  const [assets, setAssets] = useState<AssetMap>(EMPTY_ASSETS);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const startedRef = useRef(false);
  const sectionTwoRef = useRef<HTMLElement>(null);
  const sectionThreeRef = useRef<HTMLElement>(null);

  // Phase 1 — fetch every image, holding the preloader until all promises
  // settle (resolved or gracefully failed) and the minimum dwell has passed.
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
        // Surface each image the moment it resolves — the preloader
        // background can appear mid-load instead of waiting for the set.
        if (!cancelled) setAssets((prev) => ({ ...prev, [key]: src }));
      }
    );

    Promise.all([load, minDelay]).then(([result]) => {
      if (cancelled) return;
      setAssets(result);
      setProgress(1);
      setTimeout(() => {
        if (!cancelled) setIsLoaded(true);
      }, COUNTER_SETTLE_MS);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToSection = useCallback((el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Phase 2 — once revealed, dwell on each page then glide to the next.
  useEffect(() => {
    if (!isLoaded) return;
    const toTwo = setTimeout(
      () => scrollToSection(sectionTwoRef.current),
      AUTO_SCROLL_INTERVAL_MS
    );
    const toThree = setTimeout(
      () => scrollToSection(sectionThreeRef.current),
      AUTO_SCROLL_INTERVAL_MS * 2
    );
    return () => {
      clearTimeout(toTwo);
      clearTimeout(toThree);
    };
  }, [isLoaded, scrollToSection]);

  return (
    <main>
      <AnimatePresence>
        {!isLoaded && (
          <Preloader progress={progress} backgroundSrc={assets.preloader} />
        )}
      </AnimatePresence>

      <AuraSpatial imageSrc={assets.auraSpatial} />
      <ApexHeritage ref={sectionTwoRef} imageSrc={assets.apexHeritage} />
      <VanguardLegal ref={sectionThreeRef} imageSrc={assets.vanguardLegal} />
    </main>
  );
}
