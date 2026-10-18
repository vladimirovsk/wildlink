"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Coffee, Wrench, Cpu, ExternalLink, AlertCircle } from "lucide-react";

const spends = [
  { icon: Cpu, label: "LoRa modules & prototypes" },
  { icon: Wrench, label: "Field testing equipment" },
  { icon: Coffee, label: "Late nights in a Canadian R&D studio" },
];

const PRESETS = [5, 10, 25, 50];
const MIN_AMOUNT_CAD = 1; // $1.00 CAD minimum

export default function SupportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [selected, setSelected] = useState<number>(10);
  const [custom, setCustom] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effective amount in CAD: custom input takes priority over preset
  const effectiveAmount = custom !== "" ? parseFloat(custom) : selected;
  const isValid = !isNaN(effectiveAmount) && effectiveAmount >= MIN_AMOUNT_CAD;

  const handleCustomChange = (val: string) => {
    // Allow only numeric input with up to 2 decimal places
    if (val === "" || /^\d{1,6}(\.\d{0,2})?$/.test(val)) {
      setCustom(val);
      setError(null);
    }
  };

  const handlePreset = (amount: number) => {
    setSelected(amount);
    setCustom("");
    setError(null);
  };

  const handleDonate = async () => {
    if (!isValid) {
      setError(`Minimum donation is $${MIN_AMOUNT_CAD}.00 CAD`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9087";
      const apiKey = process.env.NEXT_PUBLIC_LEADS_API_KEY ?? "";

      const amountCents = Math.round(effectiveAmount * 100);

      const res = await fetch(`${apiUrl}/api/v1/donations/checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          amount: amountCents,
          note: "WildLink R&D Support",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Something went wrong");
      }

      const { url } = await res.json() as { url: string };
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-stone" ref={ref}>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 mb-6">
            <Heart size={24} className="text-[#B53D00]" />
          </div>

          {/* Label */}

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1] tracking-tight mb-5 text-forest">An independent R&D initiative,{" "} self-funded from day one.</h2>

          {/* Body */}
          <p className="text-forest/68 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            WildLink is a Canada-based engineering initiative with no outside investors
            and no corporate budget. Every prototype, every LoRa module, and every field
            run in Kananaskis has been funded personally. If this mission resonates with
            you, any support helps move us closer to production.
          </p>

          {/* What money goes to */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {spends.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-forest/[0.04] border border-forest/15 px-4 py-2 rounded-full"
              >
                <Icon size={14} className="text-forest/68" />
                <span className="text-xs text-forest/68 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Donation form */}
          <div className="bg-forest/[0.04] border border-forest/15 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
            {/* Preset amounts */}
            <p className="text-xs font-semibold text-forest/68 mb-3">
              Select amount (CAD)
            </p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {PRESETS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handlePreset(amount)}
                  className={`py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                    custom === "" && selected === amount
                      ? "bg-[#FF5C00] text-white shadow-lg shadow-[#FF5C00]/20"
                      : "bg-forest/[0.04] border border-forest/15 text-forest/70 hover:border-[#FF5C00]/40 hover:text-forest"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative mb-5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/68 text-sm font-semibold">
                $
              </span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Other amount"
                value={custom}
                onChange={(e) => handleCustomChange(e.target.value)}
                onFocus={() => setSelected(0)}
                className="w-full bg-forest/[0.04] border border-forest/15 focus:border-[#FF5C00]/60 outline-none rounded-xl pl-8 pr-16 py-3 text-forest placeholder:text-forest/50 text-sm transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/68 text-xs font-semibold">
                CAD
              </span>
            </div>

            {/* Validation error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-2.5 mb-4 text-left">
                <AlertCircle size={14} className="text-red-700 flex-shrink-0" />
                <span className="text-xs text-red-700">{error}</span>
              </div>
            )}

            {/* Amount preview */}
            {isValid && (
              <p className="text-xs text-forest/68 mb-4">
                You&apos;re donating{" "}
                <span className="text-[#B53D00] font-bold">
                  ${effectiveAmount.toFixed(2)} CAD
                </span>{" "}
                — thank you!
              </p>
            )}

            {/* CTA */}
            <button
              type="button"
              onClick={handleDonate}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#FF5C00] hover:bg-[#e05200] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#FF5C00]/20"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-forest/15 border-t-white rounded-full animate-spin" />
                  Redirecting to Stripe…
                </>
              ) : (
                <>
                  <Heart size={18} className="fill-white" />
                  Support the Project
                  <ExternalLink size={15} className="opacity-70" />
                </>
              )}
            </button>

            <p className="mt-3 text-[10px] text-forest/68 leading-relaxed">
              Secure checkout via Stripe. One-time payment — no subscription.
              Minimum $1.00 CAD.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
