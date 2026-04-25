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
  description: "Descoperă frumusețea și semnificația florilor.",
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
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/30 bg-white/35 shadow-xl backdrop-blur-xl">
              <div className="grid gap-8 px-6 py-10 md:grid-cols-3 md:px-10">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-950">
                    <span>🌸</span>
                    Enciclopedia Florilor
                  </h3>

                  <p className="max-w-sm text-sm leading-7 text-gray-700">
                    Un blog dedicat frumuseții, simbolurilor și poveștilor
                    florilor.
                  </p>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gray-950">
                    Navigare
                  </h4>

                  <ul className="space-y-2 text-sm font-medium text-gray-700">
                    <li>
                      <Link
                        href="/"
                        className="transition hover:text-[var(--primary)]"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="transition hover:text-[var(--primary)]"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="transition hover:text-[var(--primary)]"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="transition hover:text-[var(--primary)]"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gray-950">
                    Contact
                  </h4>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>Email: contact@flori.ro</p>
                    <p>Telefon: 07xx xxx xxx</p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Trimite mesaj
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/25 px-6 py-4 text-center text-xs text-gray-600">
                © {new Date().getFullYear()} Enciclopedia Florilor. Toate
                drepturile rezervate.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
