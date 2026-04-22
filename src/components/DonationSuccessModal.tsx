"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, CheckCircle } from "lucide-react";

export default function DonationSuccessModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("donation") === "success") {
      setVisible(true);
      // Strip the param immediately so refresh / manual URL entry won't reopen the modal
      const url = new URL(window.location.href);
      url.searchParams.delete("donation");
      router.replace(url.pathname + (url.search || ""), { scroll: false });
    }
  }, [searchParams, router]);

  const close = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative bg-[#0d1c13] border border-white/12 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl pointer-events-auto">
              {/* Close */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-[#F8FAFC]/50" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center">
                    <Heart size={36} className="text-[#FF5C00] fill-[#FF5C00]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0d1c13]">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] text-center mb-3">
                Thank you for your{" "}
                <span className="text-[#FF5C00]">support!</span>
              </h2>

              {/* Body */}
              <p className="text-[#F8FAFC]/55 text-sm sm:text-base text-center leading-relaxed mb-6">
                Your donation goes directly toward LoRa hardware prototypes,
                field testing in Kananaskis, and keeping the mission alive.
                Every dollar counts.
              </p>

              {/* Divider */}
              <div className="border-t border-white/8 my-5" />

              {/* Impact lines */}
              <div className="space-y-2.5 mb-7">
                {[
                  "Helps fund the next prototype PCB run",
                  "Keeps field testing in the Rockies going",
                  "Supports a solo Canadian R&D initiative",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-2.5">
                    <div className="mt-1 w-4 h-4 rounded-full bg-[#FF5C00]/15 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
                    </div>
                    <span className="text-xs text-[#F8FAFC]/50 leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={close}
                className="w-full bg-[#FF5C00] hover:bg-[#e05200] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-[#FF5C00]/20"
              >
                Back to WildLink
              </button>

              <p className="text-center text-[10px] text-[#F8FAFC]/25 mt-3">
                A confirmation has been sent to your email.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
