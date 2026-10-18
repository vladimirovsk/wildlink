"use client";

import { useState } from "react";
import { Bluetooth, Zap, AlertTriangle, Smartphone } from "lucide-react";

const LED_STATES = [
  {
    id: "pairing",
    label: "Pairing mode",
    dot: "bg-blue-400",
    ringColor: "#60A5FA",
    animClass: "led-breathing-blue",
    description: "Breathing blue: one-tap BLE pairing via the WildLink PWA.",
    icon: Bluetooth,
  },
  {
    id: "linked",
    label: "Linked and tracking",
    dot: "bg-emerald-400",
    ringColor: "#34D399",
    animClass: "",
    description: "Solid green: device linked. Group tracking active on the offline map.",
    icon: Zap,
  },
  {
    id: "outofrange",
    label: "Member out of range",
    dot: "bg-red-400",
    ringColor: "#F87171",
    animClass: "led-pulse-red",
    description: "Pulsing red: a member has gone beyond mesh range. Audio and haptic alert triggered.",
    icon: AlertTriangle,
  },
  {
    id: "sos",
    label: "SOS active",
    dot: "bg-red-500",
    ringColor: "#EF4444",
    animClass: "led-flash-sos",
    description: "Flashing bright red: physical SOS button pressed. Every device in the network is alerted.",
    icon: AlertTriangle,
  },
];

const STEPS = [
  { title: "Power on", desc: "Hold the button for 2 seconds" },
  { title: "Open the PWA", desc: "wildlink.ca on any phone" },
  { title: "Tap Connect", desc: "BLE pairs instantly" },
];

export default function DeviceUX() {
  const [activeState, setActiveState] = useState(0);
  const active = LED_STATES[activeState];
  const Icon = active.icon;

  return (
    <section id="device" className="relative bg-forest py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-alpine sm:text-6xl lg:text-7xl">
            Ready in 3 seconds. No logins, no passwords.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-alpine/70">
            Turn on the device, open wildlink.ca on your phone, tap Connect.
            That&apos;s it. Designed to work in gloves, in rain, at 5am before a
            summit push.
          </p>
        </div>

        {/* Setup is a real sequence, so the steps are numbered */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex items-center gap-4 bg-forest px-6 py-6">
              <span className="font-display text-5xl font-semibold leading-none text-orange">
                {i + 1}
              </span>
              <div>
                <div className="text-lg font-semibold text-alpine">{s.title}</div>
                <div className="text-sm text-alpine/60">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>

        {/* Interactive LED ring */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-150 rounded-full opacity-25 blur-3xl transition-colors duration-500"
                style={{ background: active.ringColor }}
              />
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-white/10 bg-gradient-to-b from-[#1e3528] to-[#0d1a10] shadow-2xl sm:h-72 sm:w-72">
                <div
                  className={`absolute inset-4 rounded-full border-4 transition-colors duration-500 ${active.animClass}`}
                  style={{ borderColor: active.ringColor }}
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <Icon size={30} style={{ color: active.ringColor }} />
                  <span className="font-display text-xl font-semibold tracking-wide text-alpine/80">
                    WildLink
                  </span>
                </div>
                <div className="absolute bottom-7 flex flex-col items-center gap-1">
                  <div className="flex h-3 w-11 items-center justify-center rounded border border-[#EF4444]/50 bg-[#1a1a1a]">
                    <span className="text-[8px] font-bold tracking-widest text-[#EF4444]">SOS</span>
                  </div>
                  <span className="text-[10px] text-alpine/40">recessed</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-alpine sm:text-4xl">
              Smart RGB ring
            </h3>
            <p className="mt-2 mb-6 text-alpine/65">
              No need to check your phone. The LED ring tells the story at a glance.
              Tap a state to preview it.
            </p>
            <div className="flex flex-col gap-3" role="group" aria-label="LED ring states">
              {LED_STATES.map((state, idx) => (
                <button
                  key={state.id}
                  type="button"
                  aria-pressed={activeState === idx}
                  onClick={() => setActiveState(idx)}
                  className={`flex items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                    activeState === idx
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${state.dot} ${
                      activeState === idx ? state.animClass : ""
                    }`}
                  />
                  <span>
                    <span className="block font-semibold text-alpine">{state.label}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-alpine/65">
                      {state.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Physical SOS */}
        <div className="mt-20 grid items-center gap-8 rounded-2xl border border-sos/40 bg-sos/10 p-8 sm:grid-cols-[auto_1fr] sm:p-10">
          <div className="flex h-14 w-24 items-center justify-center rounded-xl border-2 border-sos/70 bg-[#1a0a0a]">
            <span className="text-base font-bold tracking-widest text-sos">SOS</span>
          </div>
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-alpine">
              A real, physical button. Not a touchscreen.
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-alpine/75">
              In a real emergency (wet hands, thick gloves, -20°C){" "}
              <strong className="font-semibold text-alpine">a touchscreen cannot be trusted.</strong>{" "}
              WildLink&apos;s SOS is a recessed physical button that clicks. One press alerts
              every device in your mesh network simultaneously. No unlock screen. No delay.
            </p>
          </div>
        </div>

        <p className="mt-10 flex items-center gap-3 text-alpine/70">
          <Smartphone size={20} className="shrink-0 text-orange" />
          WildLink PWA: works on any phone, no app store needed.
        </p>
      </div>
    </section>
  );
}
