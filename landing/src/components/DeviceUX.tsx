"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bluetooth, Zap, AlertTriangle, Smartphone } from "lucide-react";

const LED_STATES = [
  {
    id: "pairing",
    label: "Pairing Mode",
    color: "bg-blue-400",
    ring: "border-blue-400",
    glow: "shadow-blue-400/60",
    animClass: "led-breathing-blue",
    description: "Breathing Blue — One-tap BLE pairing via WildLink PWA.",
    icon: Bluetooth,
  },
  {
    id: "linked",
    label: "Linked & Tracking",
    color: "bg-emerald-400",
    ring: "border-emerald-400",
    glow: "shadow-emerald-400/60",
    animClass: "",
    description: "Solid Green — Device linked. Group tracking active on offline map.",
    icon: Zap,
  },
  {
    id: "outofrange",
    label: "Member Out of Range",
    color: "bg-red-400",
    ring: "border-red-400",
    glow: "shadow-red-400/60",
    animClass: "led-pulse-red",
    description: "Pulsing Red — A member has gone beyond mesh range. Audio + haptic alert triggered.",
    icon: AlertTriangle,
  },
  {
    id: "sos",
    label: "SOS Active",
    color: "bg-red-500",
    ring: "border-red-500",
    glow: "shadow-red-500/60",
    animClass: "led-flash-sos",
    description: "Flashing Bright Red — Physical SOS button pressed. Every device in the network is alerted.",
    icon: AlertTriangle,
  },
];

export default function DeviceUX() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeState, setActiveState] = useState(0);

  const active = LED_STATES[activeState];
  const Icon = active.icon;

  return (
    <section id="device" className="relative py-24 lg:py-36 bg-[#0a1810]" ref={ref}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(90deg, #F8FAFC 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#FF5C00]" />
            <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">Device UX</span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            Ready in <span className="text-[#FF5C00]">3 Seconds</span>.<br />No Logins. No Passwords.
          </h2>
          <p className="text-[#F8FAFC]/60 text-lg">
            Turn on the device → open wildlink.ca on your phone → tap Connect.
            That&apos;s it. Designed to work in gloves, in rain, at 5am before a summit push.
          </p>
        </motion.div>

        {/* 3-step setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-20"
        >
          {[
            { step: "01", title: "Power On", desc: "Hold button 2s" },
            { step: "02", title: "Open PWA", desc: "wildlink.ca on any phone" },
            { step: "03", title: "Tap Connect", desc: "BLE pairs instantly" },
          ].map((item, i) => (
            <div key={item.step} className="relative text-center">
              {i < 2 && (
                <div className="absolute top-6 left-[60%] w-full h-px border-t-2 border-dashed border-white/15 hidden sm:block" />
              )}
              <div className="w-12 h-12 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#FF5C00] font-black text-sm">{item.step}</span>
              </div>
              <div className="font-bold text-[#F8FAFC] text-sm">{item.title}</div>
              <div className="text-[#F8FAFC]/40 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* LED Interactive Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Device illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${active.color} scale-150 transition-all duration-500`} />

              {/* Device */}
              <div className="relative w-64 h-64 bg-gradient-to-b from-[#1e3528] to-[#0d1a10] rounded-full border-2 border-white/10 flex items-center justify-center shadow-2xl">
                {/* LED ring */}
                <div
                  className={`absolute inset-4 rounded-full border-4 ${active.ring} transition-all duration-500 shadow-lg ${active.glow} ${active.animClass}`}
                />

                {/* Center */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <Icon size={28} className={`text-${active.color.replace("bg-", "")}`} />
                  <span className="text-xs font-bold text-[#F8FAFC]/60 uppercase tracking-widest">WildLink</span>
                </div>

                {/* SOS button */}
                <div className="absolute bottom-6 flex flex-col items-center gap-1">
                  <div className="w-10 h-3 bg-[#1a1a1a] rounded border border-[#EF4444]/40 flex items-center justify-center">
                    <span className="text-[8px] font-black text-[#EF4444] tracking-widest">SOS</span>
                  </div>
                  <span className="text-[9px] text-[#F8FAFC]/20">recessed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: LED state selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-2xl font-black text-[#F8FAFC] mb-2">Smart RGB Ring</h3>
            <p className="text-[#F8FAFC]/50 text-sm mb-4">
              No need to check your phone. The LED ring tells the story at a glance.
            </p>

            {LED_STATES.map((state, idx) => (
              <button
                key={state.id}
                onClick={() => setActiveState(idx)}
                className={`group flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                  activeState === idx
                    ? "bg-white/8 border-white/20"
                    : "bg-transparent border-white/5 hover:border-white/15 hover:bg-white/4"
                }`}
              >
                <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${state.color} ${activeState === idx ? state.animClass : ""} transition-all`} />
                <div>
                  <div className="font-bold text-[#F8FAFC] text-sm">{state.label}</div>
                  <div className="text-[#F8FAFC]/50 text-xs mt-0.5 leading-relaxed">{state.description}</div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* SOS Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative bg-gradient-to-r from-[#EF4444]/10 to-[#EF4444]/5 border border-[#EF4444]/30 rounded-2xl p-8 max-w-4xl mx-auto overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#EF4444]/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-shrink-0 w-20 h-12 bg-[#1a0a0a] rounded-xl border-2 border-[#EF4444]/60 flex items-center justify-center">
              <span className="text-sm font-black text-[#EF4444] tracking-widest">SOS</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-2">
                A Real, Physical Button. Not a Touchscreen.
              </h3>
              <p className="text-[#F8FAFC]/60 leading-relaxed">
                In a real emergency — wet hands, thick gloves, -20°C —{" "}
                <strong className="text-[#F8FAFC]">a touchscreen cannot be trusted.</strong> WildLink&apos;s
                SOS is a recessed physical button that clicks. One press alerts every device in your mesh
                network simultaneously. No unlock screen. No delay.
              </p>
            </div>
          </div>
        </motion.div>

        {/* PWA Setup visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Smartphone size={20} className="text-[#FF5C00]" />
              <span className="font-bold text-[#F8FAFC]">WildLink PWA — Works on any phone, no app store needed</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <div className="w-full h-24 bg-[#1a2e22] rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-[#F8FAFC]">Live Map View</div>
                <div className="text-xs text-[#F8FAFC]/40">All group members as dots</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <div className="w-full h-24 bg-[#1a2e22] rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-2xl font-black text-[#FF5C00]">72h</div>
                </div>
                <div className="text-xs font-semibold text-[#F8FAFC]">Battery Life</div>
                <div className="text-xs text-[#F8FAFC]/40">Full weekend, no charge</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <div className="w-full h-24 bg-[#1a2e22] rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-2xl font-black text-emerald-400">5km</div>
                </div>
                <div className="text-xs font-semibold text-[#F8FAFC]">LoRa Range</div>
                <div className="text-xs text-[#F8FAFC]/40">Line of sight, per hop</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
