import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { KawaiiBear } from "./KawaiiBear";
import { burstHearts } from "@/lib/celebrate";

type Props = { onYes: () => void };
type NoPos = { top: number; left: number; scale: number };

export function ApologyCard({ onYes }: Props) {
  const [yesCount, setYesCount] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState<NoPos>({ top: 0, left: 0, scale: 1 });
  const [noClicks, setNoClicks] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const dodge = useCallback(() => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 60;
    const top = (Math.random() - 0.5) * Math.max(0, rect.height - pad);
    const left = (Math.random() - 0.5) * Math.max(0, rect.width - pad);
    setNoPos((prev) => ({ top, left, scale: Math.max(0.35, prev.scale * 0.9) }));
  }, []);

  useEffect(() => {
    // keep initial no button in place
  }, []);

  const handleNo = (e: React.MouseEvent) => {
    burstHearts(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    setNoClicks((n) => n + 1);
    setYesCount((c) => Math.min(c + 2, 60));
    setYesScale((s) => Math.min(s * 1.12, 2.6));
    dodge();
  };

  const handleYes = (e: React.MouseEvent) => {
    burstHearts(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    onYes();
  };

  const extraYes = Array.from({ length: Math.max(0, yesCount - 1) });

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.15 }}
      className="relative w-full max-w-lg md:max-w-xl rounded-[32px] border border-white/60 p-6 md:p-10 text-center"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,236,244,0.75))",
        backdropFilter: "blur(14px)",
        boxShadow:
          "0 30px 60px -20px rgba(249,93,149,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex justify-center">
        <KawaiiBear size={170} />
      </div>
      <h1
        className="mt-3 text-4xl md:text-5xl"
        style={{ fontFamily: "Pacifico, cursive", color: "#f95d95" }}
      >
        I'm really sorry 🥺
      </h1>
      <p
        className="mx-auto mt-3 max-w-sm text-lg leading-relaxed"
        style={{ fontFamily: "Quicksand, sans-serif", color: "#7a3b5a" }}
      >
        I know I messed up...
        <br />
        Will you forgive me?
      </p>

      <div ref={areaRef} className="relative mt-8 flex min-h-40 items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            onClick={handleYes}
            aria-label="Yes, I forgive you"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="rounded-full px-8 py-3 font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#7ed957,#4bbd2b)",
              boxShadow: "0 0 24px rgba(126,217,87,0.7), 0 10px 20px -8px rgba(75,189,43,0.6)",
              fontFamily: "Nunito, sans-serif",
              fontSize: `${Math.min(1 + yesScale * 0.1, 1.6)}rem`,
            }}
          >
            YES 💚
          </motion.button>

          <motion.button
            onClick={handleNo}
            onMouseEnter={() => noClicks > 0 && dodge()}
            aria-label="No"
            whileTap={{ scale: 0.9 }}
            animate={
              noClicks > 0
                ? { x: noPos.left, y: noPos.top, scale: noPos.scale }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="rounded-full px-8 py-3 font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#ff7a92,#ff3b5f)",
              boxShadow: "0 10px 20px -8px rgba(255,59,95,0.6)",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            NO
          </motion.button>
        </div>

        {extraYes.map((_, i) => {
          const angle = (i / Math.max(extraYes.length, 1)) * Math.PI * 2;
          const radius = 90 + (i % 5) * 26;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.button
              key={i}
              onClick={handleYes}
              aria-label="Yes"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-5 py-2 font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#7ed957,#4bbd2b)",
                boxShadow: "0 0 16px rgba(126,217,87,0.6)",
                fontFamily: "Nunito, sans-serif",
                fontSize: `${0.9 + Math.min(yesScale * 0.05, 0.5)}rem`,
              }}
            >
              YES 💚
            </motion.button>
          );
        })}
      </div>

      {noClicks > 0 && (
        <p className="mt-6 text-sm" style={{ fontFamily: "Quicksand, sans-serif", color: "#b56a86" }}>
          {noClicks < 3
            ? "please? 🥺"
            : noClicks < 6
              ? "you can't say no forever…"
              : "look how many yeses there are 💕"}
        </p>
      )}
    </motion.div>
  );
}