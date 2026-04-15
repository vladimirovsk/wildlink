"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Award,
  Building2,
  TreePine,
  Factory,
  CheckCircle2,
  ArrowRight,
  Users,
  Radio,
  Zap,
  Shield,
  Map,
} from "lucide-react";

const proofPoints = [
  { icon: Map,    stat: "5 km",    label: "Range in dense forest — field-validated" },
  { icon: Zap,    stat: "72 h",    label: "Battery life on a single charge" },
  { icon: Radio,  stat: "< 3 sec", label: "Mesh message propagation latency" },
  { icon: Shield, stat: "$0 / mo", label: "Zero subscription, zero recurring cost" },
  { icon: Users,  stat: "10 M+",   label: "Annual visitors to Canadian Rockies" },
  { icon: CheckCircle2, stat: "v3", label: "Hardware revision — prototype generation" },
];

const tracks = [
  {
    icon: TrendingUp,
    tag: "Strategic Investment",
    title: "Back an Engineer Who Has Already Shipped.",
    body:
      "The technical risk that concerns most seed investors has already been absorbed. Serge's professional background in industrial telemetry hardware — Atmel-based remote metering systems deployed in critical utility infrastructure — means WildLink is built by someone with a proven record of shipping hardware in demanding conditions. We are now raising to fund mass-production tooling, ISED/FCC type-approval, and nationwide logistics.",
    bullets: [
      "Technical execution de-risked by decade of industrial hardware delivery",
      "Hardware BOM finalised; manufacturing RFQs in progress",
      "ISED/FCC certification roadmap scoped by a founder who understands compliance",
    ],
    cta: "Talk to the Founder",
    href: "mailto:support@itcoder.ca?subject=Investment%20Inquiry%20—%20WildLink",
    accent: "#FF5C00",
  },
  {
    icon: Award,
    tag: "Outdoor Brands",
    title: "Co-Branding & Field Partnership",
    body:
      "Partner with WildLink for co-branded bundles, sponsored trail deployments, and exclusive beta access for your community. We are actively seeking outdoor retailers, guide services, and gear brands aligned with hiker safety in the Canadian Rockies.",
    bullets: [
      "Joint field-validation sessions in Kananaskis and Banff",
      "Co-branded hardware SKUs with your community's identity",
      "Authentic Rocky Mountain provenance — not a Silicon Valley product",
    ],
    cta: "Explore Co-Branding",
    href: "mailto:support@itcoder.ca?subject=Brand%20Partnership%20—%20WildLink",
    accent: "#10b981",
  },
  {
    icon: Building2,
    tag: "B2B & Industrial",
    title: "Enterprise Deployment — Oil & Gas · Forestry · SAR",
    body:
      "Remote industrial operations across Alberta face the same connectivity gap as recreational hikers — at considerably higher operational and liability stakes. WildLink's mesh architecture requires no fixed infrastructure, deploys in minutes, and eliminates per-seat satellite subscription costs.",
    bullets: [
      "Crew safety monitoring across off-grid worksites without cellular coverage",
      "Custom firmware and protocol adaptation available for industrial requirements",
      "Pilot deployment programme open to Alberta-based operators",
    ],
    cta: "Request a Pilot",
    href: "mailto:support@itcoder.ca?subject=Enterprise%20Inquiry%20—%20WildLink",
    accent: "#6366f1",
  },
];

export default function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="partners" className="relative py-24 lg:py-36 bg-[#0a1810] overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FF5C00]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(90deg, #F8FAFC 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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
              Partnerships & Investment
            </span>
            <div className="h-px w-12 bg-[#FF5C00]" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-[#F8FAFC] leading-tight mb-5">
            Accelerating the Future
            <br />
            <span className="text-[#FF5C00]">of Outdoor Safety.</span>
          </h2>

          <p className="text-[#F8FAFC]/60 text-lg leading-relaxed">
            WildLink has moved from concept to field-validated hardware, led by a Senior
            Software Architect with a professional track record in industrial telemetry.
            We are entering the scaling phase — and we are looking for partners who
            recognise that safety across 10 million annual Rocky Mountain visitors is
            not a niche opportunity.
          </p>
        </motion.div>

        {/* Proof points — technical achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16"
        >
          {proofPoints.map(({ icon: Icon, stat, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className="bg-white/4 border border-white/10 rounded-2xl p-4 text-center hover:border-[#FF5C00]/30 transition-colors"
            >
              <Icon size={16} className="text-[#FF5C00] mx-auto mb-2" />
              <div className="text-xl font-black text-[#F8FAFC] mb-1">{stat}</div>
              <div className="text-[10px] text-[#F8FAFC]/45 font-medium leading-tight">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership tracks */}
        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {tracks.map(({ icon: Icon, tag, title, body, bullets, cta, href, accent }, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="relative bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col gap-5 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${accent}08, transparent 70%)` }}
              />

              {/* Tag */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0"
                  style={{
                    background: `${accent}15`,
                    borderColor: `${accent}30`,
                  }}
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  {tag}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#F8FAFC] leading-snug">{title}</h3>

              <p className="text-sm text-[#F8FAFC]/55 leading-relaxed flex-1">{body}</p>

              {/* Bullet points */}
              <ul className="flex flex-col gap-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={14}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: accent }}
                    />
                    <span className="text-xs text-[#F8FAFC]/60 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={href}
                className="inline-flex items-center gap-2 font-semibold text-sm mt-auto pt-2 transition-all duration-200 group/link"
                style={{ color: accent }}
              >
                {cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative bg-gradient-to-r from-[#FF5C00]/10 via-[#FF5C00]/6 to-transparent border border-[#FF5C00]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 hidden sm:flex w-12 h-12 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 items-center justify-center">
              <TreePine size={22} className="text-[#FF5C00]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#F8FAFC] mb-1">
                Not certain which track applies? Let&apos;s have a direct conversation.
              </p>
              <p className="text-sm text-[#F8FAFC]/50 max-w-lg">
                We are open to considered structures — equity, revenue-share, sponsored
                field programmes, or enterprise licensing. Every serious enquiry receives
                a response from the founder directly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center">
            {/* One-pager — coming soon */}
            <div className="relative">
              <button
                disabled
                className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-[#F8FAFC]/30 font-semibold text-sm px-5 py-2.5 rounded-full cursor-not-allowed"
              >
                <Factory size={15} />
                Investor One-Pager
              </button>
              <span className="absolute -top-2.5 -right-1 bg-[#334155] text-[#F8FAFC]/60 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 whitespace-nowrap pointer-events-none">
                Soon
              </span>
            </div>

            <a
              href="https://wa.me/15879689089?text=Hi%20Serhii%2C%20I%27m%20interested%20in%20a%20WildLink%20partnership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/6 hover:bg-white/10 border border-white/15 hover:border-white/25 text-[#F8FAFC]/70 hover:text-[#F8FAFC] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200"
            >
              {/* WhatsApp icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            <a
              href="mailto:support@itcoder.ca?subject=Partnership%20Inquiry%20—%20WildLink"
              className="inline-flex items-center gap-2 bg-[#FF5C00] hover:bg-[#e05200] text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors"
            >
              Email the Founder
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
