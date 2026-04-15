"use client";

import { motion } from "framer-motion";
import { ArrowDown, Radio, Wifi, ShieldCheck } from "lucide-react";
import Image from "next/image";

const badges = [
  { icon: Radio, label: "LoRa Mesh Network" },
  { icon: Wifi, label: "No Cell Service" },
  { icon: ShieldCheck, label: "Zero Subscriptions" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
      {/* Background photo — Peyto Lake, Banff National Park */}
      <div className="absolute inset-0">
        <Image
          src="/images/peyto-lake.jpg"
          alt="Peyto Lake, Banff National Park, Canadian Rockies"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Dark overlay — forest green tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F16]/85 via-[#0F1F16]/75 to-[#0a1810]/70" />
        {/* Bottom fade for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F1F16] to-transparent" />
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FF5C00]/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-emerald-600/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column — text */}
          <div>
            {/* Pre-headline badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#FF5C00]/10 border border-[#FF5C00]/30 text-[#FF5C00] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]" />
              </span>
              Calgary Beta — Limited Spots
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-[#F8FAFC] mb-6"
            >
              Stay Connected
              <br />
              <span className="text-[#FF5C00]">Where Cell Towers</span>
              <br />
              Can&apos;t Reach.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg sm:text-xl text-[#F8FAFC]/60 font-medium mb-10 leading-relaxed"
            >
              Zero Subscriptions. Total Peace of Mind in the Rockies.
              <br />
              <span className="text-[#F8FAFC]/40 text-base">
                Real-time group tracking on offline maps — no fees, no signal required.
              </span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 bg-[#FF5C00] hover:bg-[#e05200] active:scale-95 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#FF5C00]/25"
              >
                Join Calgary Beta — 30% Off
              </a>
              <a
                href="#device"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/20 text-[#F8FAFC] font-semibold text-base px-8 py-4 rounded-full transition-all duration-200"
              >
                See How It Works
                <ArrowDown size={16} />
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                >
                  <Icon size={14} className="text-emerald-400" />
                  <span className="text-sm text-[#F8FAFC]/70 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — device mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <DeviceMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-[#F8FAFC]/30 uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#F8FAFC]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DeviceMockup() {
  return (
    <div className="relative w-56">
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-[#FF5C00]/20 blur-2xl scale-110" />

      {/* Device body */}
      <div className="relative bg-gradient-to-b from-[#1a2e22] to-[#0d1a10] border border-white/15 rounded-3xl p-6 shadow-2xl">
        {/* Top strap hole */}
        <div className="w-6 h-2 bg-[#0a1208] rounded-full mx-auto mb-4 border border-white/10" />

        {/* LED ring */}
        <div className="w-20 h-20 mx-auto rounded-full bg-[#0d1a10] border-4 border-[#1e3528] flex items-center justify-center mb-6 relative">
          <div className="absolute inset-1 rounded-full led-breathing-blue bg-transparent border-4 border-blue-400/40" />
          <div className="w-8 h-8 rounded-full bg-[#0a1208] border border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#F8FAFC]/60">WL</span>
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 led-breathing-blue" />
            <span className="text-xs text-blue-400 font-semibold">Pairing...</span>
          </div>
          <span className="text-[10px] text-[#F8FAFC]/30">Open wildlink.ca to connect</span>
        </div>

        {/* SOS button */}
        <div className="mt-2 border-t border-white/5 pt-4 flex justify-center">
          <div className="bg-[#EF4444]/20 border-2 border-[#EF4444]/40 text-[#EF4444] text-[10px] font-black tracking-widest px-4 py-1.5 rounded-lg">
            SOS
          </div>
        </div>

        {/* Bottom label */}
        <div className="mt-3 text-center">
          <span className="text-[9px] text-[#F8FAFC]/20 uppercase tracking-widest">WildLink v1</span>
        </div>
      </div>
    </div>
  );
}
