import { MapPin } from "lucide-react";

const links = [
  { label: "How it works", href: "#device" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Compare", href: "#compare" },
  { label: "Our story", href: "#story" },
  { label: "FAQ", href: "#faq" },
  { label: "Partners", href: "#partners" },
  { label: "Join beta", href: "#waitlist" },
];

export default function Footer() {
  return (
    <footer className="bg-[#070f09] py-14 text-alpine">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <span className="font-display text-3xl font-semibold tracking-tight">
              Wild<span className="text-orange">Link</span>
              <span className="text-base font-medium text-orange">.ca</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-alpine/65">
              Group tracking and SOS for the backcountry. No cell service, no
              subscription.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-alpine/65">
              <MapPin size={14} className="text-orange" />
              Calgary, Alberta, Canada
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-alpine/70 transition-colors hover:text-alpine"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-alpine/55">
          © 2025 WildLink Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
