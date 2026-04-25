import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { client, postsQuery, type SanityPost, urlFor } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Enciclopedia Florilor",
  description:
    "Citește articole despre flori, semnificația lor și sfaturi de îngrijire.",
};

export default async function BlogPage() {
  const posts: SanityPost[] = await client.fetch(postsQuery);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-gray-500 transition hover:text-primary"
        >
          ← Înapoi
        </Link>

        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Blog
          </p>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-950">
            Articole despre flori
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            Descoperă articole despre semnificația florilor, îngrijirea lor și
            inspirație pentru un univers floral elegant și viu.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post) => {
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
                        {new Date(post.publishedAt).toLocaleDateString("ro-RO")}
                      </span>
                    )}

                    {post.author?.name && <span>• {post.author.name}</span>}
                  </div>

                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>

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
                          className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
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
      </div>
    </main>
  );
}
