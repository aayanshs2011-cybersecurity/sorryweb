import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Soft lo-fi piano loop (royalty free, hosted). Muted by default.
const SRC = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1f8f66ba5f.mp3?filename=lofi-study-112191.mp3";

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.35;
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        await a.play();
        setOn(true);
      } catch {
        // autoplay blocked; user click should succeed second time
      }
    }
  };

  return (
    <motion.button
      onClick={toggle}
      aria-label={on ? "Mute music" : "Play music"}
      aria-pressed={on}
      whileHover={{ scale: 1.1, rotate: 8 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
      style={{
        background: "linear-gradient(135deg,#ffb3d9,#ff7fb0)",
        boxShadow: "0 10px 30px -8px rgba(249,93,149,0.6)",
        color: "white",
      }}
    >
      {on ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3v18l-6-4H3v-10h3l6-4z" />
          <path d="M16 8a5 5 0 010 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3v18l-6-4H3v-10h3l6-4z" />
          <path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </motion.button>
  );
}