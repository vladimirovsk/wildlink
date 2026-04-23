"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Navigation,
  BatteryCharging,
  RadioTower,
  History,
  ExternalLink,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Device Registration",
    description: "Pair your WildLink device in seconds — no technical knowledge required.",
  },
  {
    icon: Navigation,
    title: "Offline Movement Monitoring",
    description: "Track your group's location in real-time without cellular connection.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Status",
    description: "Monitor battery level across all devices in your group at a glance.",
  },
  {
    icon: RadioTower,
    title: "Device Status",
    description: "See which devices are online, out of range, or sending SOS alerts.",
  },
  {
    icon: History,
    title: "Movement History",
    description: "Replay past routes and review where your group has been on the trail.",
  },
];

export default function AppPromo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 bg-[#0F1F16] overflow-hidden" ref={ref}>
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#FF5C00]" />
              <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">
                Web App
              </span>
              <div className="h-px w-12 bg-[#FF5C00]" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
              Your whole group.
              <br />
              <span className="text-[#FF5C00]">One screen.</span>
            </h2>

            <p className="text-[#F8FAFC]/60 text-lg leading-relaxed mb-8 max-w-lg">
              The WildLink web app gives you a live dashboard for every device in your group —
              location, battery, status, and history. No cell service needed on the trail.
              Works from any browser at basecamp or at home.
            </p>

            {/* CTA */}
            <div className="relative inline-block">
              <a
                href="https://app.wildlink.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FF5C00]/15 hover:bg-[#FF5C00]/25 border-2 border-[#FF5C00]/60 hover:border-[#FF5C00] text-[#FF5C00] font-bold text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                <ExternalLink size={18} />
                Open app.wildlink.ca
              </a>
              <span className="absolute -top-3 -right-3 bg-[#FF5C00] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                Test
              </span>
            </div>

            <p className="mt-4 text-xs text-[#F8FAFC]/40">
              Early test version. Join the beta to follow development.
            </p>
          </motion.div>

          {/* Right — feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-[#FF5C00]/25 hover:bg-white/5 transition-all duration-200 ${
                  i === features.length - 1 && features.length % 2 !== 0
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center">
                    <Icon size={16} className="text-[#FF5C00]" />
                  </div>
                  <span className="text-sm font-bold text-[#F8FAFC]">{title}</span>
                </div>
                <p className="text-xs text-[#F8FAFC]/50 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
