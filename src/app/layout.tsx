import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Biswas | Full Stack Developer",
  description:
    "Ashish Biswas - Full Stack Developer, Desktop App Developer & 2D Game Developer. Building modern web apps, powerful desktop software, and engaging games.",
  keywords: [
    "Ashish Biswas",
    "Full Stack Developer",
    "Desktop App Developer",
    "Game Developer",
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
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
