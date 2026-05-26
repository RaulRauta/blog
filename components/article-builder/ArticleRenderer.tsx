import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  type ArticleButton,
  type ArticleContentBlock,
  type SanityPost,
  urlFor,
} from "@/lib/sanity";

type BlockProps = {
  block: ArticleContentBlock;
};

const variantClasses: Record<string, string> = {
  editorial: "bg-white/82 text-gray-950 shadow-[0_24px_90px_rgba(31,41,55,0.10)]",
  soft: "bg-white/68 text-gray-900 shadow-[0_18px_70px_rgba(62,90,62,0.10)]",
  botanical:
    "bg-[rgba(238,247,235,0.82)] text-[#1f321f] shadow-[0_20px_80px_rgba(31,50,31,0.12)]",
  luxury:
    "bg-[#151911]/90 text-white shadow-[0_26px_100px_rgba(0,0,0,0.22)]",
  minimal: "bg-transparent text-gray-950 shadow-none",
};

const eyebrowClasses: Record<string, string> = {
  luxury: "text-[#d7c28c]",
  botanical: "text-secondary",
  soft: "text-primary",
  minimal: "text-gray-500",
  editorial: "text-primary",
};

function getVariant(block: ArticleContentBlock) {
  return block.variant || "editorial";
}

function surfaceClass(block: ArticleContentBlock) {
  return variantClasses[getVariant(block)] || variantClasses.editorial;
}

function BlockShell({
  block,
  children,
  wide = false,
}: {
  block: ArticleContentBlock;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const variant = getVariant(block);
  const rounded = variant === "minimal" ? "" : "rounded-[2rem]";
  const border =
    variant === "minimal"
      ? ""
      : variant === "luxury"
        ? "border border-white/10"
        : "border border-white/50";

  return (
    <section
      className={`article-reveal mx-auto my-10 px-4 sm:my-14 ${
        wide ? "max-w-7xl" : "max-w-5xl"
      }`}
    >
      <div
        className={`${rounded} ${border} ${surfaceClass(
          block,
        )} overflow-hidden p-6 backdrop-blur-xl sm:p-9 lg:p-12`}
      >
        {children}
      </div>
    </section>
  );
}

function BlockHeader({ block }: BlockProps) {
  if (!block.title && !block.subtitle) return null;

  const variant = getVariant(block);

  return (
    <header className="mb-7 max-w-3xl">
      {block.subtitle && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${
            eyebrowClasses[variant] || eyebrowClasses.editorial
          }`}
        >
          {block.subtitle}
        </p>
      )}
      {block.title && (
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {block.title}
        </h2>
      )}
    </header>
  );
}

function PortableContent({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;

  return (
    <div className="article-rich-text">
      <PortableText value={value} />
    </div>
  );
}

function ButtonLink({ button }: { button?: ArticleButton }) {
  if (!button?.label || !button.href) return null;

  const className =
    "mt-7 inline-flex w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90";

  if (button.href.startsWith("/")) {
    return (
      <Link href={button.href} className={className}>
        {button.label}
      </Link>
    );
  }

  return (
    <a href={button.href} className={className}>
      {button.label}
    </a>
  );
}

function ImageFigure({
  image,
  title,
  className = "",
  priority = false,
}: {
  image?: ArticleContentBlock["image"];
  title?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!image) return null;

  return (
    <figure className={className}>
      <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-white/30 sm:min-h-[420px]">
        <Image
          src={urlFor(image).width(1800).height(1200).url()}
          alt={image.alt || title || "Imagine articol"}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-xs leading-5 text-gray-500">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function HeroSection({ block }: BlockProps) {
  return (
    <section className="article-reveal mx-auto my-10 max-w-7xl px-4 sm:my-16">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/50 bg-white/78 shadow-[0_30px_100px_rgba(31,41,55,0.16)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <BlockHeader block={block} />
          <PortableContent value={block.body} />
          <ButtonLink button={block.button} />
        </div>
        <ImageFigure
          image={block.image}
          title={block.title}
          priority
          className="min-h-80 lg:min-h-[620px]"
        />
      </div>
    </section>
  );
}

export function RichTextSection({ block }: BlockProps) {
  return (
    <BlockShell block={block}>
      <div className="mx-auto max-w-3xl">
        <BlockHeader block={block} />
        <PortableContent value={block.body} />
        <ButtonLink button={block.button} />
      </div>
    </BlockShell>
  );
}

function ImageTextSection({ block, reverse = false }: BlockProps & { reverse?: boolean }) {
  return (
    <BlockShell block={block} wide>
      <div
        className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
          reverse ? "" : ""
        }`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <ImageFigure image={block.image} title={block.title} />
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <BlockHeader block={block} />
          <PortableContent value={block.body} />
          <ButtonLink button={block.button} />
        </div>
      </div>
    </BlockShell>
  );
}

export function ImageLeftTextRight({ block }: BlockProps) {
  return <ImageTextSection block={block} />;
}

export function ImageRightTextLeft({ block }: BlockProps) {
  return <ImageTextSection block={block} reverse />;
}

export function FullWidthImage({ block }: BlockProps) {
  return (
    <section className="article-reveal my-12 sm:my-16">
      <div className="mx-auto max-w-7xl px-4">
        <BlockHeader block={block} />
        <div className="mb-8 max-w-3xl">
          <PortableContent value={block.body} />
        </div>
      </div>
      <div className="relative mx-auto min-h-[360px] max-w-7xl overflow-hidden rounded-[2rem] sm:min-h-[560px]">
        {block.image && (
          <Image
            src={urlFor(block.image).width(2200).height(1300).url()}
            alt={block.image.alt || block.title || "Imagine articol"}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
      {block.image?.caption && (
        <p className="mx-auto mt-3 max-w-7xl px-4 text-xs text-gray-600">
          {block.image.caption}
        </p>
      )}
    </section>
  );
}

export function GalleryBlock({ block }: BlockProps) {
  const images = block.images || [];

  return (
    <BlockShell block={block} wide>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <ImageFigure
            key={`${image.asset?._ref || image.asset?._id}-${index}`}
            image={image}
            title={block.title}
            className={index === 0 ? "lg:col-span-2" : ""}
          />
        ))}
      </div>
    </BlockShell>
  );
}

export function QuoteBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block}>
      <blockquote className="mx-auto max-w-3xl text-center">
        <BlockHeader block={block} />
        <p className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {block.quote}
        </p>
        {block.attribution && (
          <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            {block.attribution}
          </footer>
        )}
      </blockquote>
      <div className="mx-auto mt-8 max-w-3xl">
        <PortableContent value={block.body} />
      </div>
    </BlockShell>
  );
}

export function ChecklistBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block}>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(block.items || []).map((item, index) => (
          <div key={item._key || index} className="rounded-2xl bg-white/55 p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {item.text && <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>}
          </div>
        ))}
      </div>
    </BlockShell>
  );
}

export function InfoCardsBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block} wide>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {(block.cards || []).map((card, index) => (
          <article key={card._key || index} className="overflow-hidden rounded-2xl bg-white/62">
            {card.image && (
              <div className="relative h-52">
                <Image
                  src={urlFor(card.image).width(800).height(600).url()}
                  alt={card.image.alt || card.title || "Imagine card"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              {card.text && <p className="mt-2 text-sm leading-7 text-gray-600">{card.text}</p>}
            </div>
          </article>
        ))}
      </div>
    </BlockShell>
  );
}

export function TimelineBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block}>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="mt-8 space-y-5 border-l border-secondary/25 pl-5">
        {(block.items || []).map((item, index) => (
          <div key={item._key || index} className="relative">
            <span className="absolute -left-[1.72rem] top-1 h-3 w-3 rounded-full bg-secondary" />
            {item.date && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {item.date}
              </p>
            )}
            <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
            {item.text && <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>}
          </div>
        ))}
      </div>
    </BlockShell>
  );
}

export function CalloutBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block} wide>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <BlockHeader block={block} />
          <PortableContent value={block.body} />
          <ButtonLink button={block.button} />
        </div>
        <ImageFigure image={block.image} title={block.title} />
      </div>
    </BlockShell>
  );
}

export function FaqBlock({ block }: BlockProps) {
  return (
    <BlockShell block={block}>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="space-y-4">
        {(block.items || []).map((item, index) => (
          <details key={item._key || index} className="rounded-2xl bg-white/55 p-5">
            <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
            <div className="mt-4">
              <PortableContent value={item.answer} />
            </div>
          </details>
        ))}
      </div>
    </BlockShell>
  );
}

export function AuthorBox({ block }: BlockProps) {
  const author = block.author;
  if (!author) return null;

  return (
    <BlockShell block={block}>
      <PortableContent value={block.body} />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {author.image && (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full">
            <Image
              src={urlFor(author.image).width(300).height(300).url()}
              alt={author.image.alt || author.name || "Autor"}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <BlockHeader block={{ ...block, title: block.title || author.name }} />
          <PortableContent value={author.bio} />
        </div>
      </div>
    </BlockShell>
  );
}

function ArticleCard({ post }: { post: SanityPost }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white/65">
      {post.mainImage && (
        <Link href={`/blog/${post.slug}`} className="relative block h-56">
          <Image
            src={urlFor(post.mainImage).width(900).height(650).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
          />
        </Link>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt && <p className="mt-3 text-sm leading-7 text-gray-600">{post.excerpt}</p>}
      </div>
    </article>
  );
}

export function RelatedArticles({ block }: BlockProps) {
  return (
    <BlockShell block={block} wide>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="grid gap-5 md:grid-cols-3">
        {(block.articles || []).map((post) => (
          <ArticleCard key={post._id} post={post} />
        ))}
      </div>
    </BlockShell>
  );
}

export function RelatedFlowers({ block }: BlockProps) {
  return (
    <BlockShell block={block} wide>
      <BlockHeader block={block} />
      <PortableContent value={block.body} />
      <div className="grid gap-5 md:grid-cols-3">
        {(block.flowers || []).map((flower, index) => (
          <article key={flower._key || index} className="overflow-hidden rounded-2xl bg-white/65">
            {flower.image && (
              <Link href={flower.slug ? `/flori/${flower.slug}` : "#"} className="relative block h-56">
                <Image
                  src={urlFor(flower.image).width(900).height(650).url()}
                  alt={flower.image.alt || flower.name || "Floare"}
                  fill
                  className="object-cover"
                />
              </Link>
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold">{flower.name}</h3>
              {flower.description && (
                <p className="mt-3 text-sm leading-7 text-gray-600">{flower.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </BlockShell>
  );
}

const blockComponents: Record<string, (props: BlockProps) => React.ReactNode> = {
  heroSection: HeroSection,
  richTextSection: RichTextSection,
  imageLeftTextRight: ImageLeftTextRight,
  imageRightTextLeft: ImageRightTextLeft,
  fullWidthImage: FullWidthImage,
  galleryBlock: GalleryBlock,
  quoteBlock: QuoteBlock,
  checklistBlock: ChecklistBlock,
  infoCardsBlock: InfoCardsBlock,
  timelineBlock: TimelineBlock,
  calloutBlock: CalloutBlock,
  faqBlock: FaqBlock,
  authorBox: AuthorBox,
  relatedArticles: RelatedArticles,
  relatedFlowers: RelatedFlowers,
};

export function ArticleRenderer({
  blocks,
  fallbackBody,
}: {
  blocks?: ArticleContentBlock[];
  fallbackBody?: PortableTextBlock[];
}) {
  if (blocks && blocks.length > 0) {
    return (
      <>
        {blocks.map((block, index) => {
          const Component = blockComponents[block._type];
          if (!Component) return null;

          return <Component key={block._key || `${block._type}-${index}`} block={block} />;
        })}
      </>
    );
  }

  if (fallbackBody && fallbackBody.length > 0) {
    return (
      <RichTextSection
        block={{
          _type: "richTextSection",
          title: "Articol",
          body: fallbackBody,
          variant: "editorial",
        }}
      />
    );
  }

  return null;
}
