"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 50, y: 30 });
  const current = useRef({ x: 50, y: 30 });
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      layer.current?.style.setProperty("--glow-x", `${current.current.x}%`);
      layer.current?.style.setProperty("--glow-y", `${current.current.y}%`);
      frame.current = requestAnimationFrame(update);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = {
        x: 30 + (event.clientX / window.innerWidth) * 40,
        y: 15 + (event.clientY / window.innerHeight) * 35,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="ambient-background fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-glow absolute inset-0" />
    </div>
  );
}
