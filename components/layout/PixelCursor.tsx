"use client";

import { useEffect } from "react";

const COLORS = [
  "#6C3FD6", // purple-600
  "#22C55E", // green-500
  "#EA580C", // orange
  "#C4A8F8", // purple-200
  "#4A2499", // purple-800
  "#86EFAC", // green-300
  "#F97316", // orange-400
];

export default function PixelCursor() {
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 35) return;
      lastTime = now;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) < 6) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const count = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const size = Math.floor(Math.random() * 5) + 3;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const ox = (Math.random() - 0.5) * 18;
        const oy = (Math.random() - 0.5) * 8;

        el.style.cssText = `
          position:fixed;
          left:${e.clientX + ox - size / 2}px;
          top:${e.clientY + oy - size / 2}px;
          width:${size}px;
          height:${size}px;
          background:${color};
          pointer-events:none;
          image-rendering:pixelated;
          z-index:9999;
          animation:pixelTrail 0.65s ease-out forwards;
        `;

        document.body.appendChild(el);
        el.addEventListener("animationend", () => el.remove(), { once: true });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
