import { defineArrayMember, defineField, defineType } from "sanity";

const variantField = defineField({
  name: "variant",
  title: "Varianta vizuala",
  type: "string",
  initialValue: "editorial",
  options: {
    list: [
      { title: "Editorial", value: "editorial" },
      { title: "Soft", value: "soft" },
      { title: "Botanical", value: "botanical" },
      { title: "Luxury", value: "luxury" },
      { title: "Minimal", value: "minimal" },
    ],
    layout: "dropdown",
  },
});

const titleFields = [
  defineField({
    name: "title",
    title: "Titlu",
    type: "string",
  }),
  defineField({
    name: "subtitle",
    title: "Subtitlu",
    type: "text",
    rows: 2,
  }),
  variantField,
];

const bodyField = defineField({
  name: "body",
  title: "Text",
  type: "blockContent",
});

const buttonField = defineField({
  name: "button",
  title: "Buton optional",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Text buton", type: "string" }),
    defineField({ name: "href", title: "Link", type: "string" }),
  ],
});

const imageField = defineField({
  name: "image",
  title: "Imagine",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text SEO", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

const imagesField = defineField({
  name: "images",
  title: "Imagini",
  type: "array",
  of: [defineArrayMember(imageField)],
});

export const heroSectionType = defineType({
  name: "heroSection",
  title: "Hero section",
  type: "object",
  fields: [...titleFields, bodyField, imageField, buttonField],
  preview: { select: { title: "title", media: "image" } },
});

export const richTextSectionType = defineType({
  name: "richTextSection",
  title: "Rich text section",
  type: "object",
  fields: [...titleFields, bodyField, buttonField],
  preview: { select: { title: "title", subtitle: "subtitle" } },
});

export const imageLeftTextRightType = defineType({
  name: "imageLeftTextRight",
  title: "Imagine stanga, text dreapta",
  type: "object",
  fields: [...titleFields, imageField, bodyField, buttonField],
  preview: { select: { title: "title", media: "image" } },
});

export const imageRightTextLeftType = defineType({
  name: "imageRightTextLeft",
  title: "Text stanga, imagine dreapta",
  type: "object",
  fields: [...titleFields, imageField, bodyField, buttonField],
  preview: { select: { title: "title", media: "image" } },
});

export const fullWidthImageType = defineType({
  name: "fullWidthImage",
  title: "Imagine full width",
  type: "object",
  fields: [...titleFields, bodyField, imageField],
  preview: { select: { title: "title", media: "image" } },
});

export const galleryBlockType = defineType({
  name: "galleryBlock",
  title: "Galerie",
  type: "object",
  fields: [...titleFields, bodyField, imagesField],
  preview: { select: { title: "title" } },
});

export const quoteBlockType = defineType({
  name: "quoteBlock",
  title: "Citat",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({ name: "quote", title: "Citat", type: "text", rows: 4 }),
    defineField({ name: "attribution", title: "Atribuire", type: "string" }),
  ],
  preview: { select: { title: "quote", subtitle: "attribution" } },
});

export const checklistBlockType = defineType({
  name: "checklistBlock",
  title: "Checklist",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "items",
      title: "Elemente",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titlu", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const infoCardsBlockType = defineType({
  name: "infoCardsBlock",
  title: "Carduri info",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "cards",
      title: "Carduri",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titlu", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            imageField,
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const timelineBlockType = defineType({
  name: "timelineBlock",
  title: "Timeline",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "items",
      title: "Momente",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "date", title: "Eticheta data", type: "string" }),
            defineField({ name: "title", title: "Titlu", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const calloutBlockType = defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [...titleFields, bodyField, imageField, buttonField],
  preview: { select: { title: "title", media: "image" } },
});

export const faqBlockType = defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "items",
      title: "Intrebari",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", title: "Intrebare", type: "string" }),
            defineField({ name: "answer", title: "Raspuns", type: "blockContent" }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const authorBoxType = defineType({
  name: "authorBox",
  title: "Author box",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "author.name" } },
});

export const relatedArticlesType = defineType({
  name: "relatedArticles",
  title: "Articole recomandate",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "articles",
      title: "Articole",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const relatedFlowersType = defineType({
  name: "relatedFlowers",
  title: "Flori recomandate",
  type: "object",
  fields: [
    ...titleFields,
    bodyField,
    defineField({
      name: "flowers",
      title: "Flori",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nume", type: "string" }),
            defineField({ name: "slug", title: "Slug", type: "string" }),
            defineField({
              name: "description",
              title: "Descriere",
              type: "text",
              rows: 3,
            }),
            imageField,
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

export const articleBlockTypes = [
  heroSectionType,
  richTextSectionType,
  imageLeftTextRightType,
  imageRightTextLeftType,
  fullWidthImageType,
  galleryBlockType,
  quoteBlockType,
  checklistBlockType,
  infoCardsBlockType,
  timelineBlockType,
  calloutBlockType,
  faqBlockType,
  authorBoxType,
  relatedArticlesType,
  relatedFlowersType,
];

export const articleBlockNames = articleBlockTypes.map(({ name }) => name);
