import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { KawaiiBear } from "./KawaiiBear";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(180deg,#fff5f8,#ffd1e4)" }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <div style={{ animation: "wave 1s ease-in-out infinite", transformOrigin: "50% 90%" }}>
            <KawaiiBear size={140} />
          </div>
          <p
            className="mt-4 text-2xl"
            style={{ fontFamily: "Pacifico, cursive", color: "#f95d95" }}
          >
            getting cute...
          </p>
          <div className="mt-4 h-2 w-56 overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg,#ff9ec3,#ff5c8a)",
                transition: "width 100ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}