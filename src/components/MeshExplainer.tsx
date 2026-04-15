"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Radio, RefreshCw, Globe, ShieldCheck, Zap, ChevronRight } from "lucide-react";

// ─── Relay Race SVG ───────────────────────────────────────────────────────────

function RelayDiagram() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 580 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="Mesh relay race diagram — hikers passing signal around a mountain ridge"
      >
        {/* ── Background mountains ── */}
        <defs>
          <radialGradient id="nodeGlowOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowGreen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky gradient */}
        <rect width="580" height="300" fill="#0a1810" />

        {/* Stars */}
        {[[30,20],[80,12],[150,8],[250,18],[350,6],[430,14],[510,10],[560,22],[55,40],[190,32],[320,28],[480,35]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1" fill="#F8FAFC" opacity={0.2+Math.random()*0.3}/>
        ))}

        {/* Mountains */}
        <polygon points="0,300 0,180 60,120 110,160 140,300" fill="#122018" />
        <polygon points="100,300 150,140 200,170 230,300" fill="#0e1c14" />
        {/* Central blocking ridge */}
        <polygon points="230,300 270,80 310,300" fill="#1a2e20" stroke="#2a4a2a" strokeWidth="1"/>
        <polygon points="290,300 330,110 370,300" fill="#162819" />
        <polygon points="360,300 400,150 450,120 490,160 520,300" fill="#122018" />
        <polygon points="480,300 530,140 580,160 580,300" fill="#0e1c14" />

        {/* Ground */}
        <rect x="0" y="285" width="580" height="15" fill="#0b1a10" />

        {/* ── Direct path (blocked) ── */}
        <line x1="72" y1="155" x2="495" y2="155" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35" />
        {/* Block marker on ridge */}
        <circle cx="290" cy="155" r="10" fill="#EF444418" stroke="#EF444440" strokeWidth="1.5" />
        <text x="290" y="160" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="700">✕</text>

        {/* ── Mesh hop path ── */}
        {/* A → B */}
        <line x1="72" y1="155" x2="175" y2="200" stroke="#FF5C00" strokeWidth="2" opacity="0.85">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        {/* B → C */}
        <line x1="175" y1="200" x2="385" y2="215" stroke="#818cf8" strokeWidth="2" opacity="0.8">
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2.4s" repeatCount="indefinite" />
        </line>
        {/* C → D */}
        <line x1="385" y1="215" x2="495" y2="160" stroke="#4ade80" strokeWidth="2" opacity="0.85">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="2s" repeatCount="indefinite" />
        </line>

        {/* Animated signal dots */}
        {/* Dot A→B */}
        <circle r="4" fill="#FF5C00" opacity="0.9">
          <animateMotion dur="2s" repeatCount="indefinite" path="M72,155 L175,200" />
        </circle>
        {/* Dot B→C */}
        <circle r="4" fill="#818cf8" opacity="0.9">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.4s" path="M175,200 L385,215" />
        </circle>
        {/* Dot C→D */}
        <circle r="4" fill="#4ade80" opacity="0.9">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path="M385,215 L495,160" />
        </circle>

        {/* ── Nodes ── */}
        {/* Node A — Hiker / Base */}
        <circle cx="72" cy="155" r="22" fill="url(#nodeGlowOrange)" />
        <circle cx="72" cy="155" r="11" fill="#1a2e1a" stroke="#FF5C00" strokeWidth="2" />
        {/* Hiker icon A */}
        <circle cx="72" cy="148" r="3.5" fill="#FF5C00" />
        <line x1="72" y1="152" x2="72" y2="162" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="157" x2="79" y2="157" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="162" x2="67" y2="168" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="162" x2="77" y2="168" stroke="#FF5C00" strokeWidth="2" strokeLinecap="round" />
        <text x="72" y="185" textAnchor="middle" fill="#FF5C00" fontSize="9" fontWeight="700" fontFamily="monospace">Base Camp</text>

        {/* Node B — Hiker relay 1 */}
        <circle cx="175" cy="200" r="20" fill="url(#nodeGlowBlue)" />
        <circle cx="175" cy="200" r="10" fill="#1a2e1a" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="175" cy="193" r="3" fill="#818cf8" />
        <line x1="175" y1="196" x2="175" y2="205" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="169" y1="200" x2="181" y2="200" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="175" y1="205" x2="171" y2="211" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="175" y1="205" x2="179" y2="211" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <text x="175" y="225" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="700" fontFamily="monospace">Hiker B</text>
        <text x="175" y="234" textAnchor="middle" fill="#818cf840" fontSize="7" fontFamily="monospace">relay</text>

        {/* Node C — Hiker relay 2 */}
        <circle cx="385" cy="215" r="20" fill="url(#nodeGlowBlue)" />
        <circle cx="385" cy="215" r="10" fill="#1a2e1a" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="385" cy="208" r="3" fill="#818cf8" />
        <line x1="385" y1="211" x2="385" y2="220" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="379" y1="215" x2="391" y2="215" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="385" y1="220" x2="381" y2="226" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="385" y1="220" x2="389" y2="226" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <text x="385" y="240" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="700" fontFamily="monospace">Hiker C</text>
        <text x="385" y="249" textAnchor="middle" fill="#818cf840" fontSize="7" fontFamily="monospace">relay</text>

        {/* Node D — Destination */}
        <circle cx="495" cy="160" r="22" fill="url(#nodeGlowGreen)" />
        <circle cx="495" cy="160" r="11" fill="#1a2e1a" stroke="#4ade80" strokeWidth="2" />
        <circle cx="495" cy="153" r="3.5" fill="#4ade80" />
        <line x1="495" y1="157" x2="495" y2="167" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        <line x1="488" y1="162" x2="502" y2="162" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        <line x1="495" y1="167" x2="490" y2="173" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        <line x1="495" y1="167" x2="500" y2="173" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        <text x="495" y="190" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="700" fontFamily="monospace">Person A</text>

        {/* "3 hops" label */}
        <rect x="225" y="240" width="130" height="20" rx="6" fill="#ffffff06" stroke="#ffffff10" />
        <text x="290" y="254" textAnchor="middle" fill="#F8FAFC60" fontSize="8" fontFamily="monospace">
          Signal reaches in 3 hops — &lt; 1 sec
        </text>

        {/* Hop labels */}
        <text x="108" y="190" fill="#FF5C00" fontSize="7" fontFamily="monospace" opacity="0.7">hop 1</text>
        <text x="265" y="220" fill="#818cf8" fontSize="7" fontFamily="monospace" opacity="0.7">hop 2</text>
        <text x="435" y="198" fill="#4ade80" fontSize="7" fontFamily="monospace" opacity="0.7">hop 3</text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
        {[
          { color: "bg-[#FF5C00]", label: "Base Camp / Sender" },
          { color: "bg-[#818cf8]", label: "Relay Node" },
          { color: "bg-emerald-400", label: "Destination" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-xs text-[#F8FAFC]/45">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What is Meshtastic?",
    a: "An open-source protocol that lets small, low-power radio devices form a self-organising network — without any cell towers, Wi-Fi, or satellites. Thousands of engineers worldwide contribute to it every day, making it more reliable with every update.",
  },
  {
    q: "Does every device become a relay?",
    a: "Yes. Every WildLink device in your group automatically acts as a relay for others. The more devices on the trail, the wider and stronger the coverage. You do not configure anything — the mesh self-organises.",
  },
  {
    q: "What happens if one device goes offline?",
    a: "The mesh detects the gap within seconds and routes around it. Unlike a cell tower — which causes a total blackout if it fails — losing one WildLink node simply changes the path, not the outcome.",
  },
  {
    q: "Is WildLink compatible with other Meshtastic devices?",
    a: "Yes. WildLink is built on the Meshtastic standard and can communicate with any compatible device on the same channel configuration. You are not locked into our hardware ecosystem.",
  },
];

// ─── Feature cards ────────────────────────────────────────────────────────────

const features = [
  {
    icon: Radio,
    title: "Decentralised by Design",
    body: "No server, no cloud, no single point of failure. The network lives inside the devices themselves — in your pocket on every trail.",
  },
  {
    icon: RefreshCw,
    title: "Self-Healing Network",
    body: "When a node moves out of range, the mesh automatically discovers new routes. The person at the back of the group stays connected to the front without lifting a finger.",
  },
  {
    icon: Globe,
    title: "Open-Source Foundation",
    body: "Built on the global Meshtastic protocol. Hundreds of engineers improve the firmware every month. WildLink contributes a professional, field-hardened implementation for Canadian Rockies conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Network Effect = Safer Trails",
    body: "Every new WildLink device on a trail extends coverage for everyone. As adoption grows across Kananaskis and Banff, we are collectively building infrastructure that no corporation controls.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MeshExplainer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="mesh"
      className="relative py-24 lg:py-32 bg-[#0F1F16] overflow-hidden"
      ref={ref}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#FF5C00]" />
            <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">
              How the Network Works
            </span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            The Mesh Revolution:
            <br />
            <span className="text-[#FF5C00]">Strength in Numbers.</span>
          </h2>

          <p className="text-[#F8FAFC]/60 text-lg leading-relaxed">
            Each WildLink device is not just a receiver — it is a relay. Every person in
            your group silently extends the network for everyone else. No towers.
            No subscriptions. No single point of failure.
          </p>
        </motion.div>

        {/* Relay diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 bg-white/3 border border-white/10 rounded-2xl p-6 lg:p-10"
        >
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#F8FAFC]/40 uppercase tracking-widest">
              <Zap size={12} className="text-[#FF5C00]" />
              The Digital Relay Race — a mountain valley, no cell signal
            </span>
          </div>
          <RelayDiagram />
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {features.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07 }}
              className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-[#FF5C00]/25 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center mb-4 group-hover:bg-[#FF5C00]/15 transition-colors">
                <Icon size={18} className="text-[#FF5C00]" />
              </div>
              <h3 className="text-sm font-bold text-[#F8FAFC] mb-2 leading-snug">{title}</h3>
              <p className="text-xs text-[#F8FAFC]/50 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>

        {/* Two-column: Meshtastic callout + FAQ */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Meshtastic badge — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 bg-gradient-to-b from-emerald-900/20 to-emerald-900/5 border border-emerald-500/20 rounded-2xl p-7 flex flex-col gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Open Source</span>
              </div>
              <h3 className="text-xl font-black text-[#F8FAFC] mb-3">
                Built on Meshtastic —<br />
                <span className="text-emerald-400">the global mesh standard.</span>
              </h3>
              <p className="text-sm text-[#F8FAFC]/55 leading-relaxed">
                Meshtastic is a worldwide open-source project with thousands of
                active contributors. It is not a proprietary "black box" — it is
                a transparent, auditable protocol that engineers across the globe
                are improving every day.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { value: "10k+",  label: "Active Meshtastic contributors globally" },
                { value: "LoRa",  label: "915 MHz — ISM band, no licence required" },
                { value: "MIT",   label: "Open-source licence — full transparency" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="font-mono text-sm font-black text-emerald-400 w-12 flex-shrink-0">{value}</span>
                  <span className="text-xs text-[#F8FAFC]/45">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#F8FAFC]/35 leading-relaxed border-t border-white/8 pt-4">
              WildLink contributes a professionally engineered, field-hardened
              implementation of this standard — optimised specifically for the
              terrain, climate, and safety requirements of the Canadian Rockies.
            </p>
          </motion.div>

          {/* FAQ — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            <h3 className="text-sm font-black text-[#F8FAFC]/50 uppercase tracking-widest mb-2">
              Common Questions
            </h3>
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-white/15 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <ChevronRight size={14} className="text-[#FF5C00] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-[#F8FAFC]">{q}</span>
                </div>
                <p className="text-sm text-[#F8FAFC]/50 leading-relaxed pl-5">{a}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
