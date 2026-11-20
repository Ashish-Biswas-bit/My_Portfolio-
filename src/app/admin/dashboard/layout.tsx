"use client";

import { useEffect, useState, ReactNode } from "react";
import { auth, onAuthStateChanged, signOut, User } from "@/lib/supabase-auth";
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
  FiArrowUpRight,
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
  const activePage =
    navItems.find((item) => item.href === pathname)?.name ?? "Dashboard";

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
      <div className="min-h-screen bg-ice-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-soft-peach border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="admin-shell min-h-screen bg-ice-white text-deep-teal">
      <aside
        id="admin-sidebar"
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-deep-teal/10 bg-white transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-deep-teal/10 px-6 py-5">
          <Link
            href="/admin/dashboard"
            className="group flex min-w-0 items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-deep-teal text-sm font-bold tracking-tight text-ice-white shadow-sm">
              AB<span className="text-soft-peach">.</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-deep-teal">
                Portfolio Studio
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-deep-teal/45">
                Admin workspace
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close admin navigation"
            aria-controls="admin-sidebar"
            className="rounded-lg p-2 text-deep-teal/60 transition hover:bg-deep-teal/5 hover:text-deep-teal lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX aria-hidden="true" size={19} />
          </button>
        </div>

        <nav
          aria-label="Admin sections"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-5"
        >
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-teal/40">
            Manage content
          </p>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-deep-teal text-ice-white shadow-sm"
                    : "text-deep-teal/65 hover:bg-deep-teal/[0.04] hover:text-deep-teal"
                }`}
              >
                <item.icon
                  aria-hidden="true"
                  size={17}
                  className={active ? "text-soft-peach" : "text-deep-teal/45 group-hover:text-soft-peach"}
                />
                {item.name}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-soft-peach" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-deep-teal/10 p-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 flex items-center justify-between rounded-xl border border-deep-teal/10 bg-ice-white px-3 py-2.5 text-xs font-medium text-deep-teal/70 transition hover:border-soft-peach/60 hover:text-deep-teal"
          >
            View live portfolio
            <FiArrowUpRight aria-hidden="true" size={15} />
          </a>
          <button
            onClick={() => signOut(auth)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-deep-teal/60 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut aria-hidden="true" size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[17rem]">
        <header className="admin-topbar sticky top-0 z-40 flex min-h-[4.5rem] items-center justify-between border-b border-deep-teal/[0.07] bg-ice-white/85 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-10">
          <button
            type="button"
            aria-label="Open admin navigation"
            aria-controls="admin-sidebar"
            aria-expanded={sidebarOpen}
            className="mr-3 rounded-xl border border-deep-teal/10 bg-white p-2.5 text-deep-teal transition hover:border-soft-peach/60 hover:bg-soft-peach/10 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu aria-hidden="true" size={19} />
          </button>

          <div
            aria-label={`Admin workspace, ${activePage}`}
            className="flex min-w-0 items-center gap-2 text-xs sm:text-sm"
          >
            <span className="hidden text-deep-teal/45 sm:inline">
              Workspace
            </span>
            <span aria-hidden="true" className="text-deep-teal/30">
              /
            </span>
            <span className="truncate font-semibold text-deep-teal">
              {activePage}
            </span>
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-3 pl-3">
            <span className="hidden max-w-56 truncate text-xs text-deep-teal/55 sm:block">
              {user.email}
            </span>
            <div
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-soft-peach/40 bg-soft-peach/15 text-xs font-bold uppercase text-deep-teal"
            >
              {user.email?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <main className="admin-content mx-auto w-full max-w-[90rem] px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-deep-teal/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
