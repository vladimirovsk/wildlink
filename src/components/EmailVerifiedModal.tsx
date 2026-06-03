"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, MapPin, Tag, Shield } from "lucide-react";

export default function EmailVerifiedModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === "true" || verified === "false") {
      setSuccess(verified === "true");
      setVisible(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("verified");
      router.replace(url.pathname + (url.search || ""), { scroll: false });
    }
  }, [searchParams, router]);

  const close = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={close}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative bg-[#0d1c13] border border-white/12 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl pointer-events-auto">
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-[#F8FAFC]/50" />
              </button>

              {success ? (
                <>
                  <div className="flex justify-center mb-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle size={40} className="text-emerald-400" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] text-center mb-3">
                    You&apos;re on the{" "}
                    <span className="text-[#FF5C00]">WildLink beta!</span>
                  </h2>

                  <p className="text-[#F8FAFC]/55 text-sm sm:text-base text-center leading-relaxed mb-6">
                    Your email is confirmed. We&apos;ll reach out when Canadian beta
                    spots open — you&apos;re locked in.
                  </p>

                  <div className="border-t border-white/8 my-5" />

                  <div className="space-y-2.5 mb-7">
                    {[
                      { icon: Tag, text: "30% discount locked in at launch" },
                      { icon: MapPin, text: "Priority shipping — Canada first" },
                      { icon: Shield, text: "Early access to shape the product" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#FF5C00]/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={13} className="text-[#FF5C00]" />
                        </div>
                        <span className="text-xs text-[#F8FAFC]/60">{text}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={close}
                    className="w-full bg-[#FF5C00] hover:bg-[#e05200] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-[#FF5C00]/20"
                  >
                    Back to WildLink
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-5">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <X size={40} className="text-red-400" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] text-center mb-3">
                    Link expired or invalid
                  </h2>

                  <p className="text-[#F8FAFC]/55 text-sm sm:text-base text-center leading-relaxed mb-6">
                    This confirmation link has expired or already been used.
                    Sign up again to get a new one.
                  </p>

                  <button
                    onClick={close}
                    className="w-full bg-[#FF5C00] hover:bg-[#e05200] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-[#FF5C00]/20"
                  >
                    Back to WildLink
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}