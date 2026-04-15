"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Coffee, Wrench, Cpu } from "lucide-react";

const spends = [
  { icon: Cpu, label: "LoRa modules & prototypes" },
  { icon: Wrench, label: "Field testing equipment" },
  { icon: Coffee, label: "Late nights in a Calgary R&D studio" },
];

export default function SupportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 lg:py-28 bg-[#0a1810]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F16] to-[#0a1810]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 mb-6">
            <Heart size={24} className="text-[#FF5C00]" />
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-white/15" />
            <span className="text-xs uppercase tracking-widest text-[#F8FAFC]/40 font-semibold">
              Support the Project
            </span>
            <div className="h-px w-10 bg-white/15" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-black text-[#F8FAFC] leading-tight mb-5">
            An independent R&D initiative,{" "}
            <span className="text-[#FF5C00]">self-funded from day one.</span>
          </h2>

          {/* Body */}
          <p className="text-[#F8FAFC]/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            WildLink is a Calgary-based engineering initiative with no outside investors
            and no corporate budget. Every prototype, every LoRa module, and every field
            run in Kananaskis has been funded personally. If this mission resonates with
            you, any support helps move us closer to production.
          </p>

          {/* What money goes to */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {spends.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/4 border border-white/10 px-4 py-2 rounded-full"
              >
                <Icon size={14} className="text-[#F8FAFC]/50" />
                <span className="text-xs text-[#F8FAFC]/60 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA placeholder — Stripe coming soon */}
          <div className="relative inline-block">
            <button
              disabled
              className="inline-flex items-center gap-3 bg-[#FF5C00]/20 border-2 border-[#FF5C00]/40 text-[#FF5C00]/60 font-bold text-base px-8 py-4 rounded-full cursor-not-allowed select-none"
              title="Coming soon — online donations via Stripe"
            >
              <Heart size={18} />
              Support the Project
            </button>

            {/* Coming soon badge */}
            <span className="absolute -top-3 -right-3 bg-[#334155] text-[#F8FAFC]/70 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap">
              Soon
            </span>
          </div>

          <p className="mt-4 text-xs text-[#F8FAFC]/25">
            Online donations via Stripe — coming soon.
            For now, the most valuable thing you can do is join the beta above.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
