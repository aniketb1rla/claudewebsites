"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionImage from "@/components/SectionImage";

interface SectionProps {
  imageSrc: string | null;
}

/** Page 1 — Aura Spatial. Interior design studio. Image right, copy left. */
const AuraSpatial = forwardRef<HTMLElement, SectionProps>(function AuraSpatial(
  { imageSrc },
  ref
) {
  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full items-center bg-[#f7f7f6]"
    >
      {/* Liquid-glass navigation */}
      <nav className="absolute left-1/2 top-8 z-10 flex w-[min(92%,64rem)] -translate-x-1/2 items-center justify-between rounded-full border border-white/60 bg-white/55 px-7 py-3.5 shadow-[0_1px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">
          Aura Spatial
        </span>
        <div className="hidden items-center gap-8 text-xs font-medium text-neutral-500 md:flex">
          <span>Projects</span>
          <span>Studio</span>
          <span>Journal</span>
        </div>
        <button className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700">
          Enquire
        </button>
      </nav>

      <motion.div
        className="mx-auto grid w-[min(92%,72rem)] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="lg:col-span-6">
          <motion.p
            variants={fadeUp}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400"
          >
            Interior Architecture — 01
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-light leading-[1.02] tracking-tight text-neutral-900 md:text-7xl"
          >
            Space,
            <br />
            <span className="font-medium">distilled.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md text-base leading-relaxed text-neutral-500"
          >
            We compose interiors from light, texture, and restraint. Every
            material is chosen for how it ages; every void is left for how it
            breathes.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <button className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
              View portfolio
            </button>
            <button className="rounded-full border border-neutral-300 bg-white/50 px-7 py-3 text-sm font-medium text-neutral-700 backdrop-blur-sm transition-colors hover:border-neutral-400">
              Our process
            </button>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <SectionImage
            src={imageSrc}
            alt="Minimalist living space — polished concrete meeting raw linen"
            className="aspect-[4/3] w-full shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
          />
          <motion.p
            variants={fadeUp}
            className="mt-4 text-right text-[11px] uppercase tracking-[0.25em] text-neutral-400"
          >
            Residence N° 14 — Copenhagen
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
});

export default AuraSpatial;
