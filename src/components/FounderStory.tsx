"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, MapPin, Cpu, Radio, Database, Layers, FlaskConical, ArrowRight } from "lucide-react";
import Image from "next/image";

const credentials = [
  {
    icon: Database,
    label: "Industrial Telemetry Systems",
    sub: "Remote heat metering · Atmel MCU architecture",
  },
  {
    icon: Radio,
    label: "Long-Range RF & Mesh Protocols",
    sub: "LoRa · Custom firmware · Sub-GHz communications",
  },
  {
    icon: Cpu,
    label: "Embedded Hardware Design",
    sub: "PCB layout · Low-power optimisation · Custom BOM",
  },
  {
    icon: Layers,
    label: "Full-Stack Software Architecture",
    sub: "Angular · NestJS · Real-time data pipelines",
  },
];

const industrialStats = [
  { value: "10+", label: "Years in embedded systems & software architecture" },
  { value: "Atmel", label: "MCU platform — same family as critical utility hardware" },
  { value: "IRL", label: "All benchmarks field-validated in Kananaskis terrain" },
];

export default function FounderStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative py-24 lg:py-36 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810] to-[#0F1F16]" />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-5">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,200 L0,120 L120,60 L240,100 L360,20 L480,80 L600,10 L720,70 L840,30 L960,90 L1080,15 L1200,75 L1320,40 L1440,80 L1440,200 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column story ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Photo + industrial stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/spray-lakes.jpg"
                alt="Spray Lakes, Kananaskis Country, Alberta"
                fill
                className="object-cover object-center"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F16]/70 via-transparent to-[#0F1F16]/20" />

              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/15">
                <MapPin size={14} className="text-[#FF5C00]" />
                <span className="text-xs text-[#F8FAFC]/90 font-medium">Kananaskis Country, AB</span>
              </div>

              <div className="absolute top-4 right-4 bg-[#EF4444]/20 border border-[#EF4444]/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] led-pulse-red" />
                  <span className="text-[11px] font-bold text-[#EF4444]">NO SIGNAL</span>
                </div>
              </div>
            </div>

            {/* Industrial background stats */}
            <div className="grid grid-cols-3 gap-4">
              {industrialStats.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-[#FF5C00]">{s.value}</div>
                  <div className="text-[10px] text-[#F8FAFC]/45 font-medium mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Engineering credentials */}
            <div className="flex flex-col gap-2">
              {credentials.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center">
                    <Icon size={14} className="text-[#FF5C00]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#F8FAFC]/85 font-semibold leading-tight">{label}</div>
                    <div className="text-[10px] text-[#F8FAFC]/40 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Story & authority */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF5C00]" />
              <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">
                The Founder
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight">
              Industrial precision,
              <br />
              <span className="text-[#FF5C00]">applied to the wilderness.</span>
            </h2>

            {/* Pull quote */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
              <Quote
                size={40}
                className="absolute -top-4 -left-2 text-[#FF5C00]/30 fill-[#FF5C00]/10"
              />
              <p className="text-lg text-[#F8FAFC]/80 leading-relaxed italic font-medium relative z-10">
                &ldquo;I was three kilometres into K-Country when the signal dropped and
                fog rolled in. My partner was 500 metres ahead. I had designed remote
                telemetry systems that transmit data across kilometres of industrial
                infrastructure — yet I had nothing that could reach 500 metres through
                trees. That gap had no good answer at any reasonable price point.&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 border-2 border-[#FF5C00]/40 flex items-center justify-center">
                <span className="text-lg font-black text-[#F8FAFC]">S</span>
              </div>
              <div>
                <div className="font-bold text-[#F8FAFC]">Serge Vladimirov</div>
                <div className="text-sm text-[#F8FAFC]/50">
                  Senior Software Architect & Embedded Systems Engineer · Calgary, AB
                </div>
              </div>
            </div>

            <p className="text-[#F8FAFC]/60 leading-relaxed">
              Serhii Vladimirov brings a unique combination of knowledge and experience
              to WildLink: on the one hand, a career in developing mission-critical
              telemetry systems for utility infrastructure — including industrial devices
              based on Atmel microprocessors for remote heat metering — and, on the other,
              practical experience as a seasoned software developer. WildLink is not just
              a shift toward hardware; it is the direct application of proven professional
              methodology to an unsolved security problem. The same engineering rigour
              that defines industrial implementations — reliability in harsh environmental
              conditions, ultra-low power consumption, and fault-tolerant data transmission
              without fixed infrastructure — underpins every design solution at WildLink.
            </p>

            {/* Field research block */}
            <div className="bg-emerald-500/8 border border-emerald-500/25 rounded-2xl p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <FlaskConical size={15} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F8FAFC] mb-1">
                  Open to Field Research Collaboration
                </p>
                <p className="text-sm text-[#F8FAFC]/55 leading-relaxed">
                  We partner with SAR volunteers, certified mountain guides, and outdoor
                  professionals for structured field-validation sessions. Real-world
                  performance data from Canadian Rockies terrain directly informs our
                  hardware and firmware specifications.
                </p>
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-1.5 mt-3 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors"
                >
                  Register your interest →
                </a>
              </div>
            </div>

            <a
              href="#partners"
              className="self-start inline-flex items-center gap-2 border border-[#FF5C00]/50 hover:border-[#FF5C00] text-[#FF5C00] font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Explore Partnership Opportunities
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* ── Engineering Excellence strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="bg-[#FF5C00]/8 border-b border-white/8 px-8 py-5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF5C00]/15 border border-[#FF5C00]/30 flex items-center justify-center flex-shrink-0">
              <Cpu size={16} className="text-[#FF5C00]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider">
                Engineering Excellence
              </h3>
              <p className="text-xs text-[#F8FAFC]/40 mt-0.5">
                Built on Industrial Experience — Same rigour as critical utility infrastructure
              </p>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
            {[
              {
                title: "MCU Architecture",
                body: "Atmel & ESP32 microcontroller families form the hardware core — the same platform used in industrial remote metering systems that must operate reliably in harsh, unattended environments for years.",
              },
              {
                title: "Custom RF Protocols",
                body: "LoRa sub-GHz communications with a bespoke mesh routing layer — engineered for maximum range and minimum power draw in dense boreal forest, not optimised for an anechoic chamber.",
              },
              {
                title: "Low-Power Design",
                body: "72-hour battery life is a direct result of power-budget methodology adopted from industrial IoT deployments, where a device recharge is operationally infeasible.",
              },
              {
                title: "Resilient by Design",
                body: "No single point of failure. The mesh self-heals as nodes move or drop. A discipline inherited from utility telemetry systems where uptime is a contractual obligation, not a target.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white/2 px-6 py-6">
                <div className="text-xs font-bold text-[#FF5C00] uppercase tracking-widest mb-3">
                  {title}
                </div>
                <p className="text-sm text-[#F8FAFC]/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
