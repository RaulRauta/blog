import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre noi | Enciclopedia Florilor",
  description:
    "Află povestea Enciclopediei Florilor și de ce am creat acest spațiu dedicat frumuseții florilor.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[var(--primary)]"
        >
          <span aria-hidden="true">←</span>
          Înapoi acasă
        </Link>

        <section className="mb-14 rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl sm:p-10 lg:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Despre proiect
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Un spațiu dedicat frumuseții florilor
              </h1>

              <p className="max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                Enciclopedia Florilor a fost creată ca un loc unde informația,
                inspirația și estetica se întâlnesc. Fiecare floare are o
                poveste, o semnificație și o emoție pe care merită să o
                descoperim.
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-[var(--primary-soft)] via-white to-[var(--secondary-soft)] p-6 shadow-inner">
              <div className="rounded-[1.5rem] bg-white/80 p-6">
                <p className="mb-3 text-5xl">🌸</p>
                <h2 className="mb-3 text-2xl font-bold text-gray-950">
                  Flori, sens și inspirație
                </h2>
                <p className="text-sm leading-7 text-gray-600">
                  Scopul nostru este să facem lumea florilor mai accesibilă, mai
                  frumoasă și mai ușor de înțeles pentru oricine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-sm">
            <p className="mb-4 text-3xl">🌿</p>
            <h2 className="mb-3 text-xl font-bold text-gray-950">Îngrijire</h2>
            <p className="text-sm leading-7 text-gray-600">
              Articole și informații utile pentru cei care vor să înțeleagă mai
              bine cum se îngrijesc florile.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-sm">
            <p className="mb-4 text-3xl">💐</p>
            <h2 className="mb-3 text-xl font-bold text-gray-950">
              Semnificație
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              Fiecare floare transmite ceva. Explorăm simboluri, tradiții și
              emoții asociate florilor.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-sm">
            <p className="mb-4 text-3xl">✨</p>
            <h2 className="mb-3 text-xl font-bold text-gray-950">Inspirație</h2>
            <p className="text-sm leading-7 text-gray-600">
              Idei pentru buchete, decoruri, cadouri și momente speciale în care
              florile spun mai mult decât cuvintele.
            </p>
          </div>
        </section>

        <section className="mb-14 grid gap-8 rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
              Povestea noastră
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              De ce flori?
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
            <p>
              Florile sunt prezente în cele mai importante momente din viața
              oamenilor: bucurie, iubire, începuturi, amintiri și gesturi de
              recunoștință.
            </p>

            <p>
              Acest proiect își propune să adune informații utile și frumoase
              despre flori într-un format modern, ușor de citit și accesibil de
              pe orice dispozitiv.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-1 shadow-xl">
          <div className="rounded-[1.8rem] bg-white p-6 text-center sm:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
              Explorează mai departe
            </p>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Descoperă articolele noastre
            </h2>

            <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Continuă cu blogul și descoperă mai multe despre flori,
              simbolistică, îngrijire și inspirație florală.
            </p>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Mergi la blog
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
