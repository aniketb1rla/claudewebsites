"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionImage from "@/components/SectionImage";

interface SectionProps {
  imageSrc: string | null;
}

/** Page 3 — Vanguard Legal Partners. Solicitors. Image left, copy right. */
const VanguardLegal = forwardRef<HTMLElement, SectionProps>(
  function VanguardLegal({ imageSrc }, ref) {
    return (
      <section
        ref={ref}
        className="relative flex h-screen w-full items-center bg-[#efefee]"
      >
        <nav className="absolute left-1/2 top-8 z-10 flex w-[min(92%,64rem)] -translate-x-1/2 items-center justify-between rounded-full border border-white/60 bg-white/55 px-7 py-3.5 shadow-[0_1px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            Vanguard Legal Partners
          </span>
          <div className="hidden items-center gap-8 text-xs font-medium text-neutral-500 md:flex">
            <span>Practice areas</span>
            <span>People</span>
            <span>Insights</span>
          </div>
          <button className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700">
            Consultation
          </button>
        </nav>

        <motion.div
          className="mx-auto grid w-[min(92%,72rem)] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="order-2 lg:order-1 lg:col-span-6">
            <SectionImage
              src={imageSrc}
              alt="Charcoal fountain pen resting on textured legal paper"
              className="aspect-[4/3] w-full shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
            />
            <motion.p
              variants={fadeUp}
              className="mt-4 text-[11px] uppercase tracking-[0.25em] text-neutral-400"
            >
              One Lothbury — London EC2
            </motion.p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <motion.p
              variants={fadeUp}
              className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400"
            >
              Solicitors — 03
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl font-light leading-[1.02] tracking-tight text-neutral-900 md:text-7xl"
            >
              Counsel,
              <br />
              <span className="font-medium">considered.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-md text-base leading-relaxed text-neutral-500"
            >
              Precision advocacy for complex commercial matters. We measure our
              work in outcomes secured and risks quietly retired — never in
              hours alone.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-4"
            >
              <button className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                Speak with a partner
              </button>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                SRA Regulated
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }
);

export default VanguardLegal;
