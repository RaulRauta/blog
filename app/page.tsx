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
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-20 sm:mb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)] sm:text-sm">
              Enciclopedia Florilor
            </p>

            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              Flori, inspirație și frumusețe naturală
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Descoperă frumusețea, semnificația și farmecul celor mai iubite
              flori, într-un spațiu elegant și ușor de explorat.
            </p>
          </div>

          {/* desktop stacked cards */}
          <div className="relative mx-auto mt-10 hidden h-[440px] w-full max-w-5xl md:block">
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

          {/* mobile cards */}
          <div className="mt-8 grid gap-5 md:hidden">
            {flowers.map((flower) => (
              <Link
                key={flower.slug}
                href={`/flori/${flower.slug}`}
                className="group block overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-sm transition duration-300 active:scale-[0.99]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    Floare
                  </div>

                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-950">
                    {flower.name}
                  </h2>

                  <p className="text-sm leading-7 text-gray-600">
                    {flower.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)] sm:text-sm">
                Blog
              </p>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Articole recente
              </h2>
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Citește cele mai noi articole despre flori, îngrijire,
                simbolistică și inspirație florală.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-[var(--primary)]"
            >
              Vezi toate articolele
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
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
                      <div className="relative h-60 w-full overflow-hidden sm:h-72">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="p-5 sm:p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:text-sm">
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "ro-RO",
                          )}
                        </span>
                      )}

                      {post.author?.name && <span>• {post.author.name}</span>}
                    </div>

                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-[var(--primary)]"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="mb-6 text-sm leading-7 text-gray-600 sm:text-base">
                        {post.excerpt}
                      </p>
                    )}

                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {post.categories.map((category, index) => (
                          <span
                            key={`${category.title}-${index}`}
                            className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary)]"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-[var(--secondary)]"
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
