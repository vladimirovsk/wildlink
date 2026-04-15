"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, MapPin } from "lucide-react";
import Image from "next/image";

export default function FounderStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative py-24 lg:py-36 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810] to-[#0F1F16]" />

      {/* Decorative mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-5">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,200 L0,120 L120,60 L240,100 L360,20 L480,80 L600,10 L720,70 L840,30 L960,90 L1080,15 L1200,75 L1320,40 L1440,80 L1440,200 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo placeholder + location */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Photo card — Spray Lakes, Kananaskis Country */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/spray-lakes.jpg"
                alt="Spray Lakes, Kananaskis Country, Alberta — where Serhii lost signal"
                fill
                className="object-cover object-center"
                quality={85}
              />
              {/* Subtle dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F16]/70 via-transparent to-[#0F1F16]/20" />

              {/* Kananaskis label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/15">
                <MapPin size={14} className="text-[#FF5C00]" />
                <span className="text-xs text-[#F8FAFC]/90 font-medium">Kananaskis Country, AB</span>
              </div>

              {/* Signal lost badge */}
              <div className="absolute top-4 right-4 bg-[#EF4444]/20 border border-[#EF4444]/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] led-pulse-red" />
                  <span className="text-[11px] font-bold text-[#EF4444]">NO SIGNAL</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "3h", label: "Lost Signal" },
                { value: "-8°C", label: "Temperature" },
                { value: "2km", label: "From Trailhead" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-black text-[#FF5C00]">{stat.value}</div>
                  <div className="text-xs text-[#F8FAFC]/50 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Quote and story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#FF5C00]" />
              <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">
                The Founder&apos;s Story
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight">
              Built from a{" "}
              <span className="text-[#FF5C00]">terrifying</span>{" "}
              afternoon in Kananaskis.
            </h2>

            {/* Pull quote */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
              <Quote
                size={40}
                className="absolute -top-4 -left-2 text-[#FF5C00]/30 fill-[#FF5C00]/10"
              />
              <p className="text-lg text-[#F8FAFC]/80 leading-relaxed italic font-medium relative z-10">
                &ldquo;I was three kilometres from the car in K-Country when my phone lost signal
                and fog rolled in. My hiking partner was 500m ahead and I had no idea
                if he was okay. I spent three hours second-guessing every trail fork.
                When I finally got out, I knew there had to be a better way — and I
                couldn&apos;t find one that didn&apos;t cost $50 a month.&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 border-2 border-[#FF5C00]/40 flex items-center justify-center">
                <span className="text-lg font-black text-[#F8FAFC]">S</span>
              </div>
              <div>
                <div className="font-bold text-[#F8FAFC]">Serhii Vladimirov</div>
                <div className="text-sm text-[#F8FAFC]/50">
                  Software Engineer · Calgary, AB · Founder of WildLink
                </div>
              </div>
            </div>

            <p className="text-[#F8FAFC]/60 leading-relaxed">
              Serhii spent 18 months building WildLink in his Calgary garage — learning
              LoRa radio protocols, designing the mesh firmware, and testing in the
              same trails that inspired it. The result: a device that costs less than
              a single month of a competitor&apos;s subscription, lasts 72 hours on one
              charge, and works where nothing else does.
            </p>

            {/* Field testing invite */}
            <div className="bg-emerald-500/8 border border-emerald-500/25 rounded-2xl p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <span className="text-base">🏔️</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#F8FAFC] mb-1">
                  Want to field-test the device together?
                </p>
                <p className="text-sm text-[#F8FAFC]/55 leading-relaxed">
                  I&apos;m always open to joint trail runs — mountains, forest, wherever you hike.
                  Free, informal: we take a prototype, hit the route, and honestly look for
                  weak spots. Your real-world experience is worth more than any lab benchmark.
                </p>
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-1.5 mt-3 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-colors"
                >
                  Sign up and let&apos;s make it happen →
                </a>
              </div>
            </div>

            <a
              href="#waitlist"
              className="self-start inline-flex items-center gap-2 border border-[#FF5C00]/50 hover:border-[#FF5C00] text-[#FF5C00] font-semibold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Support the Mission
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
