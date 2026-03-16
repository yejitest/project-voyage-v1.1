"use client";

import { useEffect, useState } from "react";

// 1 pixel unit = 10 svg px
const U = 10;
const OX = 91;
const OY = 96;

const PIXELS: { x: number; y: number; w: number; h: number; fill: string }[] = [
  // ── Fuselage main body
  { x: 6,  y: 8,  w: 24, h: 4,  fill: "#6C3FD6" },
  // ── Rear fuselage bump
  { x: 2,  y: 9,  w: 4,  h: 2,  fill: "#4A2499" },
  // ── Nose taper (3 steps)
  { x: 30, y: 8,  w: 4,  h: 4,  fill: "#6C3FD6" },
  { x: 34, y: 9,  w: 3,  h: 2,  fill: "#5A33B8" },
  { x: 37, y: 9,  w: 1,  h: 2,  fill: "#EDE9FF" },
  // ── Vertical tail fin
  { x: 7,  y: 4,  w: 3,  h: 4,  fill: "#6C3FD6" },
  { x: 8,  y: 2,  w: 2,  h: 2,  fill: "#6C3FD6" },
  { x: 9,  y: 1,  w: 1,  h: 1,  fill: "#4A2499" },
  // ── Horizontal stabilizer
  { x: 5,  y: 12, w: 6,  h: 2,  fill: "#6C3FD6" },
  { x: 4,  y: 13, w: 2,  h: 1,  fill: "#4A2499" },
  // ── Upper wing (out → root)
  { x: 14, y: 4,  w: 12, h: 2,  fill: "#6C3FD6" },
  { x: 12, y: 6,  w: 16, h: 2,  fill: "#6C3FD6" },
  { x: 11, y: 7,  w: 1,  h: 1,  fill: "#4A2499" },
  { x: 28, y: 7,  w: 1,  h: 1,  fill: "#4A2499" },
  // ── Lower wing (root → out)
  { x: 12, y: 12, w: 16, h: 2,  fill: "#6C3FD6" },
  { x: 14, y: 14, w: 12, h: 2,  fill: "#6C3FD6" },
  { x: 11, y: 12, w: 1,  h: 1,  fill: "#4A2499" },
  { x: 28, y: 13, w: 1,  h: 1,  fill: "#4A2499" },
  // ── Engine pod + stripe
  { x: 16, y: 16, w: 7,  h: 2,  fill: "#4A2499" },
  { x: 17, y: 15, w: 5,  h: 1,  fill: "#22C55E" },
  // ── Cockpit windows
  { x: 27, y: 8,  w: 4,  h: 2,  fill: "#93C5FD" },
  { x: 27, y: 10, w: 4,  h: 2,  fill: "#60A5FA" },
  // ── Jet exhaust trails
  { x: 0,  y: 9,  w: 2,  h: 1,  fill: "#FCD34D" },
  { x: 0,  y: 10, w: 2,  h: 1,  fill: "#FCA5A5" },
];

// How many extra ticks to hold the completed plane before wiping
const STAGGER_MS = 85;
const HOLD_STEPS = 15; // ~1.3 s hold

export default function PixelHeroScene() {
  // step: -1 = all invisible, 0‥N-1 = pixel i visible when step >= i
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const id = setInterval(() => {
      setStep(s => (s >= PIXELS.length - 1 + HOLD_STEPS ? -1 : s + 1));
    }, STAGGER_MS);
    return () => clearInterval(id);
  }, []);

  // Gentle float once the build is complete
  const isComplete = step >= PIXELS.length - 1;

  return (
    <div
      className="relative w-full select-none pointer-events-none"
      style={{ height: 360 }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 560 360"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          style={{
            animation: isComplete
              ? "heroFloat 3.6s ease-in-out infinite"
              : "none",
          }}
        >
          {PIXELS.map((p, i) => (
            <rect
              key={i}
              x={OX + p.x * U}
              y={OY + p.y * U}
              width={p.w * U}
              height={p.h * U}
              fill={p.fill}
              opacity={step >= i ? 1 : 0}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
