import {
  type ConditionalPropertyCallbackContext,
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

const layoutOptions = [
  { title: "Layout 1 - Hero stanga, text si imagine mica", value: "layout1" },
  { title: "Layout 2 - Text centrat, imagine si quote", value: "layout2" },
  { title: "Layout 3 - Imagine full width si text simplu", value: "layout3" },
  { title: "Layout 4 - Imagine mare si icon list", value: "layout4" },
  { title: "Layout 5 - Imagine verticala dreapta si mini galerie", value: "layout5" },
  { title: "Layout 6 - Storytelling editorial cu quote", value: "layout6" },
  { title: "Layout 7 - Timeline si galerie cinematica", value: "layout7" },
  { title: "Layout 8 - Landscape presentation cu cards", value: "layout8" },
  { title: "Layout 9 - Minimal luxury cu callout", value: "layout9" },
  { title: "Layout 10 - Feature magazine cu galerie si related", value: "layout10" },
];

const hiddenExcept =
  (...layouts: string[]) =>
  ({ document }: ConditionalPropertyCallbackContext) =>
    !layouts.includes(String(document?.layout || ""));

const richTextField = (name: string, title: string, layouts: string[]) =>
  defineField({
    name,
    title,
    type: "blockContent",
    hidden: hiddenExcept(...layouts),
  });

const imageField = (name: string, title: string, layouts: string[]) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    hidden: hiddenExcept(...layouts),
    fields: [
      defineField({ name: "alt", title: "Alt text SEO", type: "string" }),
      defineField({ name: "caption", title: "Caption", type: "string" }),
    ],
  });

const galleryImageMember = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text SEO", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "layout",
      title: "Layout articol",
      description:
        "Alege template-ul editorial. Campurile de mai jos se adapteaza automat.",
      type: "string",
      initialValue: "layout1",
      options: {
        list: layoutOptions,
        layout: "dropdown",
      },
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),

    defineField({
      name: "mainImage",
      title: "Imagine principala / cover",
      description:
        "Folosita in listing si in majoritatea layout-urilor editoriale.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text SEO", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),

    richTextField("introText", "Text principal", [
      "layout1",
      "layout2",
      "layout3",
      "layout4",
      "layout5",
      "layout6",
      "layout7",
      "layout8",
      "layout9",
      "layout10",
    ]),

    richTextField("secondaryText", "Text secundar", [
      "layout2",
      "layout3",
      "layout6",
      "layout7",
      "layout9",
      "layout10",
    ]),

    imageField("secondaryImage", "Imagine secundara", [
      "layout1",
      "layout2",
      "layout6",
      "layout8",
      "layout10",
    ]),

    imageField("verticalImage", "Imagine verticala", ["layout5", "layout10"]),

    defineField({
      name: "quoteText",
      title: "Quote",
      type: "text",
      rows: 4,
      hidden: hiddenExcept("layout2", "layout6", "layout9"),
    }),

    defineField({
      name: "quoteAttribution",
      title: "Atribuire quote",
      type: "string",
      hidden: hiddenExcept("layout2", "layout6", "layout9"),
    }),

    defineField({
      name: "checklistItems",
      title: "Lista cu icon-uri",
      type: "array",
      hidden: hiddenExcept("layout4", "layout8"),
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

    defineField({
      name: "galleryImages",
      title: "Galerie",
      type: "array",
      hidden: hiddenExcept("layout5", "layout7", "layout10"),
      of: [galleryImageMember],
    }),

    defineField({
      name: "infoCards",
      title: "Carduri editoriale",
      type: "array",
      hidden: hiddenExcept("layout4", "layout8", "layout10"),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titlu", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            imageField("image", "Imagine card", ["layout4", "layout8", "layout10"]),
          ],
        }),
      ],
    }),

    defineField({
      name: "timelineItems",
      title: "Timeline",
      type: "array",
      hidden: hiddenExcept("layout7"),
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

    defineField({
      name: "callout",
      title: "Callout / CTA",
      type: "object",
      hidden: hiddenExcept("layout3", "layout9", "layout10"),
      fields: [
        defineField({ name: "title", title: "Titlu", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
        defineField({ name: "buttonLabel", title: "Text buton", type: "string" }),
        defineField({ name: "buttonHref", title: "Link buton", type: "string" }),
      ],
    }),

    defineField({
      name: "relatedArticles",
      title: "Articole recomandate",
      type: "array",
      hidden: hiddenExcept("layout10"),
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "body",
      title: "Body vechi",
      description:
        "Fallback pentru articolele publicate inainte de sistemul cu layout-uri.",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      layout: "layout",
    },
    prepare(selection) {
      const { author, layout } = selection;

      return {
        ...selection,
        subtitle: `${layout || "legacy"}${author ? ` - ${author}` : ""}`,
      };
    },
  },
});
