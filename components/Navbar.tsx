"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Acasa" },
  { href: "/blog", label: "Articole" },
  { href: "/about", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[9999] border-b border-secondary/10 bg-[#fffdf7]/78 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2 py-2.5 sm:gap-4 sm:py-3.5">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2.5 transition hover:opacity-90 sm:gap-3 md:flex-none"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[0.9rem] border border-white/80 bg-white shadow-[0_10px_24px_rgba(35,53,31,0.08)] sm:h-12 sm:w-16 sm:rounded-2xl">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-serif text-[1.05rem] font-normal leading-tight tracking-normal text-secondary sm:text-xl">
                Enciclopedia Florilor
              </p>
              <p className="hidden text-[11px] font-medium text-primary sm:block">
                Revista botanica pentru gradini calme
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/48 p-1 shadow-[0_14px_46px_rgba(35,53,31,0.07)] backdrop-blur-xl md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold tracking-normal transition duration-300 ${
                    isActive
                      ? "bg-blush-soft text-secondary"
                      : "text-gray-600 hover:bg-blush-soft hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/blog"
            className="hidden items-center justify-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-[#fffdf7] shadow-[0_16px_42px_rgba(35,53,31,0.16)] transition hover:-translate-y-0.5 hover:bg-[#2f4827] hover:shadow-[0_18px_48px_rgba(31,50,28,0.24)] lg:inline-flex"
          >
            Exploreaza ghiduri
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Inchide meniul" : "Deschide meniul"}
            aria-expanded={open}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-white/70 bg-white/82 text-secondary shadow-[0_10px_28px_rgba(35,53,31,0.08)] transition hover:bg-blush-soft md:hidden"
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
            open ? "max-h-80 pb-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[1.5rem] border border-white/70 bg-[#fffdf7]/88 p-2 shadow-[0_18px_54px_rgba(35,53,31,0.1)] backdrop-blur-xl">
            <nav className="grid grid-cols-2 gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-[1.1rem] px-4 py-3 text-center text-sm font-semibold tracking-normal transition ${
                      isActive
                        ? "bg-blush-soft text-secondary"
                        : "text-gray-700 hover:bg-primary-soft hover:text-secondary"
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
