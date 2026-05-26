import {
  type ConditionalPropertyCallbackContext,
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";
import { ArticleLayoutInput } from "../components/ArticleLayoutInput";
import { ArticleTemplateGuideInput } from "../components/ArticleTemplateGuideInput";

const layoutOptions = [
  { title: "Template 1 - Poveste cinematica", value: "layout1" },
  { title: "Template 2 - Ghid educativ clar", value: "layout2" },
  { title: "Template 3 - Eseu cu imagine panoramica", value: "layout3" },
  { title: "Template 4 - Ghid practic cu pasi", value: "layout4" },
  { title: "Template 5 - Inspiratie sezoniera cu galerie", value: "layout5" },
  { title: "Template 6 - Articol condus de citat", value: "layout6" },
  { title: "Template 7 - Calendar / timeline de gradina", value: "layout7" },
  { title: "Template 8 - Prezentare de landscaping", value: "layout8" },
  { title: "Template 9 - Lectura minimalista premium", value: "layout9" },
  { title: "Template 10 - Feature complet de revista", value: "layout10" },
];

const cardVariantOptions = [
  { title: "Automat", value: "auto" },
  { title: "Card cinematic mare", value: "cinematic" },
  { title: "Card compact si curat", value: "compact" },
  { title: "Card orizontal editorial", value: "horizontal" },
  { title: "Card centrat pe imagine", value: "imageFocus" },
  { title: "Card botanical soft", value: "soft" },
  { title: "Card cu citat", value: "quote" },
  { title: "Card tip lista eleganta", value: "list" },
  { title: "Card de inspiratie sezoniera", value: "seasonal" },
];

const hiddenExcept =
  (...layouts: string[]) =>
  ({ document }: ConditionalPropertyCallbackContext) =>
    !layouts.includes(String(document?.layout || ""));

const richTextField = (
  name: string,
  title: string,
  description: string,
  layouts: string[],
) =>
  defineField({
    name,
    title,
    description,
    type: "blockContent",
    hidden: hiddenExcept(...layouts),
  });

const imageField = (
  name: string,
  title: string,
  description: string,
  layouts: string[],
) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    hidden: hiddenExcept(...layouts),
    fields: [
      defineField({
        name: "alt",
        title: "Descriere imagine pentru SEO",
        description:
          "Descrie clar ce se vede in imagine. Exemplu: Hortensii albastre langa o alee de piatra.",
        type: "string",
        validation: (Rule) => Rule.max(140).warning("Ideal sub 140 de caractere."),
      }),
      defineField({
        name: "caption",
        title: "Caption afisat sub imagine",
        description:
          "Optional. Foloseste-l pentru context editorial sau recomandari scurte.",
        type: "string",
        validation: (Rule) => Rule.max(180).warning("Caption-urile scurte arata mai elegant."),
      }),
    ],
  });

const galleryImageMember = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Descriere imagine pentru SEO",
      description: "Exemplu: Detaliu cu petale roz pal in lumina naturala.",
      type: "string",
      validation: (Rule) => Rule.max(140).warning("Ideal sub 140 de caractere."),
    }),
    defineField({
      name: "caption",
      title: "Caption afisat sub imagine",
      description: "Optional. Explica de ce imaginea este relevanta in articol.",
      type: "string",
      validation: (Rule) => Rule.max(180).warning("Pastreaza caption-ul aerisit."),
    }),
  ],
});

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlul articolului",
      description:
        "Apare in hero, in pagina de articole si in recomandarile interne. Ideal: clar, editorial, 45-90 de caractere.",
      type: "string",
      placeholder: "Ex: Hortensia - ghid complet de ingrijire si integrare in gradina",
      validation: (Rule) =>
        Rule.required()
          .min(12)
          .warning("Titlul ar trebui sa fie suficient de descriptiv.")
          .max(110)
          .warning("Titlurile foarte lungi pot rupe compozitia vizuala."),
    }),

    defineField({
      name: "slug",
      title: "Adresa articolului",
      description:
        "Se genereaza din titlu si apare in URL. Pastreaza-l scurt, lizibil si fara cuvinte inutile.",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "layout",
      title: "Alege template-ul articolului",
      description:
        "Alege template-ul editorial cu ajutorul preview-urilor vizuale. Dupa alegere, campurile de mai jos se adapteaza automat.",
      type: "string",
      initialValue: "layout1",
      options: {
        list: layoutOptions,
        layout: "dropdown",
      },
      components: {
        input: ArticleLayoutInput,
      },
    }),

    defineField({
      name: "templateGuide",
      title: "Ghid editorial pentru template-ul ales",
      description:
        "Citeste acest ghid inainte sa completezi campurile. Iti arata ce controleaza fiecare zona din pagina.",
      type: "string",
      readOnly: true,
      components: {
        input: ArticleTemplateGuideInput,
      },
    }),

    defineField({
      name: "excerpt",
      title: "Rezumat scurt pentru carduri si introducere",
      description:
        "Apare in pagina de articole, in carduri si uneori sub titlu. Scrie 1-2 fraze calde, clare, fara sa repeti titlul.",
      type: "text",
      rows: 3,
      placeholder:
        "Ex: Un ghid calm despre lumina, sol, udare si felul in care hortensia poate da volum unei gradini elegante.",
      validation: (Rule) =>
        Rule.required()
          .min(80)
          .warning("Un rezumat bun are de obicei cel putin 80 de caractere.")
          .max(260)
          .warning("Rezumatul arata mai bine daca ramane sub 260 de caractere."),
    }),

    defineField({
      name: "featured",
      title: "Promoveaza ca articol principal",
      description:
        "Daca este activ, articolul poate aparea in zona mare recomandata din pagina Articole.",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "cardVariant",
      title: "Stilul cardului in pagina Articole",
      description:
        "Optional. Alege cum va fi prezentat articolul in colectie. Daca alegi Automat, pagina alterneaza elegant stilurile.",
      type: "string",
      options: {
        list: cardVariantOptions,
        layout: "dropdown",
      },
    }),

    defineField({
      name: "seasonalLabel",
      title: "Eticheta de sezon sau context",
      description:
        "Apare pe cardurile sezoniere. Exemple: Primavara, Vara, Gradini umbrite, Buchete de interior.",
      type: "string",
      placeholder: "Ex: Gradini umbrite",
      validation: (Rule) => Rule.max(40).warning("Etichetele scurte arata mai bine."),
    }),

    defineField({
      name: "tags",
      title: "Taguri de cautare si filtrare viitoare",
      description:
        "Adauga termeni utili pentru cautare si filtre viitoare. Exemple: hortensie, semiumbra, udare, terasa.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "author",
      title: "Autorul articolului",
      description:
        "Apare in metadata si in caseta de autor pentru template-urile care includ autor.",
      type: "reference",
      to: [{ type: "author" }],
    }),

    defineField({
      name: "mainImage",
      title: "Imagine principala Hero",
      description:
        "Controleaza coperta articolului: hero-ul, cardurile din pagina Articole si recomandarile. Recomandat: fotografie landscape, 1600x1000 sau mai mare, cu lumina naturala.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descriere imagine pentru SEO",
          description:
            "Descrie clar imaginea pentru accesibilitate si cautare. Exemplu: Hortensii albastre langa alee de piatra.",
          type: "string",
          placeholder: "Ex: Hortensii albastre si albe intr-o bordura de gradina",
          validation: (Rule) => Rule.max(140).warning("Ideal sub 140 de caractere."),
        }),
        defineField({
          name: "caption",
          title: "Caption afisat sub imagine",
          description:
            "Optional. Apare in unele template-uri sub imaginea principala.",
          type: "string",
          placeholder: "Ex: Hortensia aduce volum si prospetime in zonele de semiumbra.",
          validation: (Rule) => Rule.max(180).warning("Caption-urile scurte sunt mai elegante."),
        }),
      ],
      validation: (Rule) =>
        Rule.required().warning("Articolele premium arata mult mai bine cu imagine hero."),
    }),

    richTextField(
      "introText",
      "Text introductiv sub titlu",
      "Prima zona de lectura a articolului. Apare aproape de hero si trebuie sa explice subiectul, atmosfera si promisiunea articolului. Recomandat: 2-4 paragrafe.",
      [
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
      ],
    ),

    richTextField(
      "secondaryText",
      "Text pentru sectiunile de detaliu",
      "Apare dupa introducere, quote, galerie sau imagine, in functie de template. Foloseste-l pentru explicatii, pasi, observatii de ingrijire si recomandari practice.",
      ["layout2", "layout3", "layout6", "layout7", "layout9", "layout10"],
    ),

    imageField(
      "secondaryImage",
      "Imagine secundara din articol",
      "Apare in interiorul articolului ca pauza vizuala, detaliu de atmosfera sau imagine de sustinere. Recomandat: 1200x900 sau 1000x1200, in functie de compozitie.",
      ["layout1", "layout2", "layout6", "layout8", "layout10"],
    ),

    imageField(
      "verticalImage",
      "Imagine verticala premium",
      "Apare in template-urile cu compozitie verticala. Ideala pentru portrete florale, ghivece, colturi de terasa sau detalii elegante. Recomandat: 900x1300 sau mai mare.",
      ["layout5", "layout10"],
    ),

    defineField({
      name: "quoteText",
      title: "Citat evidentiat in mijlocul articolului",
      description:
        "Apare ca moment vizual puternic intre sectiuni. Scrie o fraza memorabila, calma si editoriala. Ideal: 80-220 de caractere.",
      type: "text",
      rows: 4,
      placeholder:
        "Ex: O hortensie bine asezata nu umple doar un colt de gradina; creeaza o camera verde.",
      hidden: hiddenExcept("layout2", "layout6", "layout9"),
      validation: (Rule) => Rule.max(260).warning("Citatele scurte au impact mai mare."),
    }),

    defineField({
      name: "quoteAttribution",
      title: "Autor / sursa citat",
      description:
        "Optional. Apare sub citat. Exemple: Enciclopedia Florilor, Redactia, numele autorului.",
      type: "string",
      placeholder: "Ex: Enciclopedia Florilor",
      hidden: hiddenExcept("layout2", "layout6", "layout9"),
      validation: (Rule) => Rule.max(80).warning("Atribuirea ar trebui sa fie scurta."),
    }),

    defineField({
      name: "checklistItems",
      title: "Pasi de ingrijire / lista practica",
      description:
        "Apare ca lista vizuala cu icon-uri/check-uri. Foloseste-o pentru pasi clari: lumina, apa, sol, plantare, taiere. Ideal: 3-6 item-uri.",
      type: "array",
      hidden: hiddenExcept("layout4", "layout8"),
      validation: (Rule) =>
        Rule.max(8).warning("Mai mult de 8 pasi poate incarca layout-ul."),
      of: [
        defineArrayMember({
          type: "object",
          title: "Pas de ingrijire",
          fields: [
            defineField({
              name: "title",
              title: "Titlul pasului",
              description: "Apare ca heading scurt in lista.",
              type: "string",
              placeholder: "Ex: Udare profunda",
              validation: (Rule) => Rule.max(60).warning("Titlurile scurte sunt mai scanabile."),
            }),
            defineField({
              name: "text",
              title: "Explicatia pasului",
              description: "Apare sub titlu. Scrie 1-2 fraze practice.",
              type: "text",
              rows: 2,
              placeholder:
                "Ex: Uda rar, dar consistent, astfel incat apa sa ajunga la radacini.",
              validation: (Rule) => Rule.max(180).warning("Pastreaza fiecare pas concis."),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "galleryImages",
      title: "Galerie de inspiratie",
      description:
        "Apare ca secventa vizuala in articol. Foloseste 3-6 imagini coerente cromatic: detaliu, cadru larg, textura, compozitie.",
      type: "array",
      hidden: hiddenExcept("layout5", "layout7", "layout10"),
      validation: (Rule) =>
        Rule.max(8).warning("O galerie foarte mare poate incarca pagina."),
      of: [galleryImageMember],
    }),

    defineField({
      name: "infoCards",
      title: "Sfaturi rapide / carduri de continut",
      description:
        "Apar ca blocuri premium in articol. Bune pentru lumina, apa, sol, amplasare, combinatii de plante sau principii de design.",
      type: "array",
      hidden: hiddenExcept("layout4", "layout8", "layout10"),
      validation: (Rule) =>
        Rule.max(6).warning("3-6 carduri pastreaza ritmul elegant."),
      of: [
        defineArrayMember({
          type: "object",
          title: "Sfat rapid",
          fields: [
            defineField({
              name: "title",
              title: "Titlul cardului",
              description: "Apare ca heading pe card.",
              type: "string",
              placeholder: "Ex: Lumina potrivita",
              validation: (Rule) => Rule.max(70).warning("Titlul cardului trebuie sa fie scurt."),
            }),
            defineField({
              name: "text",
              title: "Textul cardului",
              description: "Apare sub titlu. Scrie 2-3 fraze utile.",
              type: "text",
              rows: 3,
              placeholder:
                "Ex: Hortensia prefera soarele bland de dimineata si umbra partiala dupa-amiaza.",
              validation: (Rule) => Rule.max(260).warning("Cardurile lungi devin greu de scanat."),
            }),
            imageField(
              "image",
              "Imagine pentru card",
              "Optional. Apare in cardurile vizuale. Alege detalii clare: frunze, sol, apa, flori, textura.",
              ["layout4", "layout8", "layout10"],
            ),
          ],
        }),
      ],
    }),

    defineField({
      name: "timelineItems",
      title: "Timeline / calendar de ingrijire",
      description:
        "Apare ca succesiune de etape in articol. Foloseste-l pentru luni, sezoane sau pasi cronologici. Ideal: 4-7 momente.",
      type: "array",
      hidden: hiddenExcept("layout7"),
      validation: (Rule) =>
        Rule.max(9).warning("Un timeline prea lung devine greu de parcurs."),
      of: [
        defineArrayMember({
          type: "object",
          title: "Moment din timeline",
          fields: [
            defineField({
              name: "date",
              title: "Eticheta momentului",
              description: "Exemple: Martie, Aprilie, Vara, Dupa inflorire.",
              type: "string",
              placeholder: "Ex: Aprilie",
              validation: (Rule) => Rule.max(40).warning("Eticheta trebuie sa fie scurta."),
            }),
            defineField({
              name: "title",
              title: "Titlul momentului",
              description: "Apare ca heading in timeline.",
              type: "string",
              placeholder: "Ex: Pornirea in vegetatie",
              validation: (Rule) => Rule.max(80).warning("Pastreaza titlul scurt."),
            }),
            defineField({
              name: "text",
              title: "Explicatia momentului",
              description: "Scrie ce trebuie observat sau facut in aceasta etapa.",
              type: "text",
              rows: 3,
              placeholder:
                "Ex: Verifica mugurii, curata frunzele uscate si adauga compost matur.",
              validation: (Rule) => Rule.max(260).warning("Timeline-ul functioneaza mai bine cu texte scurte."),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "callout",
      title: "Caseta de recomandare / concluzie",
      description:
        "Apare ca bloc evidentiat in articol. Foloseste-l pentru nota de design, concluzie, recomandare sau link discret.",
      type: "object",
      hidden: hiddenExcept("layout3", "layout9", "layout10"),
      fields: [
        defineField({
          name: "title",
          title: "Titlul casetei",
          description: "Apare ca heading in callout.",
          type: "string",
          placeholder: "Ex: Nota de design",
          validation: (Rule) => Rule.max(70).warning("Titlul casetei trebuie sa fie scurt."),
        }),
        defineField({
          name: "text",
          title: "Textul casetei",
          description: "Scrie o concluzie, un sfat sau o recomandare clara.",
          type: "text",
          rows: 3,
          placeholder:
            "Ex: Pentru o gradina coerenta, repeta aceeasi floare in doua sau trei puncte vizuale.",
          validation: (Rule) => Rule.max(320).warning("Callout-ul ar trebui sa ramana aerisit."),
        }),
        defineField({
          name: "buttonLabel",
          title: "Text buton optional",
          description: "Apare doar daca adaugi si un link.",
          type: "string",
          placeholder: "Ex: Vezi toate articolele",
          validation: (Rule) => Rule.max(40).warning("Butoanele scurte arata mai premium."),
        }),
        defineField({
          name: "buttonHref",
          title: "Link buton optional",
          description: "Exemple: /blog, /flori, /contact sau link catre un articol.",
          type: "string",
          placeholder: "Ex: /blog",
        }),
      ],
    }),

    defineField({
      name: "relatedArticles",
      title: "Articole recomandate la final",
      description:
        "Apar la finalul articolelor de tip feature. Alege manual articole care continua natural lectura.",
      type: "array",
      hidden: hiddenExcept("layout10"),
      validation: (Rule) =>
        Rule.max(6).warning("3-6 articole recomandate sunt suficiente."),
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
    }),

    defineField({
      name: "categories",
      title: "Categorii editoriale",
      description:
        "Apar ca badge-uri pe carduri si ajuta la organizarea colectiei de articole.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) =>
        Rule.max(3).warning("1-3 categorii pastreaza cardurile curate."),
    }),

    defineField({
      name: "publishedAt",
      title: "Data publicarii",
      description:
        "Controleaza ordinea articolelor in colectie si data afisata in metadata.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "body",
      title: "Text vechi / fallback",
      description:
        "Foloseste acest camp doar pentru articole vechi care nu au fost migrate la template-uri. Pentru articole noi, completeaza campurile ghidate de mai sus.",
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
