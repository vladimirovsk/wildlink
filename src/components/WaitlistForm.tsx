"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, MapPin, Shield, Tag, Heart } from "lucide-react";
import Image from "next/image";

export default function WaitlistForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", city: "", useCase: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9087";
      const apiKey = process.env.NEXT_PUBLIC_LEADS_API_KEY ?? "";

      const res = await fetch(`${apiUrl}/api/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          city: form.city || undefined,
          note: form.useCase || undefined,
          source: "wildlink-waitlist",
        }),
      });

      if (res.status === 409) {
        // Already registered — treat as success so UX stays clean
        setSubmitted(true);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    { icon: Tag, text: "30% off at official launch" },
    { icon: MapPin, text: "Priority shipping — Canada first" },
    { icon: Shield, text: "Shape the product — your feedback matters" },
  ];

  return (
    <section id="waitlist" className="relative py-24 lg:py-36 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/eiffel-lake.jpg"
          alt="Eiffel Lake, Alberta Canadian Rockies"
          fill
          className="object-cover object-center opacity-15"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1810]/95 to-[#0F1F16]/98" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#FF5C00]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Mountain outline */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.06]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,120 L0,80 L120,30 L200,60 L300,10 L400,50 L520,5 L640,45 L760,15 L880,55 L1000,20 L1100,60 L1200,30 L1320,65 L1440,40 L1440,120Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#FF5C00]/10 border border-[#FF5C00]/30 text-[#FF5C00] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]" />
              </span>
              Canadian Beta — Limited Spots Remaining
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
              Join the Canadian
              <br />
              <span className="text-[#FF5C00]">Beta Program.</span>
            </h2>
            <p className="text-[#F8FAFC]/60 text-lg max-w-2xl mx-auto">
              Be the first to test WildLink on Rockies trails. Get 30% off at launch and help
              shape the device that keeps Albertan families safe.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-10"
          >
            {perks.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 bg-white/4 border border-white/10 rounded-xl px-4 py-3"
              >
                <Icon size={16} className="text-[#FF5C00] flex-shrink-0" />
                <span className="text-sm text-[#F8FAFC]/80 font-medium">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Form / Success */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-10 text-center">
                <CheckCircle size={56} className="text-emerald-400 mx-auto mb-5" />
                <h3 className="text-2xl font-black text-[#F8FAFC] mb-3">
                  You&apos;re on the list, {form.name.split(" ")[0]}!
                </h3>
                <p className="text-[#F8FAFC]/60 max-w-md mx-auto">
                  We&apos;ll reach out to{" "}
                  <span className="text-emerald-400 font-medium">{form.email}</span>{" "}
                  when Canadian beta spots open. Tell a hiking friend — they&apos;ll thank you later.
                </p>
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-sm text-emerald-400 font-semibold">
                    30% discount locked in ✓
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-[#F8FAFC]/60 font-medium">
                    Priority shipping ✓
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/4 border border-white/10 rounded-2xl p-8 grid sm:grid-cols-2 gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F8FAFC]/60 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Thompson"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-white/5 border border-white/15 focus:border-[#FF5C00]/60 outline-none rounded-xl px-4 py-3 text-[#F8FAFC] placeholder:text-[#F8FAFC]/25 text-sm transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F8FAFC]/60 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-white/5 border border-white/15 focus:border-[#FF5C00]/60 outline-none rounded-xl px-4 py-3 text-[#F8FAFC] placeholder:text-[#F8FAFC]/25 text-sm transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F8FAFC]/60 uppercase tracking-wider">
                    City / Town
                  </label>
                  <input
                    type="text"
                    placeholder="Vancouver, BC"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="bg-white/5 border border-white/15 focus:border-[#FF5C00]/60 outline-none rounded-xl px-4 py-3 text-[#F8FAFC] placeholder:text-[#F8FAFC]/25 text-sm transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F8FAFC]/60 uppercase tracking-wider">
                    Primary Use Case
                  </label>
                  <select
                    value={form.useCase}
                    onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                    className="bg-white/5 border border-white/15 focus:border-[#FF5C00]/60 outline-none rounded-xl px-4 py-3 text-[#F8FAFC] text-sm transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0F1F16]">Select one...</option>
                    <option value="family" className="bg-[#0F1F16]">Family hiking / kids</option>
                    <option value="group" className="bg-[#0F1F16]">Group hiking / backpacking</option>
                    <option value="skiing" className="bg-[#0F1F16]">Skiing / snowshoeing</option>
                    <option value="sar" className="bg-[#0F1F16]">Search & Rescue / volunteer</option>
                    <option value="other" className="bg-[#0F1F16]">Other</option>
                  </select>
                </div>

                {error && (
                  <div className="sm:col-span-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-[#FF5C00] hover:bg-[#e05200] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#FF5C00]/20"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Reserve My Spot — 30% Off at Launch
                      </>
                    )}
                  </button>
                </div>

                <p className="sm:col-span-2 text-center text-xs text-[#F8FAFC]/25">
                  No spam. No credit card. Just a ping when your beta unit is ready.
                </p>

                {/* Donation block */}
                <div className="sm:col-span-2 mt-2 border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center">
                    <Heart size={18} className="text-[#FF5C00]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-semibold text-[#F8FAFC]/80 mb-0.5">
                      I&apos;m building this entirely out of my own pocket.
                    </p>
                    <p className="text-xs text-[#F8FAFC]/40 leading-relaxed">
                      No outside investors — just a Canadian R&D studio, custom PCBs, and
                      rigorous field testing in Kananaskis. If you&apos;d like to chip in,
                      a donation button is coming very soon.
                    </p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-[#F8FAFC]/30 text-sm font-semibold px-5 py-2.5 rounded-full cursor-not-allowed"
                      title="Coming soon — donations via Stripe"
                    >
                      <Heart size={14} />
                      Support
                    </button>
                    <span className="absolute -top-2.5 -right-2 bg-[#334155] text-[#F8FAFC]/60 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10">
                      Soon
                    </span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
