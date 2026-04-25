import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
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
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-950">
            Articol inexistent
          </h1>
          <p className="mb-6 text-gray-600">
            Articolul pe care îl cauți nu există sau nu a fost publicat încă.
          </p>
          <Link
            href="/blog"
            className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Înapoi la blog
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(950).url()
    : null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[var(--primary)]"
        >
          <span aria-hidden="true">←</span>
          Înapoi la blog
        </Link>

        <header className="mb-10 rounded-[2rem] border border-white/70 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-wrap gap-2">
            {post.categories?.map((category, index) => (
              <span
                key={`${category.title}-${index}`}
                className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]"
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString("ro-RO")}
              </span>
            )}

            {post.author?.name && (
              <>
                <span>•</span>
                <span>{post.author.name}</span>
              </>
            )}
          </div>
        </header>

        {imageUrl && (
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-xl">
            <div className="relative h-72 w-full sm:h-[460px]">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm sm:p-10">
          <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-h2:text-3xl prose-p:leading-8 prose-a:text-[var(--primary)] prose-strong:text-gray-950">
            <PortableText value={post.body || []} />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
            Continuă explorarea
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950">
                Înapoi la articole
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Descoperă mai multe articole despre flori, simboluri și idei de
                îngrijire.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Vezi blogul
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
