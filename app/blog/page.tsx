import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { client, postsQuery, type SanityPost, urlFor } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Enciclopedia Florilor",
  description:
    "Articole despre flori, semnificații, îngrijire și inspirație florală.",
};

export default async function BlogPage() {
  const posts: SanityPost[] = await client.fetch(postsQuery);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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

        <section className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
            Blog floral
          </p>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Articole, idei și inspirație din lumea florilor
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Descoperă semnificații, sfaturi de îngrijire și povești despre
              flori, într-un spațiu creat pentru oameni care iubesc frumusețea
              naturală.
            </p>
          </div>
        </section>

        {featuredPost && (
          <section className="mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-400">
              Articol recomandat
            </p>

            <article className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                {featuredPost.mainImage && (
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="relative block h-72 overflow-hidden sm:h-96 lg:h-full"
                  >
                    <Image
                      src={urlFor(featuredPost.mainImage)
                        .width(1400)
                        .height(900)
                        .url()}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </Link>
                )}

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 sm:text-sm">
                    {featuredPost.publishedAt && (
                      <span>
                        {new Date(featuredPost.publishedAt).toLocaleDateString(
                          "ro-RO",
                        )}
                      </span>
                    )}

                    {featuredPost.author?.name && (
                      <>
                        <span>•</span>
                        <span>{featuredPost.author.name}</span>
                      </>
                    )}
                  </div>

                  {featuredPost.categories &&
                    featuredPost.categories.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2">
                        {featuredPost.categories.map((category, index) => (
                          <span
                            key={`${category.title}-${index}`}
                            className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="transition hover:text-[var(--primary)]"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="mb-7 text-sm leading-7 text-gray-600 sm:text-base">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Citește articolul
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
                Toate articolele
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                Ultimele postări
              </h2>
            </div>
          </div>

          {otherPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {otherPosts.map((post) => {
                const imageUrl = post.mainImage
                  ? urlFor(post.mainImage).width(1000).height(700).url()
                  : null;

                return (
                  <article
                    key={post._id}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {imageUrl && (
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    )}

                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:text-sm">
                        {post.publishedAt && (
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "ro-RO",
                            )}
                          </span>
                        )}

                        {post.author?.name && (
                          <>
                            <span>•</span>
                            <span>{post.author.name}</span>
                          </>
                        )}
                      </div>

                      <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-950">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition hover:text-[var(--primary)]"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {post.excerpt && (
                        <p className="mb-6 text-sm leading-7 text-gray-600">
                          {post.excerpt}
                        </p>
                      )}

                      {post.categories && post.categories.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {post.categories.map((category, index) => (
                            <span
                              key={`${category.title}-${index}`}
                              className="rounded-full bg-[var(--secondary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--secondary)]"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-[var(--primary)]"
                      >
                        Citește mai mult
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-gray-600 shadow-sm">
              Momentan există un singur articol publicat.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
