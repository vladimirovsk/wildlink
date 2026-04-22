"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How It Works", href: "#device" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Compare", href: "#compare" },
  { label: "Our Story", href: "#story" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F1F16]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-[#F8FAFC]">
            Wild<span className="text-[#FF5C00]">Link</span>
            <span className="text-[#FF5C00] text-sm font-semibold">.ca</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F8FAFC]/70 hover:text-[#F8FAFC] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Demo App — coming soon */}
          <div className="relative">
            <span className="inline-flex items-center gap-2 border border-white/20 text-[#F8FAFC]/30 font-semibold text-sm px-4 py-2 rounded-full cursor-not-allowed select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5C00]/40" />
              </span>
              Web App
            </span>
            <span className="absolute -top-2.5 -right-1 bg-[#334155] text-[#F8FAFC]/60 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 pointer-events-none">
              Soon
            </span>
          </div>

          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-[#FF5C00] hover:bg-[#e05200] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            Join Beta
          </a>
        </div>

        <button
          className="md:hidden text-[#F8FAFC] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F1F16] border-t border-white/10"
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-[#F8FAFC]/80 hover:text-[#FF5C00] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {/* Demo App mobile */}
              <div className="relative self-start">
                <span className="inline-flex items-center gap-2 border border-white/20 text-[#F8FAFC]/30 font-semibold text-sm px-5 py-3 rounded-full cursor-not-allowed select-none">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5C00]/40" />
                  Web App
                </span>
                <span className="absolute -top-2 -right-1 bg-[#334155] text-[#F8FAFC]/60 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 pointer-events-none">
                  Soon
                </span>
              </div>

              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center bg-[#FF5C00] text-white font-semibold text-sm px-5 py-3 rounded-full mt-2"
              >
                Join Beta — 30% Off
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
