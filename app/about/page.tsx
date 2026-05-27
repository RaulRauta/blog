import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre noi | Enciclopedia Florilor",
  description:
    "Povestea Enciclopediei Florilor, o revista botanica premium pentru flori, gradini si inspiratie calma.",
};

const values = [
  {
    title: "Ingrijire",
    text: "Ghiduri clare despre lumina, apa, sol si ritmul firesc al fiecarei flori.",
  },
  {
    title: "Semnificatie",
    text: "Povesti, simboluri si detalii care transforma o planta intr-o prezenta cu sens.",
  },
  {
    title: "Inspiratie",
    text: "Idei pentru gradini, terase si colturi botanice cu atmosfera calda.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 py-7 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-primary sm:mb-8"
        >
          <span aria-hidden="true">{"<"}</span>
          Inapoi acasa
        </Link>

        <section className="premium-blush-surface article-reveal mb-10 rounded-[1.6rem] p-5 sm:mb-14 sm:rounded-[2.5rem] sm:p-10 lg:p-14">
          <p className="editorial-kicker mb-3 sm:mb-4">Despre proiect</p>

          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="font-serif text-[2.75rem] font-normal leading-[1.03] tracking-normal text-secondary sm:text-6xl">
                O revista botanica pentru flori, gradini si citit incet.
              </h1>

              <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-gray-700 sm:mt-6 sm:text-lg sm:leading-8">
                Enciclopedia Florilor aduna ghiduri, inspiratie si povesti
                botanice intr-un spatiu cald, aerisit si usor de explorat.
                Fiecare floare este tratata ca parte dintr-o gradina vie, nu ca
                un simplu subiect de arhiva.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/70 bg-white/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl sm:rounded-[2rem] sm:p-7">
              <p className="editorial-kicker mb-3">Misiune</p>
              <p className="font-serif text-[1.75rem] leading-tight text-secondary sm:text-3xl">
                Sa facem lumea florilor mai clara, mai frumoasa si mai aproape
                de ritmul natural al casei si gradinii.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-4 sm:mb-14 md:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.title}
              className="premium-surface article-reveal rounded-[1.45rem] p-5 sm:rounded-[2rem] sm:p-7"
            >
              <div className="mb-5 h-9 w-9 rounded-full bg-blush-soft shadow-[0_0_26px_rgba(209,142,134,0.34)]" />
              <h2 className="font-serif text-[1.8rem] font-normal tracking-normal text-secondary sm:text-3xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <section className="premium-surface-strong article-reveal mb-10 grid gap-6 rounded-[1.6rem] p-5 sm:mb-14 sm:rounded-[2.25rem] sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="editorial-kicker mb-3">Povestea noastra</p>
            <h2 className="font-serif text-[2.1rem] font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
              De ce flori?
            </h2>
          </div>

          <div className="space-y-4 text-[0.96rem] leading-7 text-gray-700 sm:text-base sm:leading-8">
            <p>
              Florile apar in momentele in care oamenii cauta frumusete,
              liniste, inceputuri si gesturi cu sens. Tocmai de aceea merita un
              loc editorial care le trateaza cu atentie.
            </p>

            <p>
              Proiectul creste ca o biblioteca botanica vie: ghiduri utile,
              imagini calde si recomandari pentru spatii verzi cu personalitate.
            </p>
          </div>
        </section>

        <section className="article-reveal overflow-hidden rounded-[1.7rem] border border-white/70 bg-secondary p-5 text-white shadow-[0_26px_76px_rgba(31,50,28,0.2)] sm:rounded-[2.5rem] sm:p-10">
          <p className="mb-3 text-sm font-semibold text-blush">
            Exploreaza mai departe
          </p>
          <h2 className="max-w-2xl font-serif text-[2.05rem] font-normal leading-tight tracking-normal sm:text-5xl">
            Descopera articolele si florile care dau ritm Enciclopediei.
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex justify-center rounded-full bg-[#fffaf1] px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
            >
              Mergi la articole
            </Link>
            <Link
              href="/flori"
              className="inline-flex justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-blush/70 hover:bg-white/10"
            >
              Vezi florile
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
