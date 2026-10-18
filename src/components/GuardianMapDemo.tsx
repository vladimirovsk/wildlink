"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { BellRing } from "lucide-react";

/**
 * Looping demo of the Guardian Alert: a child's device walks out of the
 * 500 m ring on an offline map and every device in the group is alerted.
 * Map units: 0.3 SVG units = 1 m, so the ring radius of 150 units = 500 m.
 */

const VIEW_W = 520;
const VIEW_H = 560;
const UNITS_PER_METER = 0.3;
const ALERT_METERS = 500;

const PARENT = { x: 220, y: 310 };
const KID_HOME = { x: 292, y: 262 };
const KID_AWAY = { x: 398, y: 140 };
const MATES = [
  { x: 150, y: 372 },
  { x: 268, y: 396 },
];

/** Closed, hand-tuned contour rings around two summits. */
function contour(cx: number, cy: number, r: number, seed: number) {
  const steps = 72;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.13 * Math.sin(3 * t + seed) +
      0.07 * Math.sin(5 * t + seed * 2.1) +
      0.04 * Math.sin(9 * t + seed * 0.6);
    const x = cx + Math.cos(t) * r * wobble * 1.25;
    const y = cy + Math.sin(t) * r * wobble * 0.85;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
}

const CONTOURS = [
  ...[34, 62, 92, 124, 158, 194].map((r) => contour(392, 150, r, 1.2)),
  ...[30, 58, 88, 120, 154, 190].map((r) => contour(120, 470, r, 3.4)),
];

const LAKE = contour(150, 190, 52, 5.1);

export default function GuardianMapDemo() {
  const reduce = useReducedMotion();
  const [crossed, setCrossed] = useState(false);
  const alert = crossed || !!reduce;

  const kidX = useMotionValue(reduce ? KID_AWAY.x : KID_HOME.x);
  const kidY = useMotionValue(reduce ? KID_AWAY.y : KID_HOME.y);

  const meters = useTransform([kidX, kidY], ([x, y]) => {
    const dx = (x as number) - PARENT.x;
    const dy = (y as number) - PARENT.y;
    return Math.round(Math.hypot(dx, dy) / UNITS_PER_METER / 10) * 10;
  });
  const meterText = useTransform(meters, (m) => `${m} m`);
  const kidLabelX = useTransform(kidX, (x) => x + 14);
  const kidLabelY = useTransform(kidY, (y) => y - 12);

  useMotionValueEvent(meters, "change", (m) => setCrossed(m > ALERT_METERS));

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const walk = (to: { x: number; y: number }, seconds: number) =>
      Promise.all([
        animate(kidX, to.x, { duration: seconds, ease: "linear" }).finished,
        animate(kidY, to.y, { duration: seconds, ease: "linear" }).finished,
      ]);

    (async () => {
      await wait(1400);
      while (!cancelled) {
        await walk(KID_AWAY, 5);
        await wait(3600);
        if (cancelled) break;
        await walk(KID_HOME, 3.6);
        await wait(2200);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reduce, kidX, kidY]);

  const ringRadius = ALERT_METERS * UNITS_PER_METER;
  const status = alert ? "var(--sos)" : "#4ADE80";

  return (
    <figure
      className="relative mx-auto w-full max-w-[460px] rounded-[20px] border border-white/15 bg-[#0A1812] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
      aria-label="Animated demo of a Guardian Alert on an offline map"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-wide text-alpine">
            Group map
          </span>
          <span className="text-xs text-alpine/50">4 devices, offline</span>
        </div>
        <span
          className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300"
          style={{
            color: status,
            borderColor: `color-mix(in srgb, ${status} 45%, transparent)`,
            background: `color-mix(in srgb, ${status} 12%, transparent)`,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: status }}
          />
          {alert ? "Guardian Alert" : "Mesh linked"}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block w-full rounded-b-[20px]"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="gm-vignette" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor="#0A1812" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A1812" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Terrain */}
        <g fill="none" stroke="#2F5A45" strokeWidth="1" opacity="0.85">
          {CONTOURS.map((d, i) => (
            <path
              key={i}
              d={d}
              strokeWidth={i % 6 === 5 ? 1.6 : 1}
              opacity={i % 6 === 5 ? 1 : 0.7}
            />
          ))}
        </g>
        <path d={LAKE} fill="#1F8F8A" fillOpacity="0.22" stroke="#1F8F8A" strokeOpacity="0.7" />
        <text x="150" y="194" textAnchor="middle" fontSize="11" fill="#7FD1CB" opacity="0.8">
          Lake
        </text>

        {/* Mesh links */}
        <g stroke="#4ADE80" strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="3 6">
          {[...MATES, KID_HOME].map((p, i) => (
            <line key={i} x1={PARENT.x} y1={PARENT.y} x2={p.x} y2={p.y} opacity={i === 2 ? 0 : 1} />
          ))}
        </g>
        <MeshLink kidX={kidX} kidY={kidY} alert={alert} />

        {/* 500 m guardian ring */}
        <motion.circle
          cx={PARENT.x}
          cy={PARENT.y}
          r={ringRadius}
          fill="none"
          strokeWidth="2"
          strokeDasharray="7 7"
          animate={{
            stroke: alert ? "#E5372E" : "#F8FAFC",
            strokeOpacity: alert ? 1 : 0.5,
          }}
          transition={{ duration: 0.25 }}
        />
        <text
          x={PARENT.x - ringRadius - 8}
          y={PARENT.y + 4}
          textAnchor="end"
          fontSize="12"
          fontWeight="600"
          fill="#F8FAFC"
          opacity="0.7"
        >
          500 m
        </text>

        {/* Group dots */}
        {MATES.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="7" fill="#4ADE80" stroke="#0A1812" strokeWidth="3" />
        ))}
        <circle cx={PARENT.x} cy={PARENT.y} r="9" fill="#FF5C00" stroke="#0A1812" strokeWidth="3" />
        <text x={PARENT.x + 14} y={PARENT.y + 22} fontSize="12" fontWeight="600" fill="#F8FAFC">
          You
        </text>

        {/* Kid's device */}
        {alert && !reduce && (
          <motion.circle
            cx={kidX}
            cy={kidY}
            fill="none"
            stroke="#E5372E"
            strokeWidth="2"
            initial={{ r: 8, opacity: 0.9 }}
            animate={{ r: 34, opacity: 0 }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.circle
          cx={kidX}
          cy={kidY}
          r="8"
          stroke="#0A1812"
          strokeWidth="3"
          animate={{ fill: alert ? "#E5372E" : "#4ADE80" }}
          transition={{ duration: 0.2 }}
        />
        <motion.text
          x={kidLabelX}
          y={kidLabelY}
          fontSize="12"
          fontWeight="600"
          fill="#F8FAFC"
        >
          Kid
        </motion.text>

        <rect width={VIEW_W} height={VIEW_H} fill="url(#gm-vignette)" pointerEvents="none" />
      </svg>

      {/* Distance readout */}
      <div className="absolute left-3 bottom-3 rounded-lg sm:left-4 sm:bottom-4 border border-white/15 bg-[#0A1812]/90 px-3 py-2 backdrop-blur-sm">
        <div className="text-[11px] text-alpine/50">Kid is</div>
        <motion.div
          className="font-display text-2xl font-semibold leading-none text-alpine tabular-nums"
          style={{ color: alert ? "var(--sos)" : undefined }}
        >
          {meterText}
        </motion.div>
        <div className="text-[11px] text-alpine/50">from you</div>
      </div>

      {/* Alert toast */}
      <AnimatePresence>
        {alert && (
          <motion.div
            key="toast"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="absolute right-3 bottom-3 left-[132px] flex items-start gap-2.5 rounded-xl bg-sos px-3 py-2.5 text-white shadow-lg sm:right-4 sm:bottom-4 sm:left-[150px] sm:gap-3 sm:px-4 sm:py-3"
          >
            <BellRing size={20} className="mt-0.5 shrink-0" />
            <div className="leading-tight">
              <div className="text-sm font-bold">Guardian Alert</div>
              <div className="hidden text-xs text-white/90 sm:block">
                Audio and haptic alert sent to every device in the group.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

/** Dashed link from the parent to the kid's live position. */
function MeshLink({
  kidX,
  kidY,
  alert,
}: {
  kidX: ReturnType<typeof useMotionValue<number>>;
  kidY: ReturnType<typeof useMotionValue<number>>;
  alert: boolean;
}) {
  return (
    <motion.line
      x1={PARENT.x}
      y1={PARENT.y}
      x2={kidX}
      y2={kidY}
      strokeWidth="1.4"
      strokeDasharray="3 6"
      animate={{
        stroke: alert ? "#E5372E" : "#4ADE80",
        strokeOpacity: alert ? 0.8 : 0.45,
      }}
    />
  );
}
