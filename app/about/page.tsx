import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Enciclopedia Florilor",
  description: "Află mai multe despre Enciclopedia Florilor.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-4xl font-bold">Despre noi</h1>

        <p className="mb-4 leading-relaxed text-gray-700">
          Enciclopedia Florilor este un spațiu dedicat frumuseții, semnificației
          și diversității florilor. Scopul acestui site este să ofere informații
          clare, ușor de înțeles și plăcute vizual despre unele dintre cele mai
          iubite flori.
        </p>

        <p className="mb-4 leading-relaxed text-gray-700">
          Fie că vrei să afli ce simbolizează un trandafir, să descoperi
          eleganța lalelelor sau să înțelegi farmecul florii-soarelui, aici
          găsești o prezentare simplă și prietenoasă.
        </p>

        <p className="leading-relaxed text-gray-700">
          Acest proiect poate evolua în timp într-un blog complet, un catalog
          floral sau o platformă informativă dedicată iubitorilor de natură și
          grădinărit.
        </p>
      </div>
    </main>
  );
}
