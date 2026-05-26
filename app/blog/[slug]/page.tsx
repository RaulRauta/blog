import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleRenderer } from "@/components/article-builder/ArticleRenderer";
import { client, postBySlugQuery, type SanityPost, urlFor } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  return {
    title: post ? `${post.title} | Enciclopedia Florilor` : "Articol",
    description: post?.excerpt || "Articol publicat pe blog.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return (
      <main className="min-h-screen bg-transparent px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-8 text-center shadow-sm backdrop-blur-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-950">
            Articol inexistent
          </h1>
          <p className="mb-6 text-gray-600">
            Articolul pe care il cauti nu exista sau nu a fost publicat inca.
          </p>
          <Link
            href="/blog"
            className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Inapoi la blog
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(2000).height(1200).url()
    : null;

  return (
    <main className="min-h-screen bg-transparent">
      <article>
        <header className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:pb-12 sm:pt-14">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-primary"
          >
            <span aria-hidden="true">←</span>
            Inapoi la articole
          </Link>

          <div className="grid gap-8 rounded-[2rem] border border-white/50 bg-white/76 p-6 shadow-[0_30px_100px_rgba(31,41,55,0.14)] backdrop-blur-xl sm:p-9 lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
            <div className="flex flex-col justify-center">
              {post.categories && post.categories.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={`${category.title}-${index}`}
                      className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("ro-RO")}
                  </span>
                )}
                {post.author?.name && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{post.author.name}</span>
                  </>
                )}
              </div>
            </div>

            {imageUrl && (
              <div className="relative min-h-80 overflow-hidden rounded-[1.5rem] sm:min-h-[520px]">
                <Image
                  src={imageUrl}
                  alt={post.mainImage?.alt || post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <ArticleRenderer
          blocks={post.contentBlocks}
          fallbackBody={post.body}
        />

        <section className="mx-auto max-w-5xl px-4 pb-16 pt-4">
          <div className="rounded-[2rem] border border-white/50 bg-white/68 p-6 shadow-sm backdrop-blur-xl sm:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Continua explorarea
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-950">
                  Mai multe articole botanice
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Revino la colectia editoriala si descopera noi povesti florale.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Vezi blogul
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
