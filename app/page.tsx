import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FlowerCarousel from "@/components/FlowerCarousel";
import { formatDate, readingTime } from "@/components/article-cards/EditorialArticleCards";
import { demoPosts } from "@/lib/demoArticle";
import { flowers } from "@/lib/flowers";
import { client, imageUrl, postsQuery, type SanityPost } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enciclopedia Florilor | Jurnal botanic premium",
  description:
    "O enciclopedie florala cu ghiduri, povesti botanice si inspiratie pentru gradini calme.",
};

const sceneImages = {
  hero: "/images/articles/hortensia-demo/hero.png",
  border: "/images/articles/hortensia-demo/garden-border.png",
  vertical: "/images/articles/hortensia-demo/vertical.png",
  care: "/images/articles/hortensia-demo/care-detail.png",
};

const pathways = [
  {
    title: "Ingrijire cu ritm",
    text: "Lumina, apa, sol si mici gesturi care fac plantele sa ramana frumoase mai mult timp.",
    href: "/blog",
  },
  {
    title: "Flori ca personaje",
    text: "Profiluri botanice care explica atmosfera, simbolul si locul fiecarei flori in gradina.",
    href: "/flori",
  },
  {
    title: "Gradini cu poveste",
    text: "Idei de compozitie, texturi si culori pentru spatii verzi care se simt asezate.",
    href: "/blog",
  },
];

const journalNotes = [
  "O floare buna nu este doar frumoasa. Are ritm, volum si o relatie clara cu lumina.",
  "Ghidurile sunt scrise pentru cititori care vor plante sanatoase, dar si gradini cu atmosfera.",
  "Fiecare articol trebuie sa lase in urma o idee simpla, aplicabila si memorabila.",
];

async function getPosts() {
  try {
    return (await client.fetch(postsQuery)) as SanityPost[];
  } catch {
    return [];
  }
}

function cleanFlowerName(name: string) {
  return name.split("Ã")[0].split("ð")[0].trim();
}

function categoryLabel(post?: SanityPost) {
  return post?.categories?.[0]?.title || "Jurnal botanic";
}

function postImage(post?: SanityPost, width = 1200, height = 900) {
  if (!post?.mainImage) return sceneImages.hero;

  return imageUrl(post.mainImage, width, height);
}

function StoryMeta({ post, light = false }: { post?: SanityPost; light?: boolean }) {
  if (!post) return null;

  const date = formatDate(post.publishedAt);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-xs ${
        light ? "text-white/72" : "text-gray-500"
      }`}
    >
      <span>{categoryLabel(post)}</span>
      <span aria-hidden="true">/</span>
      <span>{readingTime(post)} min citire</span>
      {date && (
        <>
          <span aria-hidden="true">/</span>
          <span>{date}</span>
        </>
      )}
    </div>
  );
}

export default async function Home() {
  const sanityPosts = await getPosts();
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));
  const posts = [
    ...demoPosts.filter((post) => !sanitySlugs.has(post.slug)),
    ...sanityPosts,
  ];

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const secondaryStories = posts.filter((post) => post._id !== featuredPost?._id);
  const firstSecondary = secondaryStories[0];
  const secondSecondary = secondaryStories[1];
  const recentStories = posts.slice(0, 4);
  const featuredFlowers = flowers.slice(0, 3);

  return (
    <main className="min-h-screen bg-transparent">
      <section className="px-4 pb-16 pt-8 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <div className="article-reveal overflow-hidden rounded-[2.8rem] border border-white/70 bg-secondary text-white shadow-[0_38px_120px_rgba(31,50,28,0.24)]">
            <div className="grid min-h-[42rem] lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative flex flex-col justify-between gap-12 p-7 sm:p-10 lg:p-12">
                <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-blush/24 blur-3xl" />
                <div className="relative">
                  <p className="mb-5 text-sm font-semibold text-blush">
                    Enciclopedia Florilor
                  </p>
                  <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
                    Un jurnal botanic pentru gradini care se simt vii.
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/74 sm:text-lg">
                    Flori, ghiduri si povesti asezate ca intr-o revista calda:
                    cu imagine, ritm, lumina si recomandari care pot fi puse in
                    practica.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/blog"
                      className="inline-flex justify-center rounded-full bg-[#fffaf1] px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
                    >
                      Intra in jurnal
                    </Link>
                    <Link
                      href="/flori"
                      className="inline-flex justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-blush/70 hover:bg-white/10"
                    >
                      Exploreaza florile
                    </Link>
                  </div>
                </div>

                <div className="relative grid grid-cols-3 gap-3">
                  {["Flori", "Ghiduri", "Gradini"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-xl"
                    >
                      <p className="font-serif text-2xl leading-none text-blush">
                        {item.slice(0, 1)}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-white/78">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[30rem] overflow-hidden lg:min-h-full">
                <Image
                  src={sceneImages.hero}
                  alt="Hortensii albastre intr-o gradina eleganta"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="premium-image object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/68 via-secondary/8 to-transparent lg:bg-gradient-to-r" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="max-w-md rounded-[2rem] border border-white/18 bg-white/12 p-5 text-white backdrop-blur-xl">
                    <p className="text-xs font-semibold text-blush">
                      Povestea lunii
                    </p>
                    <p className="mt-3 font-serif text-3xl leading-tight tracking-normal">
                      Hortensia si arta gradinilor cu lumina blanda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {pathways.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group article-reveal rounded-[2rem] border border-white/70 bg-[#fffaf1]/72 p-6 shadow-[0_22px_70px_rgba(31,50,28,0.08)] transition duration-500 hover:-translate-y-1 hover:bg-[#fffaf1]/92"
              >
                <span className="font-serif text-4xl text-blush">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-normal text-secondary transition group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-700">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="px-4 py-14 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
              <div>
                <p className="editorial-kicker mb-4">Poveste curatoriată</p>
                <h2 className="max-w-3xl font-serif text-5xl font-normal leading-tight tracking-normal text-secondary sm:text-6xl">
                  Nu publicam doar articole. Asezam povesti care dau forma unei
                  gradini.
                </h2>
              </div>
              <p className="max-w-lg text-base leading-8 text-gray-700">
                Fiecare lectura de pe prima pagina trebuie sa aiba un rol:
                inspiratie, claritate, ritm de ingrijire sau o idee vizuala pe
                care o poti lua cu tine.
              </p>
            </div>

            <article className="article-reveal overflow-hidden rounded-[2.65rem] border border-white/70 bg-[#fffaf1]/78 shadow-[0_34px_110px_rgba(31,50,28,0.13)]">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative min-h-[28rem] overflow-hidden sm:min-h-[38rem]"
                >
                  <Image
                    src={postImage(featuredPost, 1600, 1100)}
                    alt={featuredPost.mainImage?.alt || featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="premium-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/62 via-transparent to-transparent" />
                </Link>

                <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
                  <div>
                    <StoryMeta post={featuredPost} />
                    <h3 className="mt-6 font-serif text-4xl font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="transition hover:text-primary"
                      >
                        {featuredPost.title}
                      </Link>
                    </h3>
                    {featuredPost.excerpt && (
                      <p className="mt-6 text-base leading-8 text-gray-700">
                        {featuredPost.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 border-t border-secondary/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                    <p className="font-serif text-2xl leading-tight text-secondary">
                      Citeste ca sa intelegi planta, apoi revino cand alegi
                      locul ei in gradina.
                    </p>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="botanical-button px-6 py-3 text-sm font-semibold"
                    >
                      Deschide povestea
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <div>
              <p className="editorial-kicker mb-4">Cabinet botanic</p>
              <h2 className="max-w-3xl font-serif text-5xl font-normal leading-tight tracking-normal text-secondary sm:text-6xl">
                Alege o floare dupa stare, lumina si locul in care va trai.
              </h2>
            </div>
            <Link
              href="/flori"
              className="botanical-button-secondary w-fit px-5 py-2.5 text-sm font-semibold"
            >
              Vezi atlasul
            </Link>
          </div>

          <FlowerCarousel flowers={flowers} />
        </div>
      </section>

      <section className="px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="article-reveal premium-blush-surface rounded-[2.35rem] p-7 sm:p-9">
              <p className="editorial-kicker mb-4">Jurnalul gradinii</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                Lecturi care nu se simt ca o arhiva, ci ca un traseu.
              </h2>
              <p className="mt-5 text-base leading-8 text-gray-700">
                In loc sa rasfoiesti o lista, intri intr-o selectie: note de
                ingrijire, idei de compozitie si mici observatii care fac
                gradina mai personala.
              </p>
              <div className="mt-8 space-y-4">
                {journalNotes.map((note) => (
                  <p
                    key={note}
                    className="rounded-2xl bg-white/48 p-4 text-sm leading-7 text-gray-700"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <article className="group article-reveal overflow-hidden rounded-[2.35rem] border border-white/70 bg-secondary text-white shadow-[0_28px_90px_rgba(31,50,28,0.18)]">
                  <Link
                    href={firstSecondary ? `/blog/${firstSecondary.slug}` : "/blog"}
                    className="relative block h-72 overflow-hidden"
                  >
                    <Image
                      src={postImage(firstSecondary || featuredPost, 1000, 760)}
                      alt={firstSecondary?.title || featuredPost?.title || "Gradina botanica"}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="premium-image object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/68 via-transparent to-transparent" />
                  </Link>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-blush">
                      De citit cand ai 10 minute
                    </p>
                    <h3 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-normal">
                      <Link
                        href={firstSecondary ? `/blog/${firstSecondary.slug}` : "/blog"}
                        className="transition hover:text-blush"
                      >
                        {firstSecondary?.title || "Exploreaza colectia botanica"}
                      </Link>
                    </h3>
                  </div>
                </article>

                <article className="article-reveal rounded-[2.35rem] border border-white/70 bg-[#fffaf1]/78 p-6 shadow-[0_24px_78px_rgba(31,50,28,0.08)]">
                  <p className="editorial-kicker mb-4">Nota de sezon</p>
                  <h3 className="font-serif text-3xl font-normal leading-tight tracking-normal text-secondary">
                    {secondSecondary?.title ||
                      "Lumina de dimineata este cel mai bun inceput pentru multe flori."}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-gray-700">
                    {secondSecondary?.excerpt ||
                      "Alege plantele nu doar dupa culoare, ci dupa felul in care lumina le atinge la ore diferite."}
                  </p>
                  <Link
                    href={secondSecondary ? `/blog/${secondSecondary.slug}` : "/blog"}
                    className="mt-6 inline-flex text-sm font-semibold text-secondary transition hover:text-primary"
                  >
                    Continua lectura
                  </Link>
                </article>
              </div>

              <div className="article-reveal rounded-[2.35rem] border border-secondary/10 bg-white/44 px-5 py-3 backdrop-blur-xl sm:px-7">
                {recentStories.map((post, index) => (
                  <Link
                    key={`${post._id}-${index}`}
                    href={`/blog/${post.slug}`}
                    className="grid gap-3 border-b border-secondary/10 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                  >
                    <span className="font-serif text-3xl text-blush">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-2xl leading-tight text-secondary transition hover:text-primary">
                      {post.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {readingTime(post)} min
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-white/70 bg-[#fffaf1]/82 shadow-[0_32px_100px_rgba(31,50,28,0.12)]">
          <div className="grid lg:grid-cols-[1fr_0.86fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="editorial-kicker mb-4">Atlas de atmosfera</p>
              <h2 className="max-w-2xl font-serif text-5xl font-normal leading-tight tracking-normal text-secondary sm:text-6xl">
                Trei flori, trei feluri de a schimba un spatiu.
              </h2>
              <div className="mt-9 grid gap-4">
                {featuredFlowers.map((flower) => (
                  <Link
                    key={flower.slug}
                    href={`/flori/${flower.slug}`}
                    className="group grid gap-4 rounded-[2rem] border border-secondary/10 bg-white/48 p-4 transition hover:border-blush/40 hover:bg-white/70 sm:grid-cols-[6rem_1fr] sm:items-center"
                  >
                    <div className="relative h-28 overflow-hidden rounded-[1.4rem] sm:h-24">
                      <Image
                        src={flower.image}
                        alt={cleanFlowerName(flower.name)}
                        fill
                        sizes="120px"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl font-normal tracking-normal text-secondary">
                        {cleanFlowerName(flower.name)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-7 text-gray-700">
                        {flower.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative min-h-[32rem]">
              <Image
                src={sceneImages.vertical}
                alt="Hortensie verticala intr-un colt de terasa"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="premium-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/54 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.75rem] border border-white/70 bg-secondary text-white shadow-[0_32px_100px_rgba(31,50,28,0.24)]">
          <div className="grid lg:grid-cols-[0.86fr_1fr]">
            <div className="relative min-h-[22rem] lg:min-h-full">
              <Image
                src={sceneImages.care}
                alt="Detaliu botanic cu unelte de ingrijire"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent" />
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="mb-4 text-sm font-semibold text-blush">
                Incepe de oriunde
              </p>
              <h2 className="max-w-2xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl">
                Alege o floare, citeste o poveste sau scrie-ne despre gradina
                pe care vrei sa o cresti.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
                Enciclopedia Florilor este gandita ca o plimbare lenta: revii
                pentru raspunsuri, ramai pentru inspiratie.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/blog"
                  className="inline-flex justify-center rounded-full bg-[#fffaf1] px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
                >
                  Citeste jurnalul
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-blush/70 hover:bg-white/10"
                >
                  Scrie-ne
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
