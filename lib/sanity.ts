import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
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

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: PortableTextBlock[];
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

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
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
