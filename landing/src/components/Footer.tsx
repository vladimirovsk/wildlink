"use client";

import { MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#070f09] border-t border-white/8 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="text-xl font-black text-[#F8FAFC]">
              Wild<span className="text-[#FF5C00]">Link</span>
              <span className="text-[#FF5C00] text-sm font-semibold">.ca</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#F8FAFC]/30">
              <MapPin size={10} className="text-[#FF5C00]" />
              <span>Built in Calgary, AB, Canada</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: "How It Works", href: "#device" },
              { label: "Compare", href: "#compare" },
              { label: "Our Story", href: "#story" },
              { label: "Join Beta", href: "#waitlist" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-[#F8FAFC]/40 hover:text-[#F8FAFC]/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-xs text-[#F8FAFC]/25">
            <span>Made with</span>
            <Heart size={10} className="text-[#FF5C00] fill-[#FF5C00]" />
            <span>for the Rockies</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-[#F8FAFC]/20">
            © 2025 WildLink Technologies Inc. All rights reserved. Calgary, Alberta, Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
