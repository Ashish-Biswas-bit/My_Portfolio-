import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <div className="section-container">{children}</div>
    </section>
  );
}
