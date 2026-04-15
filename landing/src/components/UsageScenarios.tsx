"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Mountain, BellRing } from "lucide-react";
import Image from "next/image";

const SCENARIOS = [
  {
    icon: Users,
    tag: "Family Mode",
    tagColor: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    title: "Green dots, not panic.",
    highlight: "Imagine your kids exploring a creek 400 meters away.",
    body: "You can't see them, but on WildLink, they are a steady green dot on your map. If they press SOS, your phone transforms into a rescue beacon.",
    detail:
      "Parents get instant audio + haptic alerts the moment a child wanders beyond 500m. No app required on the child's side — just the device clipped to their pack.",
    stat: { value: "500m", label: "Guardian Alert threshold" },
  },
  {
    icon: Mountain,
    tag: "Group Mode",
    tagColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    title: "Heavy fog? Stay together.",
    highlight: "Visibility drops to 5 meters on the Highwood Pass.",
    body: "Your GPS trail and group positions stay pinned on your offline map. No signal. No guessing. Everyone knows where everyone is.",
    detail:
      "The mesh relay means the hiker at the back can ping the leader at the front — even if there's a ridgeline between them and two people acting as relays.",
    stat: { value: "Zero", label: "Monthly fees, ever" },
  },
  {
    icon: BellRing,
    tag: "Guardian Alert",
    tagColor: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    title: "Hear it before you need to worry.",
    highlight: "The moment someone leaves the 500m radius, every group device fires.",
    body: "Audio chirp. Haptic buzz. A red alert on the map. Not a silent notification — a real alert, because the backcountry doesn't wait for you to check your phone.",
    detail:
      "Guardian Alert is configurable: 200m for kids in campsites, 800m for experienced groups on open terrain. No cell signal needed — it runs on the mesh.",
    stat: { value: "72h", label: "Battery per device" },
  },
];

export default function UsageScenarios() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="scenarios" className="relative py-24 lg:py-36 bg-[#0a1810]" ref={ref}>
      <div className="absolute inset-0">
        <Image
          src="/images/kananaskis-trail.jpg"
          alt="Kananaskis hiking trail, Alberta"
          fill
          className="object-cover object-center opacity-10"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F16]/95 to-[#0a1810]/98" />
      </div>

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
            <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">Scenarios</span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            Built for Every Way
            <br />
            <span className="text-[#FF5C00]">You Use the Wild.</span>
          </h2>
          <p className="text-[#F8FAFC]/60 text-lg">
            From families at the lake to summit parties in the fog — WildLink keeps
            everyone on the same map.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {SCENARIOS.map((scenario, idx) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={scenario.tag}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="group relative bg-white/4 hover:bg-white/6 border border-white/10 hover:border-white/20 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
              >
                {/* Icon + tag */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#F8FAFC]/70" />
                  </div>
                  <span className={`text-xs font-semibold border px-3 py-1 rounded-full ${scenario.tagColor}`}>
                    {scenario.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-[#F8FAFC] leading-tight">
                  {scenario.title}
                </h3>

                {/* Highlight quote */}
                <div className="border-l-2 border-[#FF5C00] pl-4">
                  <p className="text-sm text-[#F8FAFC]/80 font-medium leading-relaxed italic">
                    {scenario.highlight}
                  </p>
                </div>

                {/* Main copy */}
                <p className="text-[#F8FAFC]/60 text-sm leading-relaxed">
                  {scenario.body}
                </p>

                {/* Detail */}
                <p className="text-[#F8FAFC]/40 text-xs leading-relaxed">
                  {scenario.detail}
                </p>

                {/* Stat */}
                <div className="mt-auto pt-5 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-[#FF5C00]">{scenario.stat.value}</div>
                    <div className="text-xs text-[#F8FAFC]/40 mt-0.5">{scenario.stat.label}</div>
                  </div>
                  <a
                    href="#waitlist"
                    className="text-xs font-semibold text-[#FF5C00] hover:underline flex items-center gap-1"
                  >
                    Join Beta →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-[#F8FAFC]/50 text-base leading-relaxed">
            WildLink works in{" "}
            <span className="text-[#F8FAFC] font-semibold">Banff, Jasper, Kananaskis, and anywhere else</span>{" "}
            the Canadian Rockies take you — including where your Garmin satellite subscription
            doesn&apos;t matter because you can&apos;t afford it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
