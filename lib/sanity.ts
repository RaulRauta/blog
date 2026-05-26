import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

type SanityImage = {
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

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  contentBlocks?: ArticleContentBlock[];
  publishedAt?: string;
  layout?: "standard" | "editorial" | "gallery" | "guide";
  mainImage?: SanityImage;
  galleryImages?: SanityImage[];
  author?: {
    name?: string;
  };
  categories?: {
    title: string;
  }[];
};

export type ArticleVisualVariant =
  | "editorial"
  | "soft"
  | "botanical"
  | "luxury"
  | "minimal";

export type ArticleButton = {
  label?: string;
  href?: string;
};

export type ArticleContentBlock = {
  _key?: string;
  _type: string;
  title?: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
  images?: SanityImage[];
  quote?: string;
  attribution?: string;
  items?: Array<{
    _key?: string;
    title?: string;
    text?: string;
    body?: PortableTextBlock[];
    image?: SanityImage;
    date?: string;
    question?: string;
    answer?: PortableTextBlock[];
    slug?: string;
    description?: string;
  }>;
  cards?: Array<{
    _key?: string;
    title?: string;
    text?: string;
    image?: SanityImage;
  }>;
  button?: ArticleButton;
  variant?: ArticleVisualVariant;
  articles?: SanityPost[];
  flowers?: Array<{
    _key?: string;
    name?: string;
    slug?: string;
    description?: string;
    image?: SanityImage;
  }>;
  author?: {
    name?: string;
    image?: SanityImage;
    bio?: PortableTextBlock[];
  };
};

const contentBlocksProjection = `contentBlocks[]{
  ...,
  image{
    ...,
    asset->
  },
  images[]{
    ...,
    asset->
  },
  cards[]{
    ...,
    image{
      ...,
      asset->
    }
  },
  items[]{
    ...,
    image{
      ...,
      asset->
    },
    answer[]
  },
  flowers[]{
    ...,
    image{
      ...,
      asset->
    }
  },
  author->{
    name,
    image{
      ...,
      asset->
    },
    bio
  },
  articles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage{
      ...,
      asset->
    },
    author->{name},
    categories[]->{title}
  }
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  ${contentBlocksProjection},
  publishedAt,
  layout,
  mainImage,
  galleryImages,
  author->{
    name
  },
  categories[]->{
    title
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  ${contentBlocksProjection},
  publishedAt,
  layout,
  mainImage,
  galleryImages,
  author->{
    name
  },
  categories[]->{
    title
  }
}`;
