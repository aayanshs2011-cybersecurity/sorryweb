import confetti from "canvas-confetti";

export function burstHearts(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ["#ff7fb0", "#ff5c8a", "#ffc9df", "#fff2a8", "#b8ff8a"],
    scalar: 0.9,
    shapes: ["circle"],
  });
}

export function bigCelebration() {
  const end = Date.now() + 1200;
  const colors = ["#ff7fb0", "#ff5c8a", "#ffc9df", "#fff2a8", "#b8ff8a", "#7ed957"];
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 200, spread: 160, startVelocity: 45, origin: { y: 0.5 }, colors });
}