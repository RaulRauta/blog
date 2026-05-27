import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flowers } from "@/lib/flowers";

function cleanFlowerName(name: string) {
  return name.trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const flower = flowers.find((f) => f.slug === slug);
  const name = flower ? cleanFlowerName(flower.name) : "Floare";

  return {
    title: `${name} | Enciclopedia Florilor`,
    description: flower?.description,
  };
}

export default async function FlowerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flower = flowers.find((f) => f.slug === slug);

  if (!flower) {
    notFound();
  }

  const name = cleanFlowerName(flower.name);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-16">
      <article className="mx-auto grid max-w-6xl gap-7 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="article-reveal">
          <Link
            href="/flori"
            className="mb-6 inline-flex text-sm font-semibold text-gray-600 transition hover:text-primary sm:mb-8"
          >
            Inapoi la flori
          </Link>

          <p className="editorial-kicker mb-3 sm:mb-4">Profil botanic</p>
          <h1 className="font-serif text-[2.75rem] font-normal leading-[1.05] tracking-normal text-secondary sm:text-6xl">
            {name}
          </h1>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-gray-700 sm:mt-6 sm:text-lg sm:leading-8">
            {flower.description}
          </p>

          <div className="premium-blush-surface mt-6 rounded-[1.5rem] p-5 sm:mt-8 sm:rounded-[2rem] sm:p-6">
            <p className="font-serif text-[1.45rem] leading-tight text-secondary sm:text-2xl">
              O floare buna schimba ritmul unei gradini: aduce culoare, volum
              si un punct de liniste in compozitie.
            </p>
          </div>
        </div>

        <div className="article-reveal relative min-h-[23rem] overflow-hidden rounded-[1.7rem] border border-white/70 shadow-[0_24px_66px_rgba(35,53,31,0.13)] sm:min-h-[32rem] sm:rounded-[2.5rem]">
          <Image
            src={flower.image}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 620px"
            className="premium-image object-cover"
          />
        </div>
      </article>
    </main>
  );
}
