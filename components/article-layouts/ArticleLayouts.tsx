import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanityPost } from "@/lib/sanity";
import { imageUrl } from "@/lib/sanity";

type LayoutProps = {
  post: SanityPost;
};

function BackLink() {
  return (
    <Link
      href="/blog"
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary/70 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-secondary sm:mb-8 sm:tracking-[0.18em]"
    >
      <span aria-hidden="true">←</span>
      Inapoi la articole
    </Link>
  );
}

function ArticleMeta({ post, light = false }: { post: SanityPost; light?: boolean }) {
  return (
    <div
      className={`mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-white/65" : "text-secondary/55"
      }`}
    >
      {post.publishedAt && (
        <span>{new Date(post.publishedAt).toLocaleDateString("ro-RO")}</span>
      )}
      {post.author?.name && (
        <>
          <span aria-hidden="true">•</span>
          <span>{post.author.name}</span>
        </>
      )}
    </div>
  );
}

function CategoryPills({ post, light = false }: { post: SanityPost; light?: boolean }) {
  if (!post.categories || post.categories.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {post.categories.map((category, index) => (
        <span
          key={`${category.title}-${index}`}
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            light
              ? "border border-white/15 bg-white/10 text-white/80"
              : "border border-secondary/10 bg-white/58 text-secondary"
          }`}
        >
          {category.title}
        </span>
      ))}
    </div>
  );
}

function RichText({ value, light = false }: { value?: PortableTextBlock[]; light?: boolean }) {
  if (!value || value.length === 0) return null;

  return (
    <div className={`article-rich-text ${light ? "article-rich-text-light" : ""}`}>
      <PortableText value={value} />
    </div>
  );
}

function Figure({
  image,
  title,
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image?: SanityImage;
  title?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!image) return null;

  return (
    <figure className={className}>
      <Image
        src={imageUrl(image, 2000, 1300)}
        alt={image.alt || title || "Imagine articol"}
        fill
        priority={priority}
        sizes={sizes}
        className={`premium-image object-cover ${imgClassName}`}
      />
      {image.caption && (
        <figcaption className="absolute bottom-4 left-4 right-4 rounded-full border border-white/45 bg-white/78 px-4 py-2 text-xs text-secondary/70 backdrop-blur-xl">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Quote({ post, light = false }: { post: SanityPost; light?: boolean }) {
  if (!post.quoteText) return null;

  return (
    <blockquote
      className={`article-reveal relative rounded-[1.5rem] border px-5 py-6 font-serif sm:rounded-[2rem] sm:px-10 sm:py-8 ${
        light
          ? "border-white/12 bg-white/8 text-white"
          : "border-secondary/10 bg-white/58 text-gray-950"
      }`}
    >
      <span className={`mb-3 block text-6xl leading-none ${light ? "text-white/20" : "text-primary/30"}`}>
        &quot;
      </span>
      <p className="text-[1.65rem] leading-tight tracking-normal sm:text-4xl">
        {post.quoteText}
      </p>
      {post.quoteAttribution && (
        <footer
          className={`mt-4 text-xs font-sans font-semibold uppercase tracking-[0.22em] ${
            light ? "text-white/60" : "text-primary"
          }`}
        >
          {post.quoteAttribution}
        </footer>
      )}
    </blockquote>
  );
}

function Checklist({ post }: LayoutProps) {
  if (!post.checklistItems || post.checklistItems.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {post.checklistItems.map((item, index) => (
        <div key={item._key || index} className="article-reveal premium-surface rounded-[1.25rem] p-4 sm:rounded-[1.5rem] sm:p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white shadow-sm">
            {index + 1}
          </div>
          <h3 className="font-serif text-xl text-gray-950">{item.title}</h3>
          {item.text && <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>}
        </div>
      ))}
    </div>
  );
}

function Cards({ post }: LayoutProps) {
  if (!post.infoCards || post.infoCards.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      {post.infoCards.map((card, index) => (
        <article key={card._key || index} className="article-reveal group premium-surface overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
          {card.image && (
            <div className="relative h-52">
              <Figure image={card.image} title={card.title} sizes="33vw" />
            </div>
          )}
          <div className="p-5">
            <h3 className="font-serif text-xl text-gray-950">{card.title}</h3>
            {card.text && <p className="mt-2 text-sm leading-7 text-gray-600">{card.text}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

function Gallery({ post, columns = "md:grid-cols-3" }: LayoutProps & { columns?: string }) {
  if (!post.galleryImages || post.galleryImages.length === 0) return null;

  return (
    <div className={`grid gap-3 sm:gap-4 ${columns}`}>
      {post.galleryImages.map((image, index) => (
        <div
          key={`${image.asset?._ref || image.asset?._id}-${index}`}
          className={`article-reveal relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] ${
            index === 0 ? "min-h-[17rem] sm:min-h-[360px]" : "min-h-[13rem] sm:min-h-[260px]"
          }`}
        >
          <Figure image={image} title={post.title} sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      ))}
    </div>
  );
}

function Callout({ post, light = false }: { post: SanityPost; light?: boolean }) {
  if (!post.callout?.title && !post.callout?.text) return null;

  const button = post.callout?.buttonLabel && post.callout.buttonHref;

  return (
    <aside
      className={`article-reveal rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-8 ${
        light ? "border border-white/12 bg-white/8 text-white" : "premium-surface text-gray-950"
      }`}
    >
      {post.callout?.title && (
        <h3 className="font-serif text-3xl tracking-normal">{post.callout.title}</h3>
      )}
      {post.callout?.text && (
        <p className={`mt-3 text-sm leading-7 ${light ? "text-white/70" : "text-gray-600"}`}>
          {post.callout.text}
        </p>
      )}
      {button && (
        <Link
          href={post.callout!.buttonHref!}
          className="mt-6 inline-flex rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary"
        >
          {post.callout!.buttonLabel}
        </Link>
      )}
    </aside>
  );
}

function RelatedArticles({ post }: LayoutProps) {
  if (!post.relatedArticles || post.relatedArticles.length === 0) return null;

  return (
    <section className="article-reveal mx-auto max-w-7xl px-4 py-9 sm:py-12">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary/60">
            Continua lectura
          </p>
          <h2 className="font-serif text-3xl tracking-normal text-gray-950">
            Articole recomandate
          </h2>
        </div>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-3 sm:gap-5">
        {post.relatedArticles.map((article) => (
          <article
            key={article._id}
            className="group premium-surface min-w-[16rem] snap-start overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] md:min-w-[24rem]"
          >
            {article.mainImage && (
              <Link href={`/blog/${article.slug}`} className="relative block h-56">
                <Figure image={article.mainImage} title={article.title} sizes="33vw" />
              </Link>
            )}
            <div className="p-5">
              <h3 className="font-serif text-xl">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              {article.excerpt && (
                <p className="mt-2 text-sm leading-7 text-gray-600">{article.excerpt}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AuthorBox({ post }: LayoutProps) {
  if (!post.author) return null;

  return (
    <section className="article-reveal mx-auto max-w-5xl px-4 py-7 sm:py-8">
      <div className="premium-surface grid gap-5 rounded-[1.5rem] p-5 sm:grid-cols-[8rem_1fr] sm:rounded-[2rem] sm:p-8">
        {post.author.image && (
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
            <Figure image={post.author.image} title={post.author.name} sizes="8rem" />
          </div>
        )}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary/60">
            Semnat de
          </p>
          <h2 className="font-serif text-[1.8rem] text-gray-950 sm:text-3xl">{post.author.name}</h2>
          <div className="mt-4">
            <RichText value={post.author.bio} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleIntro({ post, light = false }: { post: SanityPost; light?: boolean }) {
  return (
    <>
      <CategoryPills post={post} light={light} />
      <h1
        className={`font-serif text-[2.65rem] font-normal leading-[1.05] tracking-normal sm:text-6xl lg:text-7xl ${
          light ? "text-white" : "text-gray-950"
        }`}
      >
        {post.title}
      </h1>
      {post.excerpt && (
        <p className={`mt-5 max-w-2xl text-[0.98rem] leading-7 sm:mt-6 sm:text-lg sm:leading-8 ${light ? "text-white/72" : "text-gray-600"}`}>
          {post.excerpt}
        </p>
      )}
      <ArticleMeta post={post} light={light} />
    </>
  );
}

export function ArticleLayout1({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="premium-surface-strong grid gap-6 rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <ArticleIntro post={post} />
            <div className="mt-8">
              <RichText value={post.introText || post.body} />
            </div>
          </div>
          <div className="space-y-5">
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.25rem] sm:min-h-[520px] sm:rounded-[1.5rem]">
              <Figure image={post.mainImage} title={post.title} priority />
            </div>
            {post.secondaryImage && (
              <div className="relative ml-auto min-h-44 w-full max-w-md overflow-hidden rounded-[1.25rem] sm:min-h-56 sm:rounded-[1.5rem]">
                <Figure image={post.secondaryImage} title={post.title} />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout2({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-6xl text-center">
        <BackLink />
        <ArticleIntro post={post} />
        <div className="article-reveal relative mt-7 min-h-[22rem] overflow-hidden rounded-[1.5rem] ring-1 ring-white/50 sm:mt-10 sm:min-h-[540px] sm:rounded-[2rem]">
          <Figure image={post.mainImage} title={post.title} priority sizes="100vw" />
        </div>
        <div className="mx-auto mt-8 max-w-3xl text-left sm:mt-12">
          <RichText value={post.introText || post.body} />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-left sm:mt-12">
          <Quote post={post} />
        </div>
        <div className="mx-auto mt-8 max-w-3xl text-left sm:mt-10">
          <RichText value={post.secondaryText} />
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout3({ post }: LayoutProps) {
  return (
    <article>
      <div className="mx-auto max-w-7xl px-4 pt-7 sm:pt-10">
        <BackLink />
        <ArticleIntro post={post} />
      </div>
      <div className="article-reveal relative my-7 min-h-[24rem] overflow-hidden sm:my-10 sm:min-h-[72vh]">
        <Figure image={post.mainImage} title={post.title} priority sizes="100vw" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 sm:gap-8 sm:pb-16 lg:grid-cols-[1fr_0.7fr]">
        <div className="premium-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10">
          <RichText value={post.introText || post.body} />
          <div className="mt-8">
            <RichText value={post.secondaryText} />
          </div>
        </div>
        <Callout post={post} />
      </div>
    </article>
  );
}

export function ArticleLayout4({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="relative min-h-[27rem] overflow-hidden rounded-[1.5rem] sm:min-h-[600px] sm:rounded-[2rem]">
          <Figure image={post.mainImage} title={post.title} priority sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute bottom-0 max-w-3xl p-5 sm:p-12">
            <ArticleIntro post={post} light />
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="premium-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-9">
            <RichText value={post.introText || post.body} />
          </div>
          <div className="space-y-8">
            <Checklist post={post} />
            <Cards post={post} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout5({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div className="premium-surface flex flex-col justify-center rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10">
            <ArticleIntro post={post} />
            <div className="mt-8">
              <RichText value={post.introText || post.body} />
            </div>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] sm:min-h-[720px] sm:rounded-[2rem]">
            <Figure image={post.verticalImage || post.mainImage} title={post.title} priority />
          </div>
        </div>
        <section className="mt-8">
          <Gallery post={post} columns="sm:grid-cols-2 lg:grid-cols-4" />
        </section>
      </div>
    </article>
  );
}

export function ArticleLayout6({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ArticleIntro post={post} />
            <div className="mt-7 sm:mt-10">
              <Quote post={post} />
            </div>
          </div>
          <div className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] sm:min-h-[620px] sm:rounded-[2rem]">
            <Figure image={post.mainImage} title={post.title} priority />
          </div>
        </div>
        <div className="mt-7 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="premium-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10">
            <RichText value={post.introText || post.body} />
            <div className="mt-8">
              <RichText value={post.secondaryText} />
            </div>
          </div>
          <div className="relative min-h-[20rem] overflow-hidden rounded-[1.5rem] sm:min-h-[420px] sm:rounded-[2rem]">
            <Figure image={post.secondaryImage} title={post.title} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout7({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <ArticleIntro post={post} />
        <div className="mt-7 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="premium-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-9">
            <RichText value={post.introText || post.body} />
            <div className="mt-8 space-y-6 border-l border-secondary/25 pl-5">
              {(post.timelineItems || []).map((item, index) => (
                <div key={item._key || index} className="article-reveal relative">
                  <span className="absolute -left-[1.72rem] top-1 h-3 w-3 rounded-full bg-secondary" />
                  {item.date && (
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                      {item.date}
                    </p>
                  )}
                  <h3 className="mt-1 font-serif text-2xl">{item.title}</h3>
                  {item.text && <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>}
                </div>
              ))}
            </div>
          </div>
          <Gallery post={post} columns="sm:grid-cols-2" />
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout8({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <ArticleIntro post={post} />
          <div className="relative min-h-[19rem] overflow-hidden rounded-[1.5rem] sm:min-h-[360px] sm:rounded-[2rem]">
            <Figure image={post.secondaryImage || post.mainImage} title={post.title} priority />
          </div>
        </div>
        <div className="premium-surface mt-6 rounded-[1.5rem] p-5 sm:mt-8 sm:rounded-[2rem] sm:p-10">
          <RichText value={post.introText || post.body} />
        </div>
        <div className="mt-8">
          <Cards post={post} />
        </div>
        <div className="mt-8">
          <Checklist post={post} />
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout9({ post }: LayoutProps) {
  return (
    <article className="bg-[#263426]/92 px-4 py-7 text-white sm:py-10">
      <div className="mx-auto max-w-6xl">
        <BackLink />
        <div className="mx-auto max-w-3xl text-center">
          <ArticleIntro post={post} light />
        </div>
        <div className="mx-auto mt-8 max-w-4xl sm:mt-12">
          <Quote post={post} light />
        </div>
        <div className="mx-auto mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-10">
            <RichText value={post.introText || post.body} light />
            <div className="mt-8">
              <RichText value={post.secondaryText} light />
            </div>
          </div>
          <Callout post={post} light />
        </div>
      </div>
    </article>
  );
}

export function ArticleLayout10({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <BackLink />
        <div className="premium-surface-strong grid gap-6 rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-5 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div className="flex flex-col justify-center p-2 sm:p-6">
            <ArticleIntro post={post} />
            <div className="mt-8">
              <RichText value={post.introText || post.body} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.7fr_0.3fr]">
            <div className="relative min-h-[24rem] overflow-hidden rounded-[1.25rem] sm:min-h-[620px] sm:rounded-[1.75rem]">
              <Figure image={post.mainImage} title={post.title} priority />
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-[1.25rem] sm:min-h-[620px] sm:rounded-[1.75rem]">
              <Figure image={post.verticalImage || post.secondaryImage} title={post.title} />
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <Callout post={post} />
          <div>
            <RichText value={post.secondaryText} />
            <div className="mt-8">
              <Cards post={post} />
            </div>
          </div>
        </div>
        <section className="mt-8">
          <Gallery post={post} />
        </section>
      </div>
      <AuthorBox post={post} />
      <RelatedArticles post={post} />
    </article>
  );
}

function LegacyArticle({ post }: LayoutProps) {
  return (
    <article className="px-4 py-7 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <BackLink />
        <div className="premium-surface-strong rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-10">
          <ArticleIntro post={post} />
          <div className="mt-8">
            <RichText value={post.introText || post.body} />
          </div>
        </div>
      </div>
    </article>
  );
}

const layouts: Record<string, (props: LayoutProps) => React.ReactNode> = {
  layout1: ArticleLayout1,
  layout2: ArticleLayout2,
  layout3: ArticleLayout3,
  layout4: ArticleLayout4,
  layout5: ArticleLayout5,
  layout6: ArticleLayout6,
  layout7: ArticleLayout7,
  layout8: ArticleLayout8,
  layout9: ArticleLayout9,
  layout10: ArticleLayout10,
};

export function ArticleLayoutRenderer({ post }: LayoutProps) {
  const Component = post.layout ? layouts[post.layout] : undefined;

  if (!Component) {
    return <LegacyArticle post={post} />;
  }

  return <Component post={post} />;
}
