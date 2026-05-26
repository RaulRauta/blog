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

          <footer className="mt-16 px-4 pb-6">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf7]/72 shadow-[0_28px_90px_rgba(35,53,31,0.08)] backdrop-blur-xl">
              <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.35fr_0.8fr_1fr] md:px-10">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-serif text-2xl font-normal tracking-normal text-secondary">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blush-soft text-base">
                      *
                    </span>
                    Enciclopedia Florilor
                  </h3>

                  <p className="max-w-sm text-sm leading-7 text-gray-700">
                    O arhiva calda de flori, ghiduri si idei pentru gradini cu
                    ritm lin, texturi naturale si detalii atent alese.
                  </p>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-normal text-secondary">
                    Navigare
                  </h4>

                  <ul className="space-y-2 text-sm font-medium text-gray-700">
                    <li>
                      <Link href="/" className="transition hover:text-primary">
                        Acasa
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="transition hover:text-primary"
                      >
                        Articole
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="transition hover:text-primary"
                      >
                        Despre
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="transition hover:text-primary"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-normal text-secondary">
                    Contact
                  </h4>

                  <div className="space-y-2 text-sm leading-7 text-gray-700">
                    <p>Email: contact@flori.ro</p>
                    <p>Pentru colaborari editoriale si proiecte botanice.</p>
                  </div>

                  <Link
                    href="/contact"
                    className="botanical-button mt-5 px-5 py-2.5 text-sm font-semibold"
                  >
                    Trimite mesaj
                  </Link>
                </div>
              </div>

              <div className="border-t border-secondary/10 bg-blush-soft/40 px-6 py-4 text-center text-xs text-gray-600">
                (c) {new Date().getFullYear()} Enciclopedia Florilor. Toate
                drepturile rezervate.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
