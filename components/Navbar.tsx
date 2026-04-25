"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-9999 border-b border-white/40 bg-white/55 backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/60 bg-white shadow-sm sm:h-11 sm:w-17">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight text-gray-950 sm:text-lg">
                Enciclopedia Florilor
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.24em] text-primary sm:block">
                Blog floral
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-2xl border border-white/50 bg-white/45 p-1.5 shadow-sm backdrop-blur-xl md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition duration-200 ${
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-gray-600 hover:bg-primary-soft hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/95 text-gray-800 shadow-sm transition hover:bg-primary-soft hover:text-primary md:hidden"
          >
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            open ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/50 bg-white/60 p-3 shadow-xl backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold tracking-wide transition ${
                      isActive
                        ? "bg-primary-soft text-primary"
                        : "text-gray-700 hover:bg-secondary-soft hover:text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
