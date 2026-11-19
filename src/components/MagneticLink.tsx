"use client";

import { type ReactNode, useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function MagneticLink({
  href,
  children,
  className = "",
  target,
  rel,
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);

  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    linkRef.current?.style.setProperty("transform", "translate3d(0, 0, 0)");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;
    if (!link) return;
    const bounds = link.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      link.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
    });
  };

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={rel}
      className={`magnetic-link ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </a>
  );
}
