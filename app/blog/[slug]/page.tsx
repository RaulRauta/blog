import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  client,
  previewClient,
  postBySlugQuery,
  type SanityPost,
  urlFor,
} from "@/lib/sanity";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const draft = await draftMode();
  const activeClient = draft.isEnabled ? previewClient : client;

  const post: SanityPost | null = await activeClient.fetch(postBySlugQuery, {
    slug,
  });

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

  const layout = post.layout || "standard";

  if (layout === "editorial") {
    return <EditorialArticle post={post} />;
  }

  if (layout === "gallery") {
    return <GalleryArticle post={post} />;
  }

  if (layout === "guide") {
    return <GuideArticle post={post} />;
  }

  return <StandardArticle post={post} />;
}

function ArticleMeta({ post }: { post: SanityPost }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
      {post.publishedAt && (
        <span>{new Date(post.publishedAt).toLocaleDateString("ro-RO")}</span>
      )}

      {post.author?.name && (
        <>
          <span>•</span>
          <span>{post.author.name}</span>
        </>
      )}
    </div>
  );
}

function CategoryPills({ post }: { post: SanityPost }) {
  if (!post.categories || post.categories.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {post.categories.map((category, index) => (
        <span
          key={`${category.title}-${index}`}
          className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]"
        >
          {category.title}
        </span>
      ))}
    </div>
  );
}

function ArticleBody({ post }: { post: SanityPost }) {
  return (
    <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-h2:text-3xl prose-p:leading-8 prose-a:text-[var(--primary)] prose-strong:text-gray-950">
      <PortableText value={post.body || []} />
    </div>
  );
}

function BackToBlog() {
  return (
    <Link
      href="/blog"
      className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[var(--primary)]"
    >
      <span aria-hidden="true">←</span>
      Înapoi la blog
    </Link>
  );
}

function BottomCTA() {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/50 bg-white/65 p-6 shadow-sm backdrop-blur-xl sm:p-8">
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
  );
}

function StandardArticle({ post }: { post: SanityPost }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(950).url()
    : null;

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-5xl">
        <BackToBlog />

        <header className="mb-10 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <CategoryPills post={post} />

          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              {post.excerpt}
            </p>
          )}

          <ArticleMeta post={post} />
        </header>

        {imageUrl && (
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-xl backdrop-blur-xl">
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

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:p-10">
          <ArticleBody post={post} />
        </div>

        <BottomCTA />
      </article>
    </main>
  );
}

function EditorialArticle({ post }: { post: SanityPost }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1800).height(1100).url()
    : null;

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-6xl">
        <BackToBlog />

        <header className="mb-10 grid gap-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <CategoryPills post={post} />

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mb-7 text-base leading-8 text-gray-600 sm:text-lg">
                {post.excerpt}
              </p>
            )}

            <ArticleMeta post={post} />
          </div>

          {imageUrl && (
            <div className="overflow-hidden rounded-[1.5rem]">
              <div className="relative h-72 w-full lg:h-[520px]">
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
        </header>

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:p-10">
          <ArticleBody post={post} />
        </div>

        <BottomCTA />
      </article>
    </main>
  );
}

function GalleryArticle({ post }: { post: SanityPost }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).url()
    : null;

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-6xl">
        <BackToBlog />

        <header className="mb-10 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10">
          <CategoryPills post={post} />

          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mb-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
              {post.excerpt}
            </p>
          )}

          <ArticleMeta post={post} />
        </header>

        {imageUrl && (
          <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-xl backdrop-blur-xl">
            <div className="relative h-72 w-full sm:h-[500px]">
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

        {post.galleryImages && post.galleryImages.length > 0 && (
          <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {post.galleryImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-sm backdrop-blur-xl"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={urlFor(image).width(900).height(700).url()}
                    alt={`Imagine galerie ${index + 1}`}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:p-10">
          <ArticleBody post={post} />
        </div>

        <BottomCTA />
      </article>
    </main>
  );
}

function GuideArticle({ post }: { post: SanityPost }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(950).url()
    : null;

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-6xl">
        <BackToBlog />

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="h-fit rounded-[2rem] border border-white/50 bg-white/65 p-6 shadow-xl backdrop-blur-xl lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
              Ghid pas cu pas
            </p>

            <h1 className="mb-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mb-6 text-sm leading-7 text-gray-600">
                {post.excerpt}
              </p>
            )}

            <ArticleMeta post={post} />

            {imageUrl && (
              <div className="mt-6 overflow-hidden rounded-2xl">
                <div className="relative h-56 w-full">
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
          </aside>

          <section className="rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur-xl sm:p-10">
            <CategoryPills post={post} />
            <ArticleBody post={post} />
          </section>
        </div>

        <BottomCTA />
      </article>
    </main>
  );
}
