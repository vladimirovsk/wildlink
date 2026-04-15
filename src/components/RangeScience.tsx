"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, FlaskConical, Signal, AlertTriangle, ExternalLink } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const truthTable = [
  {
    env: "Alpine Meadow",
    conditions: "Line-of-Sight, dry, ridge elevation",
    range: "10 – 15 km",
    snr: "+15 dB",
    sf: "SF7",
    notes: "Optimal LoRa conditions. Hata/ITM model predicts ~110 dB path loss at 10 km.",
    quality: "excellent",
  },
  {
    env: "Open Trail",
    conditions: "Partial LoS, mixed terrain, summer",
    range: "2 – 5 km",
    snr: "+8 dB",
    sf: "SF9",
    notes: "Typical summer hiking in K-Country. Dominant loss: ground reflection + sparse canopy.",
    quality: "good",
  },
  {
    env: "Dense Boreal Forest",
    conditions: "No LoS, closed canopy, dry foliage",
    range: "800 m – 1.5 km",
    snr: "+3 dB",
    sf: "SF11",
    notes: "Forest attenuation ≈ 0.1–0.3 dB/m. Link budget consumed at ~1.2 km.",
    quality: "moderate",
  },
  {
    env: "Dense Forest – Post-Rain",
    conditions: "No LoS, wet conifer needles, high humidity",
    range: "500 – 900 m",
    snr: "+1 dB",
    sf: "SF12",
    notes: "Wet foliage raises attenuation to 0.3–0.5 dB/m. Basis for 500 m Guardian alert.",
    quality: "low",
  },
  {
    env: "Rocky Ravine / RF Shadow",
    conditions: "Topographic blockage, ridge diffraction loss",
    range: "300 – 700 m",
    snr: "0 dB",
    sf: "SF12",
    notes: "Fresnel zone fully obstructed. Single-hop range limit; mesh relay recommended.",
    quality: "critical",
  },
];

const qualityMeta: Record<string, { bar: string; label: string }> = {
  excellent: { bar: "bg-emerald-400",   label: "text-emerald-400" },
  good:      { bar: "bg-emerald-500/70", label: "text-emerald-500" },
  moderate:  { bar: "bg-yellow-400",    label: "text-yellow-400" },
  low:       { bar: "bg-orange-400",    label: "text-orange-400" },
  critical:  { bar: "bg-red-400",       label: "text-red-400" },
};

const references = [
  {
    code: "AN1200.22",
    title: "LoRa Modem Designer's Guide",
    author: "Semtech Corporation",
    note: "Primary reference for link budget methodology and SF/BW selection.",
  },
  {
    code: "AN1200.28",
    title: "LoRa Packet Error Rate and Sensitivity",
    author: "Semtech Corporation",
    note: "Empirical sensitivity values: −148 dBm at SF12/125 kHz BW.",
  },
  {
    code: "ITM / Longley-Rice",
    title: "Irregular Terrain Model",
    author: "NTIA / ITS",
    note: "Adapted for 915 MHz propagation over complex boreal topography.",
  },
  {
    code: "Hata Model",
    title: "Empirical Path Loss for Mobile Communications",
    author: "Masaharu Hata, 1980",
    note: "Extended Hata applied to sub-1 GHz outdoor propagation baseline.",
  },
];

// ─── Moisture SVG Diagram ─────────────────────────────────────────────────────

function MoistureDiagram() {
  return (
    <div className="bg-[#0a1a0e] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/8 px-5 py-3 flex items-center gap-2">
        <FlaskConical size={13} className="text-[#FF5C00]" />
        <span className="font-mono text-[11px] text-[#F8FAFC]/50 uppercase tracking-widest">
          FIG. 1 — Wet Foliage Dielectric Attenuation · 915 MHz
        </span>
      </div>

      <svg
        viewBox="0 0 520 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="Moisture attenuation diagram"
      >
        {/* ── Left panel: DRY ── */}
        {/* Panel background */}
        <rect x="10" y="10" width="235" height="260" rx="8" fill="#0d1f14" stroke="#ffffff10" strokeWidth="1" />
        <text x="118" y="32" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="10" fontWeight="700">
          DRY CONDITIONS
        </text>
        <text x="118" y="45" textAnchor="middle" fill="#ffffff40" fontFamily="monospace" fontSize="8">
          attenuation ≈ 0.1 dB/m
        </text>

        {/* Tree trunk left */}
        <rect x="95" y="160" width="10" height="80" rx="2" fill="#2d4a2a" />
        {/* Dry foliage (sparse triangles) */}
        <polygon points="100,80 70,155 130,155" fill="#1e3d1a" stroke="#2d5528" strokeWidth="1" />
        <polygon points="100,105 75,160 125,160" fill="#1a3517" />
        {/* Sparse foliage dots */}
        <circle cx="85" cy="100" r="3" fill="#2d5528" opacity="0.6" />
        <circle cx="115" cy="110" r="2.5" fill="#2d5528" opacity="0.5" />
        <circle cx="78" cy="125" r="2" fill="#2d5528" opacity="0.4" />
        <circle cx="122" cy="130" r="3" fill="#2d5528" opacity="0.5" />

        {/* Signal waves left — passing through */}
        {/* Source dot */}
        <circle cx="28" cy="130" r="4" fill="#FF5C00" />
        <text x="28" y="148" textAnchor="middle" fill="#FF5C00" fontFamily="monospace" fontSize="7">TX</text>
        {/* Wave arcs */}
        {[14, 22, 30].map((r, i) => (
          <path
            key={r}
            d={`M ${28 + r} 130 A ${r} ${r} 0 0 0 ${28 + r} 130.1`}
            stroke="#FF5C00"
            strokeWidth="1"
            opacity={0.3 + i * 0.15}
          />
        ))}
        {/* Signal arrows through tree */}
        <line x1="42" y1="122" x2="185" y2="122" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
        <line x1="42" y1="130" x2="185" y2="130" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.9" />
        <line x1="42" y1="138" x2="185" y2="138" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
        {/* Arrow heads */}
        <polygon points="185,119 192,122 185,125" fill="#FF5C00" opacity="0.9" />
        <polygon points="185,127 192,130 185,133" fill="#FF5C00" opacity="0.9" />
        <polygon points="185,135 192,138 185,141" fill="#FF5C00" opacity="0.7" />
        {/* RX dot */}
        <circle cx="205" cy="130" r="4" fill="#4ade80" />
        <text x="205" y="148" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="7">RX</text>

        {/* Loss label */}
        <rect x="55" y="200" width="120" height="24" rx="4" fill="#4ade8015" stroke="#4ade8030" />
        <text x="115" y="216" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="9" fontWeight="700">
          Loss: ~10–30 dB
        </text>
        <text x="118" y="242" textAnchor="middle" fill="#ffffff30" fontFamily="monospace" fontSize="7">
          Range: 800 m – 1.5 km
        </text>

        {/* ── Right panel: WET ── */}
        <rect x="275" y="10" width="235" height="260" rx="8" fill="#0d1a1a" stroke="#ffffff10" strokeWidth="1" />
        <text x="392" y="32" textAnchor="middle" fill="#fb923c" fontFamily="monospace" fontSize="10" fontWeight="700">
          POST-RAIN · WET FOLIAGE
        </text>
        <text x="392" y="45" textAnchor="middle" fill="#ffffff40" fontFamily="monospace" fontSize="8">
          attenuation ≈ 0.3 – 0.5 dB/m
        </text>

        {/* Tree trunk right */}
        <rect x="365" y="160" width="10" height="80" rx="2" fill="#2d4a2a" />
        {/* Wet foliage — denser */}
        <polygon points="370,80 335,155 405,155" fill="#1e3d1a" stroke="#2d5528" strokeWidth="1" />
        <polygon points="370,105 340,165 400,165" fill="#1a3517" />
        {/* Water droplets on needles */}
        {[
          [350, 95], [362, 88], [378, 92], [390, 98],
          [344, 115], [358, 110], [372, 107], [386, 112], [396, 118],
          [340, 133], [354, 128], [368, 125], [382, 130], [394, 136],
          [348, 148], [362, 144], [376, 141], [388, 147],
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="2.5" ry="3.5" fill="#38bdf8" opacity="0.55" />
        ))}
        {/* Rain drops above */}
        {[[345,65],[358,58],[372,62],[385,55],[395,68]].map(([cx,cy],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="1.5" ry="4" fill="#7dd3fc" opacity="0.35" />
        ))}

        {/* Signal waves right — attenuated */}
        <circle cx="293" cy="130" r="4" fill="#FF5C00" />
        <text x="293" y="148" textAnchor="middle" fill="#FF5C00" fontFamily="monospace" fontSize="7">TX</text>
        {/* Waves */}
        {[14, 22, 30].map((r, i) => (
          <path
            key={r}
            d={`M ${293 + r} 130 A ${r} ${r} 0 0 0 ${293 + r} 130.1`}
            stroke="#FF5C00"
            strokeWidth="1"
            opacity={0.3 + i * 0.15}
          />
        ))}
        {/* Attenuated signal - fades */}
        <line x1="307" y1="122" x2="390" y2="122" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
        <line x1="307" y1="130" x2="390" y2="130" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.5" />
        <line x1="307" y1="138" x2="390" y2="138" stroke="#FF5C00" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
        {/* Fade-out after tree */}
        <line x1="395" y1="122" x2="450" y2="122" stroke="#FF5C00" strokeWidth="1" strokeDasharray="2 6" opacity="0.25" />
        <line x1="395" y1="130" x2="450" y2="130" stroke="#FF5C00" strokeWidth="1" strokeDasharray="2 6" opacity="0.2" />
        <line x1="395" y1="138" x2="450" y2="138" stroke="#FF5C00" strokeWidth="1" strokeDasharray="2 6" opacity="0.15" />
        {/* Weak RX */}
        <circle cx="460" cy="130" r="3" fill="#4ade80" opacity="0.4" />
        <text x="460" y="148" textAnchor="middle" fill="#4ade8060" fontFamily="monospace" fontSize="7">RX?</text>
        {/* Absorption markers on tree */}
        {[[338,122],[352,126],[366,121],[380,128]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#fb923c" opacity="0.5" />
        ))}

        {/* Loss label */}
        <rect x="320" y="200" width="140" height="24" rx="4" fill="#ef444415" stroke="#ef444430" />
        <text x="390" y="216" textAnchor="middle" fill="#fb923c" fontFamily="monospace" fontSize="9" fontWeight="700">
          Loss: ~40–70 dB
        </text>
        <text x="392" y="242" textAnchor="middle" fill="#ffffff30" fontFamily="monospace" fontSize="7">
          Range: 500 m – 900 m  ← Guardian threshold
        </text>

        {/* Divider label */}
        <text x="260" y="140" textAnchor="middle" fill="#ffffff20" fontFamily="monospace" fontSize="11" fontWeight="700">
          VS
        </text>

        {/* Ground line */}
        <line x1="18" y1="240" x2="242" y2="240" stroke="#ffffff08" strokeWidth="1" />
        <line x1="283" y1="240" x2="502" y2="240" stroke="#ffffff08" strokeWidth="1" />
      </svg>

      {/* Caption */}
      <div className="border-t border-white/8 px-5 py-3">
        <p className="font-mono text-[10px] text-[#F8FAFC]/35 leading-relaxed">
          Conifer needle surfaces (Picea glauca, Abies lasiocarpa) accumulate free water after precipitation,
          increasing the complex permittivity of the canopy medium and raising 915 MHz absorption.
          Canadian Rocky Mountain foothills receive avg. 410 mm annual precipitation — with peak needle moisture in May–June.
        </p>
      </div>
    </div>
  );
}

// ─── Fresnel / Ridge SVG ──────────────────────────────────────────────────────

function FresnelDiagram() {
  return (
    <div className="bg-[#0a1a0e] border border-white/10 rounded-2xl overflow-hidden">
      <div className="border-b border-white/8 px-5 py-3 flex items-center gap-2">
        <Signal size={13} className="text-[#FF5C00]" />
        <span className="font-mono text-[11px] text-[#F8FAFC]/50 uppercase tracking-widest">
          FIG. 2 — RF Shadow & Mesh Hop · Kananaskis Ridge Topography
        </span>
      </div>

      <svg
        viewBox="0 0 560 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="Fresnel zone and mesh hop diagram"
      >
        {/* Sky */}
        <rect x="0" y="0" width="560" height="200" fill="#0a1a0e" />

        {/* Mountains */}
        {/* Left ridge */}
        <polygon points="0,200 0,100 80,40 130,80 160,200" fill="#1a3020" stroke="#2a4a30" strokeWidth="1" />
        {/* Centre ridge (blocker) */}
        <polygon points="180,200 220,60 260,200" fill="#1e3824" stroke="#2d5030" strokeWidth="1" />
        {/* Right ridge */}
        <polygon points="380,200 420,50 480,90 560,130 560,200" fill="#1a3020" stroke="#2a4a30" strokeWidth="1" />
        {/* Valley floor */}
        <rect x="0" y="185" width="560" height="15" fill="#132218" />

        {/* ── Direct path (blocked) ── */}
        <line x1="68" y1="55" x2="415" y2="68" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5" />
        {/* Block marker */}
        <circle cx="225" cy="60" r="8" fill="#EF444420" stroke="#EF444450" strokeWidth="1.5" />
        <text x="225" y="64" textAnchor="middle" fill="#EF4444" fontFamily="monospace" fontSize="9" fontWeight="700">✕</text>
        <text x="225" y="50" textAnchor="middle" fill="#EF444490" fontFamily="monospace" fontSize="7">BLOCKED</text>

        {/* ── Mesh hop path ── */}
        {/* Hop 1: TX to relay */}
        <line x1="68" y1="55" x2="195" y2="148" stroke="#4ade80" strokeWidth="1.5" opacity="0.8" />
        {/* Hop 2: relay to relay */}
        <line x1="195" y1="148" x2="310" y2="168" stroke="#4ade80" strokeWidth="1.5" opacity="0.8" />
        {/* Hop 3: relay to RX */}
        <line x1="310" y1="168" x2="415" y2="68" stroke="#4ade80" strokeWidth="1.5" opacity="0.8" />

        {/* TX node */}
        <circle cx="68" cy="55" r="7" fill="#FF5C00" />
        <text x="68" y="59" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="7" fontWeight="700">TX</text>
        <text x="68" y="43" textAnchor="middle" fill="#FF5C00" fontFamily="monospace" fontSize="7">Node A</text>

        {/* Relay 1 */}
        <circle cx="195" cy="148" r="6" fill="#6366f1" stroke="#818cf8" strokeWidth="1" />
        <text x="195" y="152" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="6" fontWeight="700">R1</text>
        <text x="195" y="163" textAnchor="middle" fill="#818cf8" fontFamily="monospace" fontSize="6">relay</text>

        {/* Relay 2 */}
        <circle cx="310" cy="168" r="6" fill="#6366f1" stroke="#818cf8" strokeWidth="1" />
        <text x="310" y="172" textAnchor="middle" fill="white" fontFamily="monospace" fontSize="6" fontWeight="700">R2</text>
        <text x="310" y="183" textAnchor="middle" fill="#818cf8" fontFamily="monospace" fontSize="6">relay</text>

        {/* RX node */}
        <circle cx="415" cy="68" r="7" fill="#4ade80" />
        <text x="415" y="72" textAnchor="middle" fill="#0a1810" fontFamily="monospace" fontSize="7" fontWeight="700">RX</text>
        <text x="415" y="56" textAnchor="middle" fill="#4ade80" fontFamily="monospace" fontSize="7">Node B</text>

        {/* Fresnel zone ellipse around blocked path */}
        <ellipse cx="245" cy="62" rx="80" ry="18" stroke="#FF5C00" strokeWidth="0.75" strokeDasharray="3 3" fill="none" opacity="0.3" />
        <text x="330" y="58" fill="#FF5C00" fontFamily="monospace" fontSize="7" opacity="0.5">Fresnel r₁</text>

        {/* Hop labels */}
        <text x="126" y="106" fill="#4ade8080" fontFamily="monospace" fontSize="7" transform="rotate(-30, 126, 106)">hop 1</text>
        <text x="250" y="162" fill="#4ade8080" fontFamily="monospace" fontSize="7">hop 2</text>
        <text x="362" y="115" fill="#4ade8080" fontFamily="monospace" fontSize="7" transform="rotate(30, 362, 115)">hop 3</text>

        {/* Legend */}
        <line x1="20" y1="17" x2="40" y2="17" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
        <text x="44" y="21" fill="#EF444490" fontFamily="monospace" fontSize="7">Direct path (RF shadow)</text>
        <line x1="20" y1="30" x2="40" y2="30" stroke="#4ade80" strokeWidth="1.5" opacity="0.8" />
        <text x="44" y="34" fill="#4ade8090" fontFamily="monospace" fontSize="7">Mesh hop route</text>
      </svg>

      <div className="border-t border-white/8 px-5 py-3">
        <p className="font-mono text-[10px] text-[#F8FAFC]/35 leading-relaxed">
          Sharp quartzite ridges in Kananaskis and Banff create hard RF shadows. The first Fresnel zone
          radius at 915 MHz over 2 km is ≈ 18 m — easily obstructed by any ridge above the signal path.
          WildLink mesh nodes route automatically around topographic blockage without user intervention.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RangeScience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="range-science"
      className="relative py-24 lg:py-32 overflow-hidden"
      ref={ref}
      style={{ background: "#0b1c13" }}
    >
      {/* Graph-paper texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_80%_50%_at_50%_50%] from-transparent to-[#0b1c13]/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Paper header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          {/* Technical note metadata bar */}
          <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-1 bg-white/3 border border-white/10 rounded-xl px-5 py-2.5 mb-8 font-mono text-[10px] text-[#F8FAFC]/40 uppercase tracking-widest">
            <span className="text-[#FF5C00] font-bold">WL-TN-001</span>
            <span>Rev 1.2</span>
            <span>915 MHz LoRa · SX1262</span>
            <span>Author: S. Vladimirov</span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={10} />
              Technical Note
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#FF5C00]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">
                  Engineering Honesty
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight">
                Understanding
                <br />
                <span className="text-[#FF5C00]">Range & Reliability.</span>
              </h2>
            </div>

            <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
              <p className="text-[#F8FAFC]/60 text-sm leading-relaxed">
                Most hardware companies publish the best-case range from a mountain peak.
                We publish the number that keeps people safe — and explain exactly why.
                The figures below are grounded in the SX1262 link budget, established
                path-loss models (Hata / ITM), and direct field measurements
                in Kananaskis Country.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0" />
                <span className="font-mono text-[10px] text-yellow-400/70">
                  Range figures are worst-case engineering estimates, not marketing numbers.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Link Budget ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-6 mb-10"
        >
          {/* 915 MHz explanation */}
          <div className="bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col gap-5">
            <div>
              <span className="font-mono text-[10px] text-[#FF5C00] uppercase tracking-widest">
                § 1 — Frequency Selection
              </span>
              <h3 className="text-lg font-black text-[#F8FAFC] mt-2">
                Why 915 MHz?
              </h3>
            </div>
            <p className="text-sm text-[#F8FAFC]/60 leading-relaxed">
              915 MHz sits in the North American ISM (Industrial, Scientific, Medical) band —
              licence-free operation for devices with output ≤ +30 dBm. This frequency
              represents an engineering compromise: lower frequencies (&lt;433 MHz) offer
              marginally better diffraction around obstacles but are narrower-band and
              more congested; higher frequencies (&gt;2.4 GHz) deliver more bandwidth but
              suffer exponentially higher free-space path loss and foliage absorption.
            </p>
            <p className="text-sm text-[#F8FAFC]/60 leading-relaxed">
              At 915 MHz, LoRa with Spreading Factor 12 achieves a receiver sensitivity
              of <span className="font-mono text-[#F8FAFC]/85">−148 dBm</span> —
              one of the highest in any commercially available sub-GHz chipset
              (ref. Semtech AN1200.28). This is the floor that makes long-range
              mesh networking viable without satellite infrastructure.
            </p>
            <div className="flex gap-2 flex-wrap mt-auto">
              {["ISM Band", "Sub-GHz", "SNR −20 dB floor", "SF7–SF12"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] bg-[#FF5C00]/10 border border-[#FF5C00]/25 text-[#FF5C00]/80 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Link budget terminal block */}
          <div className="bg-[#060e08] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="border-b border-white/8 px-5 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] text-[#F8FAFC]/35 ml-2">
                link_budget.calc — SX1262 · SF12 · BW 125 kHz
              </span>
            </div>

            <div className="font-mono text-[11px] leading-6 p-5 flex-1 overflow-x-auto text-[#F8FAFC]/80 whitespace-pre">
              <span className="text-emerald-400/60"># Transmit chain{"\n"}</span>
              {"TX Power (SX1262 max)     "}<span className="text-[#FF5C00]">+22.0 dBm</span>{"\n"}
              {"Antenna gain (dipole)     "}<span className="text-[#FF5C00]"> +2.0 dBi</span>{"\n"}
              {"Cable / connector loss    "}<span className="text-[#FF5C00]"> -1.0 dB</span>{"\n"}
              {"                          ─────────────\n"}
              {"EIRP                      "}<span className="text-[#FF5C00]">+23.0 dBm</span>{"\n"}
              {"\n"}
              <span className="text-emerald-400/60"># Receive chain{"\n"}</span>
              {"RX Sensitivity (SF12)     "}<span className="text-yellow-400">-148.0 dBm</span>{"  ← AN1200.28\n"}
              {"RX Antenna gain           "}<span className="text-yellow-400">  +2.0 dBi</span>{"\n"}
              {"                          ─────────────\n"}
              {"MAX Allowable Path Loss   "}<span className="text-emerald-400">+173.0 dB</span>{"\n"}
              {"\n"}
              <span className="text-emerald-400/60"># Environment deductions{"\n"}</span>
              {"Forest attenuation (dry)  "}<span className="text-orange-400"> -30–90 dB</span>{"  (0.1–0.3 dB/m)\n"}
              {"Forest attenuation (wet)  "}<span className="text-red-400">-60–150 dB</span>{"  (0.3–0.5 dB/m)\n"}
              {"Fresnel obstruction       "}<span className="text-red-400">  -15–30 dB</span>{"  (ridge / ravine)\n"}
              {"                          ─────────────\n"}
              {"\n"}
              <span className="text-emerald-400/60"># Effective range estimate (Hata / ITM){"\n"}</span>
              {"Dense forest, dry:        "}<span className="text-emerald-400">800 m – 1.5 km</span>{"\n"}
              {"Dense forest, wet:        "}<span className="text-orange-400">500 m –  900 m</span>{"  ← Guardian alert\n"}
              {"RF shadow (no mesh):      "}<span className="text-red-400">300 m –  700 m</span>
            </div>
          </div>
        </motion.div>

        {/* ── Range Truth Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 bg-white/2 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="border-b border-white/8 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#FF5C00] uppercase tracking-widest font-bold">
                Table 1
              </span>
              <span className="font-mono text-[10px] text-[#F8FAFC]/40 uppercase tracking-widest">
                — Estimated Range by Terrain Type · 915 MHz LoRa SX1262
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#F8FAFC]/25">
              Model: Hata Extended / Longley-Rice ITM · Field-validated, Kananaskis Country AB
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["Environment", "Conditions", "Est. Range", "Link Margin", "SF", "Notes"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-mono text-[10px] text-[#F8FAFC]/35 uppercase tracking-widest font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {truthTable.map((row, i) => {
                  const meta = qualityMeta[row.quality];
                  return (
                    <tr
                      key={row.env}
                      className={`border-b border-white/5 transition-colors hover:bg-white/3 ${
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${meta.bar}`} />
                          <span className="font-semibold text-[#F8FAFC]/85 text-xs">{row.env}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#F8FAFC]/50">{row.conditions}</td>
                      <td className="px-4 py-3.5">
                        <span className={`font-mono text-xs font-bold ${meta.label}`}>{row.range}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs text-[#F8FAFC]/60">{row.snr}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#F8FAFC]/50">
                          {row.sf}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[10px] text-[#F8FAFC]/40 font-mono leading-relaxed max-w-xs">
                        {row.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-white/5">
            <p className="font-mono text-[9px] text-[#F8FAFC]/25">
              * All ranges assume bidirectional link (ACK required). Unidirectional broadcast may extend range by 15–20%.
              Values do not account for antenna polarisation mismatch. Measured at 1.5 m height above ground.
            </p>
          </div>
        </motion.div>

        {/* ── Diagrams ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="font-mono text-[10px] text-[#FF5C00] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-[#F8FAFC]/25">§ 2</span>
              Wet Foliage Attenuation — The Canadian Rockies Effect
            </div>
            <MoistureDiagram />
            <p className="text-xs text-[#F8FAFC]/45 leading-relaxed mt-4">
              The most significant and least-discussed variable in Canadian wilderness RF is
              precipitation-loaded foliage. Conifer needles hold free water as a surface film;
              at 915 MHz this film acts as a lossy dielectric, converting RF energy to thermal
              energy through resistive absorption. The transition from dry to post-rain forest
              can reduce effective link range by 30–40% — precisely the degradation that
              drives our 500 m Guardian Mode safety threshold.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="font-mono text-[10px] text-[#FF5C00] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-[#F8FAFC]/25">§ 3</span>
              Fresnel Zone & Mesh Routing
            </div>
            <FresnelDiagram />
            <p className="text-xs text-[#F8FAFC]/45 leading-relaxed mt-4">
              The Kananaskis and Banff ranges feature quartzite ridges with near-vertical
              faces that create hard RF shadows — the first Fresnel zone at 915 MHz over
              2 km has a radius of ≈ 18 m, easily blocked by any ridge crest. WildLink
              nodes in the mesh detect path degradation via RSSI/SNR monitoring and
              automatically route through intermediate nodes without user interaction,
              recovering connectivity in terrain where single-device systems simply fail.
            </p>
          </motion.div>
        </div>

        {/* ── References ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden"
        >
          <div className="border-b border-white/8 px-6 py-3 flex items-center gap-2">
            <BookOpen size={12} className="text-[#F8FAFC]/30" />
            <span className="font-mono text-[10px] text-[#F8FAFC]/35 uppercase tracking-widest">
              References & Standards
            </span>
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {references.map((ref) => (
              <div key={ref.code} className="px-6 py-5 flex gap-4">
                <span className="font-mono text-[10px] text-[#FF5C00] font-bold flex-shrink-0 mt-0.5 w-24">
                  [{ref.code}]
                </span>
                <div>
                  <div className="text-xs font-semibold text-[#F8FAFC]/70 mb-0.5">{ref.title}</div>
                  <div className="font-mono text-[10px] text-[#F8FAFC]/35 mb-1">{ref.author}</div>
                  <div className="text-[10px] text-[#F8FAFC]/40 leading-relaxed">{ref.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
            <p className="font-mono text-[9px] text-[#F8FAFC]/20">
              This document is a living technical note. Figures are updated as field data accumulates.
              Last revised: April 2026. Internal document ID: WL-TN-001-r1.2.
            </p>
            <a
              href="mailto:support@itcoder.ca?subject=WildLink%20Technical%20Inquiry"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#FF5C00]/60 hover:text-[#FF5C00] transition-colors"
            >
              <ExternalLink size={10} />
              Technical enquiries: support@itcoder.ca
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
