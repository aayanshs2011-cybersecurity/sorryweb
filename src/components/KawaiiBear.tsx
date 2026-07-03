import { motion } from "framer-motion";

type Props = {
  mood?: "sorry" | "happy";
  size?: number;
};

/** Original kawaii bear illustration built with SVG (no copyrighted art). */
export function KawaiiBear({ mood = "sorry", size = 180 }: Props) {
  const blush = "#ff9ec3";
  const fur = "#f7d9b6";
  const furDark = "#e8b98a";
  const inner = "#fff1e0";

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-label="Cute bear"
      role="img"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 12 }}
      style={{ animation: "bear-bounce 2.4s ease-in-out infinite" }}
    >
      {/* ears */}
      <circle cx="55" cy="55" r="22" fill={fur} stroke={furDark} strokeWidth="2" />
      <circle cx="145" cy="55" r="22" fill={fur} stroke={furDark} strokeWidth="2" />
      <circle cx="55" cy="55" r="11" fill={inner} />
      <circle cx="145" cy="55" r="11" fill={inner} />
      {/* head */}
      <ellipse cx="100" cy="105" rx="68" ry="60" fill={fur} stroke={furDark} strokeWidth="2" />
      {/* muzzle */}
      <ellipse cx="100" cy="125" rx="34" ry="24" fill={inner} />
      {/* cheeks */}
      <circle cx="55" cy="120" r="10" fill={blush} opacity="0.7" />
      <circle cx="145" cy="120" r="10" fill={blush} opacity="0.7" />
      {/* eyes */}
      {mood === "sorry" ? (
        <>
          <path d="M70 100 q10 -12 20 0" stroke="#3b2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M110 100 q10 -12 20 0" stroke="#3b2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M70 105 q10 -14 20 0" stroke="#3b2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M110 105 q10 -14 20 0" stroke="#3b2a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="80" cy="102" r="2" fill="#fff" />
          <circle cx="120" cy="102" r="2" fill="#fff" />
        </>
      )}
      {/* nose */}
      <ellipse cx="100" cy="118" rx="6" ry="4.5" fill="#3b2a2a" />
      {/* mouth */}
      {mood === "sorry" ? (
        <path d="M92 135 q8 6 16 0" stroke="#3b2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M88 132 q12 12 24 0" stroke="#3b2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {/* heart / flower in paws */}
      <g transform="translate(100 172)">
        <path
          d="M0 8 C -14 -6 -22 6 -8 14 L 0 22 L 8 14 C 22 6 14 -6 0 8 Z"
          fill="#ff5c8a"
          stroke="#e63e70"
          strokeWidth="1.5"
        />
      </g>
      {/* paws */}
      <ellipse cx="70" cy="170" rx="14" ry="10" fill={fur} stroke={furDark} strokeWidth="2" />
      <ellipse cx="130" cy="170" rx="14" ry="10" fill={fur} stroke={furDark} strokeWidth="2" />
      {/* tiny bow */}
      <g transform="translate(55 40)">
        <path d="M0 0 l-8 -6 v12 z" fill="#ff7fb0" />
        <path d="M0 0 l8 -6 v12 z" fill="#ff7fb0" />
        <circle cx="0" cy="0" r="3" fill="#ff5c8a" />
      </g>
    </motion.svg>
  );
}