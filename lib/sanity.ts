import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

type SanityImageSource = Parameters<typeof builder.image>[0];

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: PortableTextBlock[];
  publishedAt?: string;
  mainImage?: SanityImageSource;
  author?: {
    name?: string;
  };
  categories?: {
    title?: string;
  }[];
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  mainImage,
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
  mainImage,
  author->{
    name
  },
  categories[]->{
    title
  }
}`;
