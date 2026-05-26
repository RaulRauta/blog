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

          <footer className="relative mt-20 overflow-hidden px-4 pb-6 pt-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-blush/50 to-transparent" />
            <div className="pointer-events-none absolute left-[8%] top-16 h-52 w-52 rounded-full bg-blush/22 blur-3xl" />
            <div className="pointer-events-none absolute right-[10%] top-28 h-64 w-64 rounded-full bg-primary/18 blur-3xl" />

            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-white/70 bg-[#fffaf1]/78 shadow-[0_34px_110px_rgba(31,50,28,0.12)] backdrop-blur-xl">
              <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[26rem] overflow-hidden bg-secondary p-7 text-white sm:p-10 lg:p-12">
                  <div className="absolute -left-16 bottom-8 h-52 w-52 rounded-full bg-blush/20 blur-3xl" />
                  <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-white/12" />
                  <div className="relative flex h-full flex-col justify-between gap-14">
                    <div>
                      <p className="mb-5 text-sm font-semibold text-blush">
                        Ultima pagina
                      </p>
                      <blockquote className="max-w-xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl">
                        O gradina buna nu se termina la ultima floare. Ramane
                        in felul in care inveti sa privesti.
                      </blockquote>
                    </div>

                    <div>
                      <h2 className="font-serif text-3xl font-normal tracking-normal">
                        Enciclopedia Florilor
                      </h2>
                      <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
                        Un jurnal botanic despre flori, ingrijire si gradini cu
                        atmosfera, construit pentru citit incet si revenit des.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative p-7 sm:p-10 lg:p-12">
                  <div className="absolute right-8 top-8 hidden h-20 w-20 rounded-full bg-blush-soft blur-2xl sm:block" />
                  <div className="relative">
                    <p className="editorial-kicker mb-4">Continua explorarea</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { href: "/flori", label: "Atlasul florilor", text: "Profiluri botanice si inspiratie pentru gradina." },
                        { href: "/blog", label: "Jurnal botanic", text: "Ghiduri, povesti si lecturi de sezon." },
                        { href: "/about", label: "Despre proiect", text: "De ce exista Enciclopedia Florilor." },
                        { href: "/contact", label: "Scrie-ne", text: "Intrebari, colaborari si propuneri florale." },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group rounded-[1.5rem] border border-secondary/10 bg-white/42 p-4 transition duration-300 hover:-translate-y-1 hover:border-blush/40 hover:bg-white/68"
                        >
                          <span className="font-serif text-2xl font-normal leading-tight tracking-normal text-secondary transition group-hover:text-primary">
                            {item.label}
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-gray-600">
                            {item.text}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 rounded-[2rem] border border-blush/20 bg-blush-soft/70 p-5">
                      <p className="font-serif text-2xl font-normal leading-tight tracking-normal text-secondary">
                        Ai o floare, o terasa sau o gradina in minte?
                      </p>
                      <p className="mt-3 text-sm leading-7 text-gray-700">
                        Trimite-ne cateva randuri. Raspundem cu grija si cu
                        atentie la lumina, spatiu si sezon.
                      </p>
                      <Link
                        href="/contact"
                        className="botanical-button mt-5 px-5 py-2.5 text-sm font-semibold"
                      >
                        Trimite mesaj
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-secondary/10 bg-gradient-to-r from-primary-soft via-blush-soft to-white/30 px-6 py-5">
                <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-serif text-xl text-secondary">
                    Final de pagina, inceput de gradina.
                  </p>
                  <p className="text-xs">
                    (c) {new Date().getFullYear()} Enciclopedia Florilor
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
