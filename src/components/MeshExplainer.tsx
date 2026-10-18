"use client";

import { Radio, RefreshCw, Globe, ShieldCheck } from "lucide-react";

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
        {[[30,20],[80,12],[150,8],[250,18],[350,6],[430,14],[510,10],[560,22],[55,40],[190,32],[320,28],[480,35]].map((star, i)=>(
          <circle key={i} cx={star[0]} cy={star[1]} r="1" fill="#F8FAFC" opacity={0.35}/>
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

const features = [
  {
    icon: Radio,
    title: "Decentralised by design",
    body: "No server, no cloud, no single point of failure. The network lives inside the devices themselves, in your pocket on every trail.",
  },
  {
    icon: RefreshCw,
    title: "Self-healing network",
    body: "When a node moves out of range, the mesh automatically discovers new routes. The person at the back of the group stays connected to the front without lifting a finger.",
  },
  {
    icon: Globe,
    title: "Open-source foundation",
    body: "Built on the global Meshtastic protocol. Hundreds of engineers improve the firmware every month. WildLink contributes a professional, field-hardened implementation for Canadian Rockies conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Network effect, safer trails",
    body: "Every new WildLink device on a trail extends coverage for everyone. As adoption grows across Kananaskis and Banff, we are collectively building infrastructure that no corporation controls.",
  },
];

const meshtasticFacts = [
  { value: "10k+", label: "Active Meshtastic contributors globally" },
  { value: "LoRa", label: "915 MHz, ISM band, no licence required" },
  { value: "MIT", label: "Open-source licence, full transparency" },
];

export default function MeshExplainer() {
  return (
    <section id="mesh" className="bg-stone py-20 text-forest lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            The mesh revolution: strength in numbers.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-forest/75">
            Each WildLink device is not just a receiver, it is a relay. Every person
            in your group silently extends the network for everyone else. No towers.
            No subscriptions. No single point of failure.
          </p>
        </div>

        <figure className="mt-14 overflow-hidden rounded-2xl bg-forest p-4 sm:p-8 lg:p-10">
          <figcaption className="mb-6 text-center text-sm font-medium text-alpine/70">
            The digital relay race: a mountain valley, no cell signal
          </figcaption>
          <RelayDiagram />
        </figure>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t-2 border-forest pt-5">
              <Icon size={22} className="mb-4 text-lake" />
              <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-forest/75">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-2xl border border-forest/15 bg-mist p-8 lg:grid-cols-[1.2fr_1fr] lg:p-10">
          <div>
            <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Built on Meshtastic, the global mesh standard.
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-forest/75">
              Meshtastic is a worldwide open-source project with thousands of active
              contributors. It is not a proprietary &quot;black box&quot;: it is a
              transparent, auditable protocol that engineers across the globe are
              improving every day.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-forest/70">
              WildLink contributes a professionally engineered, field-hardened
              implementation of this standard, optimised for the terrain, climate,
              and safety requirements of the Canadian Rockies.
            </p>
          </div>
          <dl className="flex flex-col justify-center gap-5">
            {meshtasticFacts.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-4">
                <dt className="w-20 shrink-0 font-display text-3xl font-semibold">{value}</dt>
                <dd className="text-forest/75">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
