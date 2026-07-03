import { motion } from "framer-motion";
import { useEffect } from "react";
import { KawaiiBear } from "./KawaiiBear";
import { bigCelebration } from "@/lib/celebrate";

export function SuccessScreen() {
  useEffect(() => {
    bigCelebration();
    const id = setInterval(bigCelebration, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(800px 500px at 50% 30%, #fff2a8 0%, transparent 60%)," +
          "linear-gradient(180deg,#fff5f8,#ffb3d9)",
      }}
      role="dialog"
      aria-label="Thank you"
    >
      <motion.div
        animate={{ rotate: [-6, 6, -6], y: [0, -10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <KawaiiBear mood="happy" size={220} />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-5xl md:text-6xl"
        style={{ fontFamily: "Pacifico, cursive", color: "#f95d95" }}
      >
        YAY!! ❤️
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3 text-xl md:text-2xl"
        style={{ fontFamily: "Quicksand, sans-serif", color: "#7a3b5a" }}
      >
        I knew you'd forgive me!
      </motion.p>
    </motion.div>
  );
}