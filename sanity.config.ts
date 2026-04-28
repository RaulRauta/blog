"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

const previewUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blog-plum-nine-49.vercel.app";

export default defineConfig({
  name: "default",
  title: "Enciclopedia Florilor",
  projectId,
  dataset,
  basePath: "/studio",

  schema: {
    types: schema.types,

    templates: (prev) => [
      ...prev.filter((template) => template.schemaType !== "post"),

      {
        id: "post-standard",
        title: "Articol standard",
        description: "Articol clasic, potrivit pentru orice subiect.",
        schemaType: "post",
        value: {
          layout: "standard",
          title: "Titlul articolului",
          excerpt:
            "Scrie aici o descriere scurtă a articolului, care va apărea pe pagina de blog.",
          body: [
            {
              _type: "block",
              _key: "standard-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "standard-intro-span",
                  text: "Introducere: prezintă subiectul articolului într-un mod clar și plăcut.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "standard-section",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "standard-section-span",
                  text: "Subtitlu principal",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "standard-content",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "standard-content-span",
                  text: "Dezvoltă aici ideea principală a articolului.",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-editorial",
        title: "Articol editorial",
        description:
          "Layout elegant, cu imagine mare și text prezentat mai premium.",
        schemaType: "post",
        value: {
          layout: "editorial",
          title: "Povestea florii...",
          excerpt:
            "O introducere elegantă despre floare, simbolistica ei și emoția pe care o transmite.",
          body: [
            {
              _type: "block",
              _key: "editorial-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "editorial-intro-span",
                  text: "Introducere: creează o atmosferă și spune povestea florii.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "editorial-story",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "editorial-story-span",
                  text: "Poveste și simbolistică",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "editorial-meaning",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "editorial-meaning-span",
                  text: "Scrie aici despre semnificația florii, contextul în care se oferă și ce transmite.",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-gallery",
        title: "Articol galerie",
        description:
          "Pentru articole vizuale, cu mai multe imagini în galerie.",
        schemaType: "post",
        value: {
          layout: "gallery",
          title: "Galerie florală...",
          excerpt:
            "O selecție vizuală de flori, idei și inspirație pentru decor, buchete sau momente speciale.",
          body: [
            {
              _type: "block",
              _key: "gallery-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "gallery-intro-span",
                  text: "Introducere: explică tema galeriei și ce vor descoperi cititorii.",
                  marks: [],
                },
              ],
            },
          ],
        },
      },

      {
        id: "post-guide",
        title: "Ghid pas cu pas",
        description:
          "Pentru articole practice, de tip ghid, sfaturi sau instrucțiuni.",
        schemaType: "post",
        value: {
          layout: "guide",
          title: "Ghid de îngrijire pentru...",
          excerpt:
            "Un ghid simplu și practic, cu pași clari pentru îngrijirea acestei flori.",
          body: [
            {
              _type: "block",
              _key: "guide-intro",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "guide-intro-span",
                  text: "Introducere: explică pentru cine este ghidul și ce problemă rezolvă.",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "guide-step-1",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "guide-step-1-span",
                  text: "Pasul 1: Lumina potrivită",
                  marks: [],
                },
              ],
            },
            {
              _type: "block",
              _key: "guide-step-2",
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: "guide-step-2-span",
                  text: "Pasul 2: Udarea",
                  marks: [],
                },
              ],
            },
          ],
        },
      },
    ],
  },

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: "/api/draft",
        },
      },
      resolve: {
        locations: {
          post: {
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Articol",
                  href: doc?.slug ? `/blog/${doc.slug}` : "/blog",
                },
                {
                  title: "Blog",
                  href: "/blog",
                },
              ],
            }),
          },
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
