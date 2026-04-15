"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "base" | "hiker" | "device";
  color: string;
}

interface Edge {
  from: string;
  to: string;
}

const NODES: Node[] = [
  { id: "base", x: 85, y: 50, label: "Base Station\n(Trailhead)", type: "base", color: "#FF5C00" },
  { id: "h1", x: 65, y: 30, label: "Sarah", type: "hiker", color: "#34D399" },
  { id: "h2", x: 50, y: 55, label: "Mike", type: "hiker", color: "#34D399" },
  { id: "h3", x: 35, y: 35, label: "Aiden", type: "hiker", color: "#34D399" },
  { id: "h4", x: 20, y: 60, label: "Priya", type: "hiker", color: "#34D399" },
  { id: "h5", x: 15, y: 25, label: "Deep (SOS)", type: "device", color: "#EF4444" },
];

const EDGES: Edge[] = [
  { from: "base", to: "h1" },
  { from: "h1", to: "h2" },
  { from: "h1", to: "h3" },
  { from: "h2", to: "h4" },
  { from: "h3", to: "h5" },
  { from: "h4", to: "h5" },
];

// Signal travels: h5 → h3 → h1 → base
const SIGNAL_PATH = ["h5", "h3", "h1", "base"];

export default function MeshAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSignal, setActiveSignal] = useState<number>(-1);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const startSOS = () => {
      setSosActive(true);
      setActiveSignal(0);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < SIGNAL_PATH.length) {
          setActiveSignal(step);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setSosActive(false);
            setActiveSignal(-1);
            setTimeout(startSOS, 2000);
          }, 1000);
        }
      }, 700);
    };

    const timeout = setTimeout(startSOS, 800);
    return () => clearTimeout(timeout);
  }, [inView]);

  const getNodePos = (id: string) => {
    const node = NODES.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <section className="relative py-24 lg:py-36 bg-[#0F1F16] overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810] via-[#0F1F16] to-[#0a1810]" />

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

        {/* Animation container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/3 border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto"
        >
          {/* Background photo — Kananaskis panorama */}
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
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
              {/* Edges */}
              {EDGES.map((edge) => {
                const from = getNodePos(edge.from);
                const to = getNodePos(edge.to);
                const isActive =
                  sosActive &&
                  SIGNAL_PATH.includes(edge.from) &&
                  SIGNAL_PATH.includes(edge.to);

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    {/* Base line */}
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isActive ? "#EF4444" : "#334155"}
                      strokeWidth={isActive ? "0.6" : "0.3"}
                      strokeOpacity={isActive ? 0.8 : 0.4}
                      strokeDasharray={isActive ? "none" : "2 2"}
                    />

                    {/* Animated signal dot */}
                    {isActive && (
                      <circle r="0.8" fill="#EF4444">
                        <animate
                          attributeName="cx"
                          values={`${from.x};${to.x}`}
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          values={`${from.y};${to.y}`}
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {NODES.map((node) => {
                const isOnPath = SIGNAL_PATH.includes(node.id);
                const pathIndex = SIGNAL_PATH.indexOf(node.id);
                const isReached = sosActive && pathIndex !== -1 && pathIndex <= activeSignal;

                return (
                  <g key={node.id}>
                    {/* Pulse ring */}
                    {(isReached || node.id === "h5") && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="3.5"
                        fill="none"
                        stroke={node.id === "h5" ? "#EF4444" : node.id === "base" ? "#FF5C00" : "#34D399"}
                        strokeWidth="0.4"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          values="2.5;5;2.5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.6;0;0.6"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="2.2"
                      fill={isReached ? node.color : "#1a2e22"}
                      stroke={node.color}
                      strokeWidth="0.6"
                      opacity={isReached || !isOnPath ? 1 : 0.5}
                    />

                    {/* Node icon */}
                    {node.type === "base" && (
                      <text
                        x={node.x}
                        y={node.y + 0.6}
                        textAnchor="middle"
                        fontSize="2"
                        fill={isReached ? "#0F1F16" : "#F8FAFC"}
                        fontWeight="bold"
                      >
                        ⌂
                      </text>
                    )}

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill={isReached ? node.color : "#F8FAFC"}
                      fillOpacity={isReached ? 1 : 0.5}
                      fontWeight={isReached ? "bold" : "normal"}
                    >
                      {node.label.split("\n")[0]}
                    </text>
                    {node.label.includes("\n") && (
                      <text
                        x={node.x}
                        y={node.y - 1.5}
                        textAnchor="middle"
                        fontSize="1.8"
                        fill={isReached ? node.color : "#F8FAFC"}
                        fillOpacity={isReached ? 1 : 0.4}
                      >
                        {node.label.split("\n")[1]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* SOS status overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-3">
              {sosActive ? (
                <div className="flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444]/40 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444] led-flash-sos" />
                  <span className="text-xs font-bold text-[#EF4444]">SOS RELAYING THROUGH MESH</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">MESH ACTIVE — 5 MEMBERS</span>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t border-white/10 px-6 py-4 flex flex-wrap gap-6 justify-center">
            {[
              { color: "bg-emerald-400", label: "Group member" },
              { color: "bg-[#FF5C00]", label: "Base station" },
              { color: "bg-[#EF4444]", label: "SOS / Alert" },
              { color: "bg-[#334155]", label: "Mesh link" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs text-[#F8FAFC]/60">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center"
        >
          {[
            { value: "5km", label: "Range per hop", sub: "Line of sight" },
            { value: "< 1s", label: "SOS delivery", sub: "Across full mesh" },
            { value: "∞", label: "Network size", sub: "Add more devices" },
          ].map((stat) => (
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
