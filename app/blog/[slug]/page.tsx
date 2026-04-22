import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import {
  client,
  postBySlugQuery,
  type SanityPost,
  urlFor,
} from "@/lib/sanity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug });

  return {
    title: post ? `${post.title} | Enciclopedia Florilor` : "Articol",
    description: post?.excerpt || "Articol publicat din Sanity CMS.",
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
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold">Articol inexistent ❌</h1>
      </main>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(700).url()
    : null;

  return (
    <main className="min-h-screen px-4 py-10">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
        <Link
          href="/blog"
          className="mb-6 inline-block text-gray-600 transition hover:text-black"
        >
          ← Înapoi la blog
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString("ro-RO")}
            </span>
          )}

          {post.author?.name && <span>• {post.author.name}</span>}
        </div>

        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

        {post.excerpt && (
          <p className="mb-8 text-lg text-gray-600">{post.excerpt}</p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span
                key={`${category.title}-${index}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {imageUrl && (
          <div className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <PortableText value={post.body || []} />
        </div>
      </article>
    </main>
  );
}