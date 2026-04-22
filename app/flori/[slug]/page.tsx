import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { flowers } from "@/lib/flowers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const flower = flowers.find((f) => f.slug === slug);

  return {
    title: flower ? flower.name : "Floare",
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
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold">Floare inexistentă ❌</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-gray-600 transition hover:text-black"
        >
          ← Înapoi
        </Link>

        <article className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="relative h-80 w-full">
            <Image
              src={flower.image}
              alt={flower.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold">{flower.name}</h1>

            <p className="leading-relaxed text-gray-600">
              {flower.description}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}