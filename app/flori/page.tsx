import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { flowers } from "@/lib/flowers";

export const metadata: Metadata = {
  title: "Flori | Enciclopedia Florilor",
  description: "O selectie de flori pentru inspiratie botanica si gradina.",
};

function cleanFlowerName(name: string) {
  return name.split("ð")[0].trim();
}

export default function FlowersPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 max-w-3xl">
          <p className="editorial-kicker mb-3">Arhiva botanica</p>
          <h1 className="font-serif text-5xl font-normal leading-tight tracking-normal text-secondary sm:text-6xl">
            Flori pentru gradini calme, case luminoase si inspiratie de sezon.
          </h1>
          <p className="mt-5 text-base leading-8 text-gray-700">
            O selectie in crestere, pregatita sa fie legata de continutul
            editorial si de ghidurile din Sanity.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {flowers.map((flower) => (
            <Link
              key={flower.slug}
              href={`/flori/${flower.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf7]/78 shadow-[0_22px_70px_rgba(35,53,31,0.08)] transition duration-500 hover:-translate-y-1"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={flower.image}
                  alt={cleanFlowerName(flower.name)}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="premium-image object-cover"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-blush-soft px-3 py-1 text-xs font-semibold text-secondary">
                  Floare
                </span>
                <h2 className="mt-4 font-serif text-3xl font-normal tracking-normal text-secondary">
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
