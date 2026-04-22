import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { flowers } from "@/lib/flowers";
import { client, postsQuery, type SanityPost, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Enciclopedia Florilor",
  description:
    "Descoperă informații despre flori, semnificația lor și articole utile despre îngrijire.",
};

export default async function Home() {
  const posts: SanityPost[] = await client.fetch(postsQuery);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-24">
          <h1 className="mb-4 text-center text-4xl font-bold">
            🌸 Enciclopedia Florilor
          </h1>

          <p className="mb-10 text-center text-gray-600">
            Descoperă frumusețea, semnificația și farmecul celor mai iubite
            flori.
          </p>

          <div className="relative mx-auto mt-10 hidden h-110 w-full max-w-5xl md:block">
            <Link
              href={`/flori/${flowers[0].slug}`}
              className="absolute left-0 top-10 block w-[50%] rotate-[-5deg] scale-95 opacity-85 transition duration-300 hover:z-20 hover:scale-100 hover:opacity-100"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative h-56 w-full">
                  <Image
                    src={flowers[0].image}
                    alt={flowers[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold">
                    {flowers[0].name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {flowers[0].description}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={`/flori/${flowers[1].slug}`}
              className="absolute left-1/2 top-5 block w-[50%] -translate-x-1/2 rotate-[4deg] scale-95 opacity-90 transition duration-300 hover:z-20 hover:scale-100 hover:opacity-100"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative h-56 w-full">
                  <Image
                    src={flowers[1].image}
                    alt={flowers[1].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold">
                    {flowers[1].name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {flowers[1].description}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href={`/flori/${flowers[2].slug}`}
              className="absolute right-0 top-0 z-10 block w-[50%] transition duration-300 hover:z-30 hover:scale-105"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <div className="relative h-56 w-full">
                  <Image
                    src={flowers[2].image}
                    alt={flowers[2].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold">
                    {flowers[2].name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {flowers[2].description}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="grid gap-6 md:hidden">
            {flowers.map((flower) => (
              <Link
                key={flower.slug}
                href={`/flori/${flower.slug}`}
                className="block overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="mb-2 text-xl font-semibold">{flower.name}</h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {flower.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
                Blog
              </p>
              <h2 className="mb-3 text-4xl font-bold tracking-tight text-gray-950">
                Articole recente
              </h2>
              <p className="text-base leading-7 text-gray-600">
                Citește cele mai noi articole despre flori, îngrijire,
                simbolistică și inspirație florală.
              </p>
            </div>

            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-gray-700 transition hover:text-pink-700"
            >
              Vezi toate articolele →
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {posts.slice(0, 2).map((post) => {
              const imageUrl = post.mainImage
                ? urlFor(post.mainImage).width(1200).height(800).url()
                : null;

              return (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {imageUrl && (
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "ro-RO",
                          )}
                        </span>
                      )}

                      {post.author?.name && <span>• {post.author.name}</span>}
                    </div>

                    <h3 className="mb-4 text-3xl font-bold tracking-tight text-gray-950">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-pink-700"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="mb-6 text-base leading-7 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {post.categories.map((category, index) => (
                          <span
                            key={`${category.title}-${index}`}
                            className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-green-600"
                    >
                      Citește articolul
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
