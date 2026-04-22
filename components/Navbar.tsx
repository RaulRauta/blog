"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] isolate border-b border-white/40 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/50 bg-white shadow-sm sm:h-11 sm:w-11">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight text-gray-950 sm:text-lg">
                Enciclopedia Florilor
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.24em] text-[var(--primary)] sm:block">
                Blog floral
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-2xl border border-white/50 bg-white/90 p-1.5 shadow-sm md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide text-gray-600 transition duration-200 hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            className="relative z-[10000] inline-flex items-center justify-center rounded-xl border-2 border-red-500 bg-yellow-300 p-2 text-black shadow-sm md:hidden"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="relative z-[10000] pb-4 md:hidden">
            <nav className="flex flex-col gap-2 rounded-2xl border border-white/50 bg-white p-3 shadow-xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-gray-700 transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
