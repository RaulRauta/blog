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
    <header className="sticky top-0 z-[9999] border-b border-secondary/10 bg-[#fffdf7]/72 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3.5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 transition hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_12px_32px_rgba(35,53,31,0.08)] sm:h-12 sm:w-16">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-serif text-lg font-normal tracking-normal text-secondary sm:text-xl">
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
            className="botanical-button hidden px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            Exploreaza ghiduri
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Inchide meniul" : "Deschide meniul"}
            aria-expanded={open}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/82 text-secondary shadow-sm transition hover:bg-blush-soft md:hidden"
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
          <div className="rounded-3xl border border-white/70 bg-[#fffdf7]/84 p-3 shadow-[0_24px_70px_rgba(35,53,31,0.1)] backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold tracking-normal transition ${
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
