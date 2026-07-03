import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Deco = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  kind: "heart" | "flower" | "sparkle" | "bow" | "petal" | "butterfly";
};

const KINDS: Deco["kind"][] = ["heart", "flower", "sparkle", "bow", "petal", "butterfly"];

function DecoShape({ kind, size }: { kind: Deco["kind"]; size: number }) {
  const s = size;
  switch (kind) {
    case "heart":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 21s-7-4.5-9.5-9C.8 8.7 3 5 6.5 5 8.6 5 10.4 6.2 12 8c1.6-1.8 3.4-3 5.5-3C21 5 23.2 8.7 21.5 12c-2.5 4.5-9.5 9-9.5 9z" fill="#ff7fb0" opacity="0.85" />
        </svg>
      );
    case "flower":
      return (
        <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="20" cy="10" rx="6" ry="9" fill="#ffc9df" transform={`rotate(${r} 20 20)`} />
          ))}
          <circle cx="20" cy="20" r="5" fill="#fff2a8" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="#fff2a8" stroke="#ffd166" strokeWidth="0.5" />
        </svg>
      );
    case "bow":
      return (
        <svg width={s} height={s} viewBox="0 0 40 24" aria-hidden>
          <path d="M20 12 L4 4 L4 20 Z" fill="#ff9ec3" />
          <path d="M20 12 L36 4 L36 20 Z" fill="#ff9ec3" />
          <circle cx="20" cy="12" r="4" fill="#ff5c8a" />
        </svg>
      );
    case "petal":
      return (
        <svg width={s} height={s} viewBox="0 0 20 20" aria-hidden>
          <ellipse cx="10" cy="10" rx="4" ry="9" fill="#ffd1e4" />
        </svg>
      );
    case "butterfly":
      return (
        <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden>
          <ellipse cx="12" cy="16" rx="10" ry="12" fill="#ffb3d9" />
          <ellipse cx="28" cy="16" rx="10" ry="12" fill="#ffb3d9" />
          <ellipse cx="12" cy="24" rx="7" ry="8" fill="#ffd6ea" />
          <ellipse cx="28" cy="24" rx="7" ry="8" fill="#ffd6ea" />
          <rect x="19" y="10" width="2" height="22" rx="1" fill="#7a3b5a" />
        </svg>
      );
  }
}

export function BackgroundDecorations({ count = 26 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = useMemo<Deco[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 18 + Math.random() * 36,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 14,
        kind: KINDS[Math.floor(Math.random() * KINDS.length)],
      })),
    [count, mounted],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        dur: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [mounted],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* pastel gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 10%, #ffe4ee 0%, transparent 60%)," +
            "radial-gradient(1000px 700px at 80% 20%, #ffd6ea 0%, transparent 55%)," +
            "linear-gradient(180deg, #fff5f8 0%, #ffe4ee 60%, #ffd1e4 100%)",
        }}
      />
      {mounted && items.map((it) => (
        <span
          key={it.id}
          className="absolute bottom-[-60px]"
          style={{
            left: `${it.left}%`,
            animation: `float-up ${it.duration}s linear ${it.delay}s infinite`,
          }}
        >
          <DecoShape kind={it.kind} size={it.size} />
        </span>
      ))}
      {mounted && stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="#fff2a8" />
          </svg>
        </span>
      ))}

      {/* Parallax butterfly */}
      <motion.div
        className="absolute"
        style={{ top: "18%", left: "10%" }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <DecoShape kind="butterfly" size={40} />
      </motion.div>
      <motion.div
        className="absolute"
        style={{ top: "60%", right: "8%" }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <DecoShape kind="butterfly" size={34} />
      </motion.div>
    </div>
  );
}