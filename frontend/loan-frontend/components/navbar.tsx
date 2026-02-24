"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict Risk" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
          <span className="font-brand text-xl font-semibold tracking-tight sm:text-2xl">LoanGuard AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--accent)] p-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium tracking-tight transition-colors ${
                    active
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "text-[var(--accent-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <a
            href="https://github.com/HarshBhimani18"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--secondary)] bg-[var(--secondary)] px-3 py-1.5 text-sm font-medium tracking-tight text-[var(--secondary-foreground)] transition-colors hover:opacity-90"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
