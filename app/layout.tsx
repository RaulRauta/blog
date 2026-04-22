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
      <body className="min-h-full bg-gray-50 text-gray-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>

          <footer className="mt-16 border-t border-white/50 bg-white/85 backdrop-blur-sm">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  🌸 Enciclopedia Florilor
                </h3>
                <p className="text-sm text-gray-600">
                  Un blog dedicat frumuseții și semnificației florilor din
                  întreaga lume.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-900">Navigare</h4>
                <ul className="space-y-1 text-sm text-gray-600">
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
                <h4 className="mb-2 font-semibold text-gray-900">Contact</h4>
                <p className="text-sm text-gray-600">Email: contact@flori.ro</p>
                <p className="text-sm text-gray-600">Telefon: 07xx xxx xxx</p>
              </div>
            </div>

            <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} Enciclopedia Florilor. Toate
              drepturile rezervate.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
