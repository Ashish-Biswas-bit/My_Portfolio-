"use client";

import { useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase-auth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiFolder,
  FiClock,
  FiMessageSquare,
  FiBookOpen,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
  { name: "Hero", href: "/admin/dashboard/hero", icon: FiUser },
  { name: "About", href: "/admin/dashboard/about", icon: FiUser },
  { name: "Skills", href: "/admin/dashboard/skills", icon: FiCode },
  { name: "Services", href: "/admin/dashboard/services", icon: FiBriefcase },
  { name: "Projects", href: "/admin/dashboard/projects", icon: FiFolder },
  { name: "Experience", href: "/admin/dashboard/experience", icon: FiClock },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: FiMessageSquare },
  { name: "Education", href: "/admin/dashboard/education", icon: FiBookOpen },
  { name: "Settings", href: "/admin/dashboard/settings", icon: FiSettings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/admin");
      } else {
        setUser(u);
      }
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#12122b] border-r border-white/5 flex flex-col transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            AB<span className="text-cyan-400">.</span> Admin
          </Link>
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[#0f0f23]/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <button
            className="lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={22} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-gray-500">{user.email}</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
