import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayoutRenderer } from "@/components/article-layouts/ArticleLayouts";
import { getDemoPostBySlug } from "@/lib/demoArticle";
import { client, postBySlugQuery, type SanityPost } from "@/lib/sanity";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  try {
    return (
      ((await client.fetch(postBySlugQuery, { slug })) as SanityPost | null) ||
      getDemoPostBySlug(slug)
    );
  } catch {
    return getDemoPostBySlug(slug);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

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
  const post = await getPost(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-transparent px-4 py-10 sm:py-16">
        <div className="premium-surface mx-auto max-w-3xl rounded-[1.5rem] p-6 text-center sm:rounded-[2rem] sm:p-8">
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

  return (
    <main className="min-h-screen bg-transparent">
      <ArticleLayoutRenderer post={post} />

      <section className="mx-auto max-w-5xl px-4 pb-12 pt-2 sm:pb-16 sm:pt-4">
        <div className="premium-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Continua explorarea
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-[1.55rem] tracking-normal text-gray-950 sm:text-2xl">
                Mai multe articole botanice
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Revino la colectia de articole si descopera noi povesti florale.
              </p>
            </div>
            <Link
              href="/blog"
                className="inline-flex w-full justify-center rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary sm:w-fit"
            >
              Vezi blogul
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
