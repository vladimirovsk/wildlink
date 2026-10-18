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
    <section className="relative py-20 lg:py-28 bg-mist overflow-hidden" ref={ref}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1] tracking-tight mb-5 text-forest">Your whole group. One screen.</h2>

            <p className="text-forest/68 text-lg leading-relaxed mb-8 max-w-lg">
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
                className="inline-flex items-center gap-3 bg-[#FF5C00]/15 hover:bg-[#FF5C00]/25 border-2 border-[#FF5C00]/60 hover:border-[#FF5C00] text-[#B53D00] font-bold text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                <ExternalLink size={18} />
                Open app.wildlink.ca
              </a>
              <span className="absolute -top-3 -right-3 bg-[#FF5C00] text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                Test
              </span>
            </div>

            <p className="mt-4 text-xs text-forest/68">
              Early test version. Join the beta to follow development.
            </p>
          </motion.div>

          {/* Right — feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`bg-forest/[0.04] border border-forest/15 rounded-2xl p-5 hover:border-[#FF5C00]/25 hover:bg-forest/[0.04] transition-all duration-200 ${
                  i === features.length - 1 && features.length % 2 !== 0
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center">
                    <Icon size={16} className="text-[#B53D00]" />
                  </div>
                  <span className="text-sm font-bold text-forest">{title}</span>
                </div>
                <p className="text-xs text-forest/68 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
