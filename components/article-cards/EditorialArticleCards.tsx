import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import {
  imageUrl,
  type ArticleCardVariant,
  type SanityPost,
} from "@/lib/sanity";

type CardProps = {
  post: SanityPost;
  index?: number;
};

type VariantProps = CardProps & {
  variant?: ArticleCardVariant;
};

const variantPattern: ArticleCardVariant[] = [
  "imageFocus",
  "soft",
  "horizontal",
  "compact",
  "quote",
  "seasonal",
  "list",
];

function blockText(blocks?: PortableTextBlock[]) {
  if (!blocks) return "";

  return blocks
    .map((block) => {
      const children = (block as { children?: { text?: string }[] }).children;

      return children?.map((child) => child.text || "").join(" ") || "";
    })
    .join(" ");
}

export function readingTime(post: SanityPost) {
  const text = [
    post.title,
    post.excerpt,
    blockText(post.introText),
    blockText(post.secondaryText),
    blockText(post.body),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(2, Math.ceil(words / 210));
}

export function formatDate(date?: string) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCategories(post: SanityPost) {
  return post.categories?.map((category) => category.title).filter(Boolean) || [];
}

export function getCardVariant(post: SanityPost, index = 0) {
  if (post.cardVariant && post.cardVariant !== "auto") return post.cardVariant;

  return variantPattern[index % variantPattern.length];
}

function MetaLine({ post, light = false }: { post: SanityPost; light?: boolean }) {
  const date = formatDate(post.publishedAt);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-xs ${
        light ? "text-white/72" : "text-gray-500"
      }`}
    >
      {date && <span>{date}</span>}
      {date && <span aria-hidden="true">/</span>}
      <span>{readingTime(post)} min citire</span>
    </div>
  );
}

function CategoryBadges({
  post,
  light = false,
  limit = 2,
}: {
  post: SanityPost;
  light?: boolean;
  limit?: number;
}) {
  const categories = getCategories(post).slice(0, limit);

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
            light
              ? "bg-white/18 text-white backdrop-blur-xl"
              : "bg-blush-soft text-secondary"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function ArticleImage({
  post,
  width = 1200,
  height = 800,
  priority = false,
  className = "",
}: {
  post: SanityPost;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  if (!post.mainImage) return null;

  return (
    <Image
      src={imageUrl(post.mainImage, width, height)}
      alt={post.mainImage.alt || post.title}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={`premium-image object-cover ${className}`}
    />
  );
}

export function FeaturedArticleCard({ post }: CardProps) {
  return (
    <article className="group overflow-hidden rounded-[2.75rem] border border-white/70 bg-secondary text-white shadow-[0_34px_110px_rgba(35,53,31,0.2)]">
      <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
        <Link
          href={`/blog/${post.slug}`}
          className="relative min-h-[26rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[38rem]"
        >
          <ArticleImage post={post} width={1600} height={1100} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/72 via-secondary/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:hidden">
            <CategoryBadges post={post} light />
          </div>
        </Link>

        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
          <div>
            <p className="mb-5 text-sm font-semibold text-blush">
              Articol recomandat
            </p>
            <CategoryBadges post={post} light />
            <h2 className="mt-6 max-w-xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl">
              <Link href={`/blog/${post.slug}`} className="transition hover:text-blush">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="mt-6 max-w-lg text-base leading-8 text-white/72">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <MetaLine post={post} light />
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex w-fit rounded-full bg-[#fffdf7] px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
            >
              Citeste articolul
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ImageFocusCard({ post }: CardProps) {
  return (
    <article className="group article-reveal overflow-hidden rounded-[2.25rem] border border-white/70 bg-[#fffdf7]/78 shadow-[0_24px_78px_rgba(35,53,31,0.08)] transition duration-500 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="relative block h-80 overflow-hidden">
        <ArticleImage post={post} width={1100} height={900} />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/58 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <CategoryBadges post={post} light limit={1} />
          <h3 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-normal">
            {post.title}
          </h3>
        </div>
      </Link>
      <div className="p-5">
        <MetaLine post={post} />
        {post.excerpt && (
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}

export function SoftBotanicalCard({ post }: CardProps) {
  return (
    <article className="premium-blush-surface group article-reveal rounded-[2.25rem] p-5 transition duration-500 hover:-translate-y-1 sm:p-6">
      <CategoryBadges post={post} />
      <h3 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-normal text-secondary">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
          {post.title}
        </Link>
      </h3>
      {post.excerpt && (
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-700">
          {post.excerpt}
        </p>
      )}
      <div className="mt-7 flex items-center justify-between gap-4">
        <MetaLine post={post} />
        <span className="h-10 w-10 rounded-full bg-blush-soft" />
      </div>
    </article>
  );
}

export function HorizontalArticleCard({ post }: CardProps) {
  return (
    <article className="group article-reveal overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf7]/78 shadow-[0_20px_64px_rgba(35,53,31,0.07)] transition duration-500 hover:-translate-y-1">
      <div className="grid sm:grid-cols-[0.42fr_0.58fr]">
        <Link href={`/blog/${post.slug}`} className="relative min-h-56 overflow-hidden">
          <ArticleImage post={post} width={800} height={700} />
        </Link>
        <div className="p-5 sm:p-6">
          <CategoryBadges post={post} limit={1} />
          <h3 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-normal text-secondary">
            <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <div className="mt-5">
            <MetaLine post={post} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CompactArticleCard({ post }: CardProps) {
  return (
    <article className="article-reveal rounded-[1.75rem] border border-secondary/10 bg-white/48 p-5 transition duration-300 hover:border-blush/40 hover:bg-[#fffdf7]/82 sm:p-6">
      <MetaLine post={post} />
      <h3 className="mt-4 font-serif text-2xl font-normal leading-tight tracking-normal text-secondary">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
          {post.title}
        </Link>
      </h3>
      <CategoryBadges post={post} limit={1} />
    </article>
  );
}

export function QuoteStyleArticleCard({ post }: CardProps) {
  const quote = post.quoteText || post.excerpt;

  return (
    <article className="article-reveal rounded-[2.25rem] border border-blush/25 bg-[#fffaf4]/78 p-6 shadow-[0_20px_70px_rgba(92,66,52,0.07)] transition duration-500 hover:-translate-y-1 sm:p-7">
      <span className="font-serif text-6xl leading-none text-blush/70">“</span>
      <p className="mt-1 font-serif text-2xl font-normal leading-snug tracking-normal text-secondary">
        {quote}
      </p>
      <div className="mt-7 border-t border-secondary/10 pt-5">
        <h3 className="text-base font-semibold leading-6 text-secondary">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <div className="mt-3">
          <MetaLine post={post} />
        </div>
      </div>
    </article>
  );
}

export function ListStyleArticleCard({ post, index = 0 }: CardProps) {
  return (
    <article className="article-reveal border-b border-secondary/10 py-5">
      <div className="grid gap-4 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
        <span className="font-serif text-3xl text-blush">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-serif text-2xl font-normal leading-tight tracking-normal text-secondary">
            <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <div className="mt-3">
            <MetaLine post={post} />
          </div>
        </div>
        <CategoryBadges post={post} limit={1} />
      </div>
    </article>
  );
}

export function SeasonalHighlightCard({ post }: CardProps) {
  return (
    <article className="group article-reveal overflow-hidden rounded-[2.25rem] border border-white/70 bg-[#eef3e7]/78 shadow-[0_22px_72px_rgba(35,53,31,0.08)] transition duration-500 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <ArticleImage post={post} width={900} height={620} />
      </div>
      <div className="p-6">
        <span className="rounded-full bg-white/72 px-3 py-1 text-xs font-semibold text-primary">
          {post.seasonalLabel || "Inspiratie de sezon"}
        </span>
        <h3 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-normal text-secondary">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <div className="mt-5">
          <MetaLine post={post} />
        </div>
      </div>
    </article>
  );
}

export function EditorialArticleCard({
  post,
  index = 0,
  variant,
}: VariantProps) {
  const selectedVariant = variant || getCardVariant(post, index);

  if (selectedVariant === "compact") return <CompactArticleCard post={post} />;
  if (selectedVariant === "horizontal") return <HorizontalArticleCard post={post} />;
  if (selectedVariant === "soft") return <SoftBotanicalCard post={post} />;
  if (selectedVariant === "quote") return <QuoteStyleArticleCard post={post} />;
  if (selectedVariant === "list") {
    return <ListStyleArticleCard post={post} index={index} />;
  }
  if (selectedVariant === "seasonal") return <SeasonalHighlightCard post={post} />;

  return <ImageFocusCard post={post} />;
}
