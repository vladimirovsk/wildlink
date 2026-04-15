"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "base" | "hiker" | "device";
  color: string;
}
interface Edge { from: string; to: string; }

// ── SOS mode data ─────────────────────────────────────────────────────────────
const SOS_NODES: Node[] = [
  { id: "base", x: 85, y: 50, label: "Base Station\n(Trailhead)", type: "base",   color: "#FF5C00" },
  { id: "h1",   x: 65, y: 30, label: "Sarah",                     type: "hiker",  color: "#34D399" },
  { id: "h2",   x: 50, y: 55, label: "Mike",                      type: "hiker",  color: "#34D399" },
  { id: "h3",   x: 35, y: 35, label: "Aiden",                     type: "hiker",  color: "#34D399" },
  { id: "h4",   x: 20, y: 60, label: "Priya",                     type: "hiker",  color: "#34D399" },
  { id: "h5",   x: 15, y: 25, label: "Deep (SOS)",                type: "device", color: "#EF4444" },
];
const SOS_EDGES: Edge[] = [
  { from: "base", to: "h1" },
  { from: "h1",   to: "h2" },
  { from: "h1",   to: "h3" },
  { from: "h2",   to: "h4" },
  { from: "h3",   to: "h5" },
  { from: "h4",   to: "h5" },
];
const SIGNAL_PATH = ["h5", "h3", "h1", "base"];

// ── Guardian mode data ────────────────────────────────────────────────────────
const GUARDIAN_NODES: Node[] = [
  { id: "parent", x: 72, y: 38, label: "Parent",  type: "base",  color: "#FF5C00" },
  { id: "g1",     x: 63, y: 28, label: "Alex",    type: "hiker", color: "#34D399" },
  { id: "g2",     x: 64, y: 50, label: "Jordan",  type: "hiker", color: "#34D399" },
];
const GUARDIAN_EDGES: Edge[] = [
  { from: "parent", to: "g1" },
  { from: "parent", to: "g2" },
  { from: "g1",     to: "g2" },
];
// Group center for the safe-zone circle
const GC = { x: 66, y: 39 };
const SAFE_R = 18;

// Emma's path: inside → boundary → outside. Alert triggers at step >= 2.
// In SVG coords: inside = (x-GC.x)²+(y-GC.y)² < SAFE_R²  (324)
const CHILD_PATH = [
  { x: 57, y: 36 }, // step 0: inside  (dist² = 81+9   = 90)
  { x: 53, y: 41 }, // step 1: inside  (dist² = 169+4  = 173, approaching)
  { x: 46, y: 47 }, // step 2: OUTSIDE (dist² = 400+64 = 464) → ALERT
  { x: 36, y: 52 }, // step 3: further
  { x: 22, y: 58 }, // step 4: far outside
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function MeshAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [mode, setMode] = useState<"sos" | "guardian">("sos");

  // SOS state
  const [sosCycle, setSosCycle]       = useState(0);
  const [activeSignal, setActiveSignal] = useState(-1);
  const [sosActive, setSosActive]     = useState(false);

  // Guardian state
  const [guardianCycle, setGuardianCycle] = useState(0);
  const [childStep, setChildStep]         = useState(0);
  const guardianAlert = childStep >= 2;
  const childPos = CHILD_PATH[childStep];

  // SOS animation
  useEffect(() => {
    if (!inView || mode !== "sos") {
      setSosActive(false);
      setActiveSignal(-1);
      return;
    }
    setSosActive(true);
    setActiveSignal(0);
    let step = 0;
    const iv = setInterval(() => {
      step++;
      if (step < SIGNAL_PATH.length) {
        setActiveSignal(step);
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setSosActive(false);
          setActiveSignal(-1);
          setTimeout(() => setSosCycle((c) => c + 1), 2000);
        }, 1000);
      }
    }, 700);
    return () => clearInterval(iv);
  }, [inView, mode, sosCycle]);

  // Guardian animation
  useEffect(() => {
    if (!inView || mode !== "guardian") {
      setChildStep(0);
      return;
    }
    setChildStep(0);
    let step = 0;
    const iv = setInterval(() => {
      step++;
      if (step < CHILD_PATH.length) {
        setChildStep(step);
      } else {
        clearInterval(iv);
        setTimeout(() => setGuardianCycle((c) => c + 1), 2500);
      }
    }, 900);
    return () => clearInterval(iv);
  }, [inView, mode, guardianCycle]);

  const handleMode = (m: "sos" | "guardian") => {
    if (m === mode) return;
    setMode(m);
    setSosActive(false);
    setActiveSignal(-1);
    setChildStep(0);
  };

  const getPos = (id: string) => {
    const n = SOS_NODES.find((n) => n.id === id);
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
  };

  // For motion.g translation of the child node
  const childStart = CHILD_PATH[0];
  const cdx = childPos.x - childStart.x;
  const cdy = childPos.y - childStart.y;

  const SOS_STATS = [
    { value: "5km",  label: "Range per hop",  sub: "Line of sight"    },
    { value: "< 1s", label: "SOS delivery",   sub: "Across full mesh" },
    { value: "∞",    label: "Network size",   sub: "Add more devices" },
  ];
  const GUARDIAN_STATS = [
    { value: "500m", label: "Alert threshold", sub: "Configurable"         },
    { value: "< 1s", label: "Alert delivery",  sub: "Audio + haptic"       },
    { value: "200m", label: "Kids mode",       sub: "Campsite safe radius"  },
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-[#0F1F16] overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810] via-[#0F1F16] to-[#0a1810]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#FF5C00]" />
            <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold">The Mesh</span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            No Single Point of Failure.
            <br />
            <span className="text-[#FF5C00]">Signal Hops Between Hikers.</span>
          </h2>
          <p className="text-[#F8FAFC]/60 text-lg">
            Every WildLink device acts as both a tracker and a relay. An SOS from the deepest
            point in the group reaches the base station in milliseconds — hopping through
            every device between them.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => handleMode("sos")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                mode === "sos"
                  ? "bg-[#EF4444] text-white shadow-lg shadow-red-500/20"
                  : "text-[#F8FAFC]/50 hover:text-[#F8FAFC]/80"
              }`}
            >
              SOS Demo
            </button>
            <button
              onClick={() => handleMode("guardian")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                mode === "guardian"
                  ? "bg-[#FF5C00] text-white shadow-lg shadow-orange-500/20"
                  : "text-[#F8FAFC]/50 hover:text-[#F8FAFC]/80"
              }`}
            >
              Guardian Mode
            </button>
          </div>
        </motion.div>

        {/* Animation container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/3 border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/kananaskis-panorama.jpg"
              alt="Kananaskis Country panorama"
              fill
              className="object-cover object-center opacity-20"
              quality={70}
            />
            <div className="absolute inset-0 bg-[#0F1F16]/70" />
          </div>

          <div className="relative aspect-[16/7] sm:aspect-[16/6]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 65"
              preserveAspectRatio="none"
            >
              {mode === "sos" ? (
                /* ── SOS mode ───────────────────────────────────────────────── */
                <>
                  {SOS_EDGES.map((edge) => {
                    const from = getPos(edge.from);
                    const to   = getPos(edge.to);
                    const isActive =
                      sosActive &&
                      SIGNAL_PATH.includes(edge.from) &&
                      SIGNAL_PATH.includes(edge.to);
                    return (
                      <g key={`${edge.from}-${edge.to}`}>
                        <line
                          x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                          stroke={isActive ? "#EF4444" : "#334155"}
                          strokeWidth={isActive ? "0.6" : "0.3"}
                          strokeOpacity={isActive ? 0.8 : 0.4}
                          strokeDasharray={isActive ? "none" : "2 2"}
                        />
                        {isActive && (
                          <circle r="0.8" fill="#EF4444">
                            <animate attributeName="cx" values={`${from.x};${to.x}`} dur="0.6s" repeatCount="indefinite" />
                            <animate attributeName="cy" values={`${from.y};${to.y}`} dur="0.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;1;0" dur="0.6s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {SOS_NODES.map((node) => {
                    const pathIdx = SIGNAL_PATH.indexOf(node.id);
                    const isReached = sosActive && pathIdx !== -1 && pathIdx <= activeSignal;
                    return (
                      <g key={node.id}>
                        {(isReached || node.id === "h5") && (
                          <circle cx={node.x} cy={node.y} r="3.5" fill="none"
                            stroke={node.id === "h5" ? "#EF4444" : node.id === "base" ? "#FF5C00" : "#34D399"}
                            strokeWidth="0.4" opacity="0.4"
                          >
                            <animate attributeName="r"       values="2.5;5;2.5" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle cx={node.x} cy={node.y} r="2.2"
                          fill={isReached ? node.color : "#1a2e22"}
                          stroke={node.color} strokeWidth="0.6"
                          opacity={isReached || !SIGNAL_PATH.includes(node.id) ? 1 : 0.5}
                        />
                        {node.type === "base" && (
                          <text x={node.x} y={node.y + 0.6} textAnchor="middle" fontSize="2"
                            fill={isReached ? "#0F1F16" : "#F8FAFC"} fontWeight="bold">⌂</text>
                        )}
                        <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="2.2"
                          fill={isReached ? node.color : "#F8FAFC"}
                          fillOpacity={isReached ? 1 : 0.5}
                          fontWeight={isReached ? "bold" : "normal"}
                        >
                          {node.label.split("\n")[0]}
                        </text>
                        {node.label.includes("\n") && (
                          <text x={node.x} y={node.y - 1.5} textAnchor="middle" fontSize="1.8"
                            fill={isReached ? node.color : "#F8FAFC"}
                            fillOpacity={isReached ? 1 : 0.4}
                          >
                            {node.label.split("\n")[1]}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </>
              ) : (
                /* ── Guardian mode ──────────────────────────────────────────── */
                <>
                  {/* Safe-zone circle */}
                  <circle
                    cx={GC.x} cy={GC.y} r={SAFE_R}
                    fill={guardianAlert ? "rgba(239,68,68,0.05)" : "rgba(255,92,0,0.05)"}
                    stroke={guardianAlert ? "#EF4444" : "#FF5C00"}
                    strokeWidth="0.5"
                    strokeDasharray="3 2"
                    opacity={0.75}
                  />
                  <text
                    x={GC.x - SAFE_R + 1}
                    y={GC.y + SAFE_R - 1.5}
                    fontSize="2"
                    fill={guardianAlert ? "#EF4444" : "#FF5C00"}
                    fillOpacity={0.65}
                    fontStyle="italic"
                  >
                    500m radius
                  </text>

                  {/* Group mesh edges */}
                  {GUARDIAN_EDGES.map((edge) => {
                    const f = GUARDIAN_NODES.find((n) => n.id === edge.from)!;
                    const t = GUARDIAN_NODES.find((n) => n.id === edge.to)!;
                    return (
                      <line key={`${edge.from}-${edge.to}`}
                        x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                        stroke={guardianAlert ? "#EF4444" : "#334155"}
                        strokeWidth="0.3"
                        strokeOpacity={0.5}
                        strokeDasharray="2 2"
                      />
                    );
                  })}

                  {/* Trail line: group center → child */}
                  <motion.line
                    x1={GC.x} y1={GC.y}
                    animate={{ x2: childPos.x, y2: childPos.y } as never}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    stroke={guardianAlert ? "#EF4444" : "#34D399"}
                    strokeWidth="0.35"
                    strokeDasharray="2 1.5"
                    opacity={0.55}
                  />

                  {/* Group nodes */}
                  {GUARDIAN_NODES.map((node) => (
                    <g key={node.id}>
                      {guardianAlert && (
                        <circle cx={node.x} cy={node.y} r="3" fill="none"
                          stroke="#EF4444" strokeWidth="0.4" opacity="0.5"
                        >
                          <animate attributeName="r"       values="2;4.5;2"   dur="1s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={node.x} cy={node.y} r="2.2"
                        fill={guardianAlert ? "#EF4444" : node.color}
                        stroke={guardianAlert ? "#EF4444" : node.color}
                        strokeWidth="0.6"
                      />
                      {node.type === "base" && (
                        <text x={node.x} y={node.y + 0.6} textAnchor="middle" fontSize="2"
                          fill="#0F1F16" fontWeight="bold">⌂</text>
                      )}
                      <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="2.2"
                        fill={guardianAlert ? "#EF4444" : node.color}
                        fontWeight="bold"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}

                  {/* Child node — animated via motion.g translate */}
                  <motion.g
                    animate={{ x: cdx, y: cdy }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    {/* Pulse ring on alert */}
                    {guardianAlert && (
                      <circle cx={childStart.x} cy={childStart.y} r="3.5"
                        fill="none" stroke="#EF4444" strokeWidth="0.4" opacity="0.5"
                      >
                        <animate attributeName="r"       values="2.5;6;2.5"   dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6"   dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={childStart.x} cy={childStart.y} r="2.2"
                      fill={guardianAlert ? "#EF4444" : "#34D399"}
                      stroke={guardianAlert ? "#EF4444" : "#34D399"}
                      strokeWidth="0.6"
                    />
                    <text
                      x={childStart.x} y={childStart.y - 4}
                      textAnchor="middle" fontSize="2.2"
                      fill={guardianAlert ? "#EF4444" : "#34D399"}
                      fontWeight="bold"
                    >
                      {guardianAlert ? "⚠ Emma" : "Emma"}
                    </text>
                  </motion.g>
                </>
              )}
            </svg>

            {/* Status overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-3">
              {mode === "sos" ? (
                sosActive ? (
                  <div className="flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444]/40 px-3 py-1.5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444] led-flash-sos" />
                    <span className="text-xs font-bold text-[#EF4444]">SOS RELAYING THROUGH MESH</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">MESH ACTIVE — 5 MEMBERS</span>
                  </div>
                )
              ) : guardianAlert ? (
                <div className="flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444]/40 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444] led-flash-sos" />
                  <span className="text-xs font-bold text-[#EF4444]">⚠ GUARDIAN ALERT — MEMBER OUT OF RANGE</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-[#FF5C00]/10 border border-[#FF5C00]/30 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#FF5C00]" />
                  <span className="text-xs font-semibold text-[#FF5C00]">GUARDIAN MODE — GROUP SAFE</span>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t border-white/10 px-6 py-4 flex flex-wrap gap-6 justify-center">
            {mode === "sos" ? (
              <>
                <LegendDot color="bg-emerald-400"  label="Group member"  />
                <LegendDot color="bg-[#FF5C00]"    label="Base station"  />
                <LegendDot color="bg-[#EF4444]"    label="SOS / Alert"   />
                <LegendDot color="bg-[#334155]"    label="Mesh link"     />
              </>
            ) : (
              <>
                <LegendDot color="bg-[#FF5C00]"    label="Parent"              />
                <LegendDot color="bg-emerald-400"  label="Group member"        />
                <LegendDot color="bg-[#EF4444]"    label="Alert — out of range" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-dashed border-[#FF5C00] opacity-70" />
                  <span className="text-xs text-[#F8FAFC]/60">500m safe zone</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center"
        >
          {(mode === "sos" ? SOS_STATS : GUARDIAN_STATS).map((stat) => (
            <div key={stat.label} className="bg-white/4 border border-white/10 rounded-2xl p-5">
              <div className="text-3xl font-black text-[#FF5C00] mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-[#F8FAFC]">{stat.label}</div>
              <div className="text-xs text-[#F8FAFC]/40 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-xs text-[#F8FAFC]/60">{label}</span>
    </div>
  );
}