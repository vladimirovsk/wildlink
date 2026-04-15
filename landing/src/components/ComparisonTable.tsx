"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

interface Feature {
  label: string;
  wildlink: boolean | "partial" | string;
  garmin: boolean | "partial" | string;
  radio: boolean | "partial" | string;
}

const FEATURES: Feature[] = [
  { label: "Monthly fee",       wildlink: "$0 / forever",  garmin: "$20–50 / mo",     radio: "$0" },
  { label: "GPS tracking",      wildlink: true,            garmin: true,               radio: false },
  { label: "Offline maps",      wildlink: true,            garmin: true,               radio: false },
  { label: "Cell service req.", wildlink: false,           garmin: false,              radio: false },
  { label: "Mesh networking",   wildlink: true,            garmin: false,              radio: false },
  { label: "Real-time group",   wildlink: true,            garmin: "partial",          radio: false },
  { label: "Physical SOS btn",  wildlink: true,            garmin: true,               radio: false },
  { label: "SOS alerts group",  wildlink: true,            garmin: false,              radio: false },
  { label: "Guardian alerts",   wildlink: true,            garmin: false,              radio: false },
  { label: "No subscription",   wildlink: true,            garmin: false,              radio: true },
  { label: "3-sec setup",       wildlink: true,            garmin: false,              radio: "partial" },
  { label: "72h battery",       wildlink: true,            garmin: "partial",          radio: "partial" },
];

function Cell({ value }: { value: boolean | "partial" | string }) {
  if (typeof value === "string") {
    const isWild = value.includes("$0");
    return (
      <span className={`text-sm font-bold ${isWild ? "text-[#FF5C00]" : "text-[#F8FAFC]/60"}`}>
        {value}
      </span>
    );
  }
  if (value === true)
    return <Check size={18} className="text-emerald-400 mx-auto" />;
  if (value === false)
    return <X size={18} className="text-[#F8FAFC]/20 mx-auto" />;
  return <Minus size={18} className="text-yellow-400/60 mx-auto" />;
}

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="compare" className="relative py-24 lg:py-36 bg-[#0F1F16]" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#FF5C00]" />
            <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">Compare</span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            Why Pay $600/yr for
            <br />
            <span className="text-[#FF5C00]">Half the Features?</span>
          </h2>
          <p className="text-[#F8FAFC]/60 text-lg">
            WildLink does more, costs nothing monthly, and was built specifically
            for group outdoor use in the Canadian Rockies.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[640px]">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-px mb-px">
              <div className="bg-white/3 rounded-tl-2xl p-4" />
              {/* WildLink */}
              <div className="bg-[#FF5C00]/10 border border-[#FF5C00]/30 rounded-t-2xl p-5 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5C00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                  Best Value
                </div>
                <div className="font-black text-[#F8FAFC] text-lg mt-2">
                  Wild<span className="text-[#FF5C00]">Link</span>
                </div>
                <div className="text-[#FF5C00] font-bold text-sm mt-1">$0 / month</div>
              </div>
              {/* Garmin */}
              <div className="bg-white/4 border border-white/8 rounded-t-2xl p-5 text-center">
                <div className="font-bold text-[#F8FAFC]/70 text-lg">Garmin inReach</div>
                <div className="text-[#F8FAFC]/40 text-sm mt-1">$20–50 / month</div>
              </div>
              {/* Radio */}
              <div className="bg-white/4 border border-white/8 rounded-t-2xl rounded-tr-2xl p-5 text-center">
                <div className="font-bold text-[#F8FAFC]/70 text-lg">Standard Radio</div>
                <div className="text-[#F8FAFC]/40 text-sm mt-1">$0 / month</div>
              </div>
            </div>

            {/* Feature rows */}
            {FEATURES.map((feature, idx) => (
              <div key={feature.label} className="grid grid-cols-4 gap-px">
                {/* Label */}
                <div
                  className={`bg-white/3 px-5 py-3.5 flex items-center ${
                    idx === FEATURES.length - 1 ? "rounded-bl-2xl" : ""
                  }`}
                >
                  <span className="text-sm text-[#F8FAFC]/70 font-medium">{feature.label}</span>
                </div>
                {/* WildLink */}
                <div className="bg-[#FF5C00]/5 border-x border-[#FF5C00]/20 px-5 py-3.5 flex items-center justify-center">
                  <Cell value={feature.wildlink} />
                </div>
                {/* Garmin */}
                <div className="bg-white/2 px-5 py-3.5 flex items-center justify-center">
                  <Cell value={feature.garmin} />
                </div>
                {/* Radio */}
                <div
                  className={`bg-white/2 px-5 py-3.5 flex items-center justify-center ${
                    idx === FEATURES.length - 1 ? "rounded-br-2xl" : ""
                  }`}
                >
                  <Cell value={feature.radio} />
                </div>
              </div>
            ))}

            {/* Footer row */}
            <div className="grid grid-cols-4 gap-px mt-px">
              <div className="bg-white/3 rounded-bl-2xl p-4" />
              <div className="bg-[#FF5C00]/10 border border-[#FF5C00]/30 border-t-0 rounded-b-2xl p-5 flex justify-center">
                <a
                  href="#waitlist"
                  className="bg-[#FF5C00] hover:bg-[#e05200] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
                >
                  Join Beta →
                </a>
              </div>
              <div className="bg-white/4 border border-t-0 border-white/8 rounded-b-2xl p-5 flex justify-center items-center">
                <span className="text-xs text-[#F8FAFC]/30">Satellite subscription</span>
              </div>
              <div className="bg-white/4 border border-t-0 border-white/8 rounded-b-2xl rounded-br-2xl p-5 flex justify-center items-center">
                <span className="text-xs text-[#F8FAFC]/30">No GPS, no tracking</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 text-center text-xs text-[#F8FAFC]/30"
        >
          * Garmin inReach pricing based on 2024 Freedom plan. WildLink one-time device cost TBA at launch.
        </motion.p>
      </div>
    </section>
  );
}
