import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { flowers } from "@/lib/flowers";

export const metadata: Metadata = {
  title: "Flori | Enciclopedia Florilor",
  description: "O selectie de flori pentru inspiratie botanica si gradina.",
};

function cleanFlowerName(name: string) {
  return name.trim();
}

export default function FlowersPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 max-w-3xl sm:mb-10">
          <p className="editorial-kicker mb-3">Arhiva botanica</p>
          <h1 className="font-serif text-[2.65rem] font-normal leading-[1.05] tracking-normal text-secondary sm:text-6xl">
            Flori pentru gradini calme, case luminoase si inspiratie de sezon.
          </h1>
          <p className="mt-4 text-[0.98rem] leading-7 text-gray-700 sm:mt-5 sm:text-base sm:leading-8">
            O selectie in crestere pentru cititori care cauta flori frumoase,
            usor de inteles si potrivite pentru gradini cu personalitate.
          </p>
        </section>

        <section className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {flowers.map((flower) => (
            <Link
              key={flower.slug}
              href={`/flori/${flower.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-white/70 bg-[#fffdf7]/78 shadow-[0_18px_52px_rgba(35,53,31,0.075)] transition duration-500 hover:-translate-y-1 sm:rounded-[2rem]"
            >
              <div className="relative h-56 overflow-hidden sm:h-72">
                <Image
                  src={flower.image}
                  alt={cleanFlowerName(flower.name)}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="premium-image object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <span className="rounded-full bg-blush-soft px-3 py-1 text-xs font-semibold text-secondary">
                  Floare
                </span>
                <h2 className="mt-3 font-serif text-[1.8rem] font-normal tracking-normal text-secondary sm:mt-4 sm:text-3xl">
                  {cleanFlowerName(flower.name)}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                  {flower.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
