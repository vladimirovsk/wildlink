"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import GuardianMapDemo from "./GuardianMapDemo";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest">
        {/* Background photo: Peyto Lake, Banff National Park */}
        <div className="absolute inset-0">
          <Image
            src="/images/peyto-lake.jpg"
            alt="Peyto Lake, Banff National Park, Canadian Rockies"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
          {/* Even forest tint keeps the photo and the map panel in one tonal range */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F16]/85 via-[#0F1F16]/75 to-[#0a1810]/70" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F1F16] to-transparent" />
        </div>
        <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-72 w-72 rounded-full bg-emerald-600/10 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            <div>
              <p
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-sm font-semibold text-[#FFB38A]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                </span>
                Canada beta, limited spots
              </p>

              <h1
                className="font-display text-[3.4rem] font-semibold leading-[0.95] tracking-tight text-alpine sm:text-7xl xl:text-[5.6rem]"
              >
                Stay connected where cell towers can&apos;t reach.
              </h1>

              <div
                className="mt-7 max-w-xl"
              >
                <p className="text-xl font-medium leading-snug text-alpine/90 sm:text-2xl">
                  Zero subscriptions. Total peace of mind in the Rockies.
                </p>
                <p className="mt-3 text-base leading-relaxed text-alpine/65">
                  Real-time group tracking on offline maps. No fees, no signal
                  required.
                </p>
              </div>

              <div
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-orange px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange/25 transition-colors hover:bg-[#e05200] active:scale-[0.98]"
                >
                  Join Canadian beta, 30% off
                </a>
                <a
                  href="#device"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-alpine transition-colors hover:bg-white/10"
                >
                  See how it works
                  <ArrowDown size={16} />
                </a>
              </div>

              <p
                className="mt-6 text-sm text-alpine/55"
              >
                Every range figure is field-validated in Kananaskis terrain.
              </p>
            </div>

            <div
            >
              <GuardianMapDemo />
              <p className="mx-auto mt-4 max-w-[460px] text-center text-sm text-alpine/70">
                Guardian Alert: the moment a child leaves the 500 m radius,
                every device in the group fires.
              </p>
            </div>
          </div>
        </div>
        <p className="absolute bottom-3 left-4 z-10 text-xs font-medium text-white/80 sm:left-8">
          Peyto Lake, Banff National Park
        </p>
      </section>
    </>
  );
}
