import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enciclopedia Florilor",
  description:
    "Ghiduri botanice, flori si inspiratie pentru gradini elegante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-gray-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>

          <footer className="relative mt-10 px-3 pb-5 pt-6 sm:mt-16 sm:px-4 sm:pb-6 sm:pt-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-blush/45 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-64 -translate-x-1/2 rounded-full bg-blush/14 blur-3xl sm:h-40 sm:w-80" />

            <div className="mx-auto max-w-6xl rounded-[1.45rem] border border-white/70 bg-[#fffaf1]/68 px-4 py-5 shadow-[0_14px_44px_rgba(31,50,28,0.07)] backdrop-blur-xl sm:rounded-[2rem] sm:px-7 sm:py-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <p className="editorial-kicker mb-2 sm:mb-3">Enciclopedia Florilor</p>
                  <p className="font-serif text-[1.7rem] font-normal leading-tight tracking-normal text-secondary sm:text-3xl">
                    Final de pagina, inceput de gradina.
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-gray-600 sm:mt-3">
                    Flori, ghiduri si inspiratie botanica pentru citit incet.
                  </p>
                </div>

                <nav className="grid grid-cols-2 gap-2 text-sm font-semibold text-gray-700 sm:flex sm:flex-wrap">
                  {[
                    { href: "/", label: "Acasa" },
                    { href: "/flori", label: "Flori" },
                    { href: "/blog", label: "Articole" },
                    { href: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-secondary/10 bg-white/38 px-4 py-2 text-center transition hover:border-blush/40 hover:bg-blush-soft hover:text-secondary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-secondary/10 pt-4 text-xs text-gray-500 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                <p>contact@flori.ro</p>
                <p>(c) {new Date().getFullYear()} Enciclopedia Florilor</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
