import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanityPost } from "@/lib/sanity";

const image = (file: string, alt: string, caption?: string): SanityImage => ({
  _type: "image",
  asset: {
    _id: file,
    url: `/images/articles/hortensia-demo/${file}`,
  },
  alt,
  caption,
});

const p = (text: string): PortableTextBlock => ({
  _type: "block",
  _key: text.slice(0, 18).replace(/\W/g, "-"),
  style: "normal",
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: `${text.slice(0, 10).replace(/\W/g, "-")}-span`,
      text,
      marks: [],
    },
  ],
});

const h2 = (text: string): PortableTextBlock => ({
  ...p(text),
  style: "h2",
});

const h3 = (text: string): PortableTextBlock => ({
  ...p(text),
  style: "h3",
});

export const hortensiaDemoArticle: SanityPost = {
  _id: "demo-hortensia-ghid-complet",
  title: "Hortensia - ghid complet de ingrijire si integrare in gradina",
  slug: "hortensia-ghid-complet-ingrijire-gradina",
  layout: "layout10",
  excerpt:
    "Un ghid editorial despre cum alegi, plantezi si integrezi hortensia intr-o gradina eleganta, de la lumina si sol pana la ritmul vizual al bordurilor mature.",
  publishedAt: "2026-05-26T08:00:00.000Z",
  categories: [{ title: "Ghid de ingrijire" }, { title: "Landscape design" }],
  mainImage: image(
    "hero.png",
    "Hortensii albastre si albe integrate intr-o bordura de gradina eleganta",
    "Hortensia creeaza volum, prospetime si un fundal romantic pentru alei si terase.",
  ),
  verticalImage: image(
    "vertical.png",
    "Hortensie albastra in ghiveci ceramic pe terasa umbrita",
    "In ghivece mari, hortensia devine o piesa sculpturala pentru zonele de tranzitie.",
  ),
  secondaryImage: image(
    "garden-border.png",
    "Bordura de gradina cu hortensii, hosta, ferigi si buxus tuns",
    "Plantarea in straturi transforma hortensia din accent floral in structura de gradina.",
  ),
  galleryImages: [
    image(
      "garden-border.png",
      "Hortensii integrate intr-o bordura cu frunze mari si texturi verzi",
      "Textura frunzelor conteaza la fel de mult ca floarea.",
    ),
    image(
      "care-detail.png",
      "Unelte de ingrijire pentru hortensii pe masa de piatra",
      "Ingrijirea corecta inseamna taiere moderata, apa constanta si observatie sezoniera.",
    ),
    image(
      "vertical.png",
      "Hortensie in ghiveci ceramic intr-un colt de terasa",
      "Un vas generos ajuta radacina sa ramana rece si stabila.",
    ),
  ],
  introText: [
    p(
      "Hortensia este una dintre plantele care pot schimba instantaneu atmosfera unei gradini. Are volum, culoare, textura si o prezenta calma, aproape arhitecturala. Intr-o amenajare premium, ea functioneaza cel mai bine atunci cand nu este tratata ca o floare izolata, ci ca un element de compozitie: o masa vegetala care leaga terasa de alee, umbra de lumina si sezonul cald de finalul verii.",
    ),
    p(
      "Secretul unei hortensii spectaculoase nu sta intr-un singur truc, ci intr-un set de decizii coerente: locul potrivit, solul mentinut reavan, o expunere blanda si o taiere adaptata speciei. Cand aceste detalii sunt respectate, planta devine longeviva, generoasa si surprinzator de usor de integrat.",
    ),
  ],
  secondaryText: [
    h2("Cum o integrezi intr-o gradina eleganta"),
    p(
      "Hortensia arata cel mai bine in grupuri de trei sau cinci plante, cu distante care ii permit sa respire. In fata ei pot sta hosta, ferigi, brunnera sau ierburi fine de umbra, iar in spate se pot folosi tise, buxus sau arbusti vesnic verzi. Rezultatul este o scena stratificata, cu flori mari, frunze late si o baza verde care ramane interesanta si dupa trecerea florilor.",
    ),
    p(
      "Pentru un efect de revista, evita combinatiile prea aglomerate. Alege doua-trei texturi dominante, repeta-le pe lungimea bordurii si pastreaza o paleta calma: alb, albastru prafuit, roz pal, sage si verde inchis. Hortensia iubeste ritmul, nu zgomotul.",
    ),
    h3("Sol, lumina si apa"),
    p(
      "Solul ideal este bogat in materie organica, usor acid si bine drenat, dar constant reavan. Lumina de dimineata si umbra partiala dupa-amiaza sunt perfecte pentru majoritatea hortensiilor cu frunza mare. Udarea trebuie sa fie profunda, mai rara decat stropirea superficiala, astfel incat radacinile sa coboare si planta sa reziste mai bine in zilele calde.",
    ),
  ],
  quoteText:
    "O hortensie bine asezata nu umple doar un colt de gradina; creeaza o camera verde, un loc in care lumina pare mai moale.",
  quoteAttribution: "Enciclopedia Florilor",
  checklistItems: [
    {
      _key: "plantare",
      title: "Plantare in semiumbra",
      text: "Alege zone cu soare bland dimineata si protectie dupa-amiaza, mai ales in verile foarte calde.",
    },
    {
      _key: "udare",
      title: "Udare profunda",
      text: "Uda rar, dar consistent. Mulciul fin pastreaza umiditatea si protejeaza radacinile superficiale.",
    },
    {
      _key: "sol",
      title: "Sol bogat si reavan",
      text: "Compostul matur si frunzele descompuse sustin inflorirea fara sa forteze planta.",
    },
    {
      _key: "taiere",
      title: "Taiere adaptata speciei",
      text: "Nu taia agresiv primavara daca nu cunosti tipul de hortensie; unele infloresc pe lemn vechi.",
    },
  ],
  infoCards: [
    {
      _key: "lumina",
      title: "Lumina",
      text: "Ideala este lumina filtrata sau soarele de dimineata. Umbra completa reduce inflorirea, iar arsita directa poate arde frunzele.",
      image: image("vertical.png", "Hortensie in lumina filtrata pe terasa"),
    },
    {
      _key: "apa",
      title: "Apa",
      text: "Hortensia prefera un ritm constant. In perioade uscate, verifica solul la 4-5 cm adancime inainte de udare.",
      image: image("care-detail.png", "Detaliu cu unelte si ritual de ingrijire"),
    },
    {
      _key: "sol-card",
      title: "Sol",
      text: "Un sol cu humus, usor acid, ajuta planta sa ramana viguroasa. In ghiveci, foloseste un substrat premium pentru arbusti acidofili.",
      image: image("garden-border.png", "Bordura stratificata cu hortensii si frunzis"),
    },
  ],
  callout: {
    title: "Nota de design",
    text: "Pentru o gradina coerenta, repeta hortensia in doua sau trei puncte vizuale si leaga-le prin frunzis verde inchis. Repetitia discreta da senzatia de proiect matur, nu de colectie intamplatoare.",
    buttonLabel: "Vezi toate articolele",
    buttonHref: "/blog",
  },
  author: {
    name: "Redactia Enciclopedia Florilor",
    image: image("care-detail.png", "Detaliu editorial cu unelte de gradinarit"),
    bio: [
      p(
        "Ghidurile Enciclopedia Florilor combina observatia practica din gradina cu principii de design peisagistic, pentru plante care arata bine nu doar in fotografie, ci si in viata de zi cu zi.",
      ),
    ],
  },
  relatedArticles: [
    {
      _id: "demo-related-trandafiri",
      title: "Trandafirii in gradina moderna: structura, culoare si parfum",
      slug: "trandafiri-gradina-moderna",
      excerpt:
        "Cum folosesti trandafirii ca puncte focale fara sa incarci compozitia gradinii.",
      mainImage: image("garden-border.png", "Gradina eleganta cu flori si frunzis stratificat"),
      categories: [{ title: "Design floral" }],
    },
    {
      _id: "demo-related-terasa",
      title: "Flori pentru terasa umbrita: selectie premium pentru ghivece mari",
      slug: "flori-terasa-umbrita",
      excerpt:
        "Plante cu volum, textura si rezistenta pentru colturi racoroase si elegante.",
      mainImage: image("vertical.png", "Hortensie in ghiveci pe terasa umbrita"),
      categories: [{ title: "Terase si ghivece" }],
    },
    {
      _id: "demo-related-ingrijire",
      title: "Ritualul de ingrijire al gradinii: apa, mulci si taiere blanda",
      slug: "ritual-ingrijire-gradina",
      excerpt:
        "Un cadru simplu pentru plante sanatoase si borduri care isi pastreaza forma.",
      mainImage: image("care-detail.png", "Unelte de ingrijire pentru flori"),
      categories: [{ title: "Ingrijire" }],
    },
  ],
};

export const demoPosts = [hortensiaDemoArticle];

export function getDemoPostBySlug(slug: string) {
  return demoPosts.find((post) => post.slug === slug) || null;
}
