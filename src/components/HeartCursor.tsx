import { useEffect, useRef } from "react";

/** Emits tiny hearts that trail the cursor. Skips on touch and reduced-motion. */
export function HeartCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduce || touch) return;

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      const layer = layerRef.current;
      if (!layer) return;
      const h = document.createElement("span");
      h.textContent = "♥";
      h.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);color:#ff7fb0;font-size:${10 + Math.random() * 10}px;pointer-events:none;transition:transform 700ms ease-out,opacity 700ms ease-out;opacity:1;z-index:9999;`;
      layer.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transform = `translate(-50%,-50%) translateY(-40px) scale(0.4)`;
        h.style.opacity = "0";
      });
      setTimeout(() => h.remove(), 750);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" />;
}