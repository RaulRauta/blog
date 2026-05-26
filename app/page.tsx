import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FlowerCarousel from "@/components/FlowerCarousel";
import { demoPosts } from "@/lib/demoArticle";
import { flowers } from "@/lib/flowers";
import { client, imageUrl, postsQuery, type SanityPost } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enciclopedia Florilor",
  description:
    "Descoperă informații despre flori, semnificația lor și articole utile despre îngrijire.",
};

async function getPosts() {
  try {
    return (await client.fetch(postsQuery)) as SanityPost[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const sanityPosts = await getPosts();
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));
  const posts = [
    ...demoPosts.filter((post) => !sanitySlugs.has(post.slug)),
    ...sanityPosts,
  ];

  return (
    <main className="min-h-screen bg-transparent px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-24 sm:mb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-secondary/70 sm:text-sm">
              Enciclopedia Florilor
            </p>

            <h1 className="mb-5 font-serif text-4xl font-normal tracking-normal text-gray-950 sm:text-5xl md:text-6xl">
              Flori, inspirație și frumusețe naturală
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Descoperă frumusețea, semnificația și farmecul celor mai iubite
              flori, într-un spațiu elegant și ușor de explorat.
            </p>
          </div>

          <FlowerCarousel flowers={flowers} />
        </section>

        <section>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary/70 sm:text-sm">
                Blog
              </p>
              <h2 className="mb-3 font-serif text-4xl font-normal tracking-normal text-gray-950">
                Articole recente
              </h2>
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Citește cele mai noi articole despre flori, îngrijire,
                simbolistică și inspirație florală.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-primary"
            >
              Vezi toate articolele
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {posts.slice(0, 2).map((post) => {
              const cardImageUrl = post.mainImage
                ? imageUrl(post.mainImage, 1200, 800)
                : null;

              return (
                <article
                  key={post._id}
                  className="group premium-surface overflow-hidden rounded-[1.75rem] transition duration-500 hover:-translate-y-1"
                >
                  {cardImageUrl && (
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-64 w-full overflow-hidden sm:h-80">
                        <Image
                          src={cardImageUrl}
                          alt={post.title}
                          fill
                          className="premium-image object-cover"
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

                    <h3 className="mb-4 font-serif text-3xl font-normal tracking-normal text-gray-950">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-primary"
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
                            className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-secondary"
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
