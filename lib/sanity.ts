import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
    _id?: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
  crop?: {
    _type?: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hotspot?: {
    _type?: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function imageUrl(source: SanityImage, width = 1600, height = 1000) {
  if (source.asset?.url) return source.asset.url;

  return urlFor(source).width(width).height(height).url();
}

export type ArticleLayout =
  | "layout1"
  | "layout2"
  | "layout3"
  | "layout4"
  | "layout5"
  | "layout6"
  | "layout7"
  | "layout8"
  | "layout9"
  | "layout10"
  | "standard"
  | "editorial"
  | "gallery"
  | "guide";

export type ArticleListItem = {
  _key?: string;
  title?: string;
  text?: string;
};

export type ArticleCard = {
  _key?: string;
  title?: string;
  text?: string;
  image?: SanityImage;
};

export type TimelineItem = {
  _key?: string;
  date?: string;
  title?: string;
  text?: string;
};

export type ArticleCallout = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  introText?: PortableTextBlock[];
  secondaryText?: PortableTextBlock[];
  publishedAt?: string;
  layout?: ArticleLayout;
  mainImage?: SanityImage;
  secondaryImage?: SanityImage;
  verticalImage?: SanityImage;
  galleryImages?: SanityImage[];
  quoteText?: string;
  quoteAttribution?: string;
  checklistItems?: ArticleListItem[];
  infoCards?: ArticleCard[];
  timelineItems?: TimelineItem[];
  callout?: ArticleCallout;
  relatedArticles?: SanityPost[];
  author?: {
    name?: string;
    image?: SanityImage;
    bio?: PortableTextBlock[];
  };
  categories?: {
    title: string;
  }[];
};

const imageProjection = `{
  ...,
  asset->
}`;

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  introText,
  secondaryText,
  publishedAt,
  layout,
  mainImage${imageProjection},
  secondaryImage${imageProjection},
  verticalImage${imageProjection},
  galleryImages[]${imageProjection},
  quoteText,
  quoteAttribution,
  checklistItems,
  infoCards[]{
    ...,
    image${imageProjection}
  },
  timelineItems,
  callout,
  relatedArticles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage${imageProjection},
    author->{name},
    categories[]->{title}
  },
  author->{
    name,
    image${imageProjection},
    bio
  },
  categories[]->{
    title
  }
`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  ${postFields}
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  ${postFields}
}`;
