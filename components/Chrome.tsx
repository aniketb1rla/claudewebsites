"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export interface PanelMeta {
  key: string;
  name: string;
  tone: "dark" | "light";
}

interface ChromeProps {
  panels: PanelMeta[];
  index: number;
  /** Dwell progress of the active panel, 0–1, driven by the autoplay loop. */
  fillProgress: MotionValue<number>;
  playing: boolean;
  hintHidden: boolean;
  onTogglePlay: () => void;
  onSelect: (n: number) => void;
}

/**
 * Fixed overlay UI: top progress segments (accented per brand), right rail
 * dots with labels, autoplay play/pause, page counter, and the scroll hint.
 * Tone (light/dark) follows the active panel via the body class.
 */
export default function Chrome({
  panels,
  index,
  fillProgress,
  playing,
  hintHidden,
  onTogglePlay,
  onSelect,
}: ChromeProps) {
  const activeWidth = useTransform(fillProgress, (v) => `${v * 100}%`);

  return (
    <>
      <div className={`progress acc-${panels[index].key}`}>
        {panels.map((p, k) => (
          <div className="seg" key={p.key}>
            {k === index ? (
              <motion.i className="fill" style={{ width: activeWidth }} />
            ) : (
              <i
                className="fill"
                style={{ width: k < index ? "100%" : "0%" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rail tone" aria-label="Landing pages">
        {panels.map((p, k) => (
          <button
            key={p.key}
            className={k === index ? "on" : ""}
            aria-label={`Go to ${p.name}`}
            onClick={() => onSelect(k)}
          >
            <span className="rlabel">{p.name}</span>
            <span className="rdot" />
          </button>
        ))}
      </div>

      <div className="controls tone">
        <button
          className="pp"
          onClick={onTogglePlay}
          aria-label={playing ? "Pause autoplay" : "Play autoplay"}
        >
          <svg viewBox="0 0 12 12">
            {playing ? (
              <>
                <rect x="2" y="1.5" width="3" height="9" />
                <rect x="7" y="1.5" width="3" height="9" />
              </>
            ) : (
              <path d="M2.5 1.5 L10.5 6 L2.5 10.5 Z" />
            )}
          </svg>
        </button>
        <span className="lab">{playing ? "Autoplay" : "Paused"}</span>
      </div>

      <div className="counter tone">
        <div className="idx">
          <span>{String(index + 1).padStart(2, "0")}</span>{" "}
          <span className="tot">/ {String(panels.length).padStart(2, "0")}</span>
        </div>
        <div className="nm">{panels[index].name}</div>
      </div>

      <div className={`hint tone ${hintHidden ? "hide" : ""}`}>
        <span className="key">↑</span>
        <span className="key">↓</span> or scroll to move between pages
      </div>
    </>
  );
}
