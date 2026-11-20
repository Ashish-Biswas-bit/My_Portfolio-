import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Biswas | Full Stack Web & Desktop Software Developer",
  description:
    "Ashish Biswas is a Full Stack Web & Desktop Software Developer building web applications and Python desktop software.",
  keywords: [
    "Ashish Biswas",
    "Full Stack Developer",
    "Desktop Software Developer",
    "Portfolio",
    "Next.js",
    "React",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased bg-ice-white text-deep-teal">{children}</body>
    </html>
  );
}
