import Link from "next/link";
import type { Metadata } from "next";
import {
  CompactArticleCard,
  EditorialArticleCard,
  FeaturedArticleCard,
  HorizontalArticleCard,
  ImageFocusCard,
  SeasonalHighlightCard,
  getCategories,
} from "@/components/article-cards/EditorialArticleCards";
import { demoPosts } from "@/lib/demoArticle";
import { client, postsQuery, type SanityPost } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articole | Enciclopedia Florilor",
  description:
    "Ghiduri botanice, inspiratie de gradina si povesti florale intr-o colectie editoriala premium.",
};

async function getPosts() {
  try {
    return (await client.fetch(postsQuery)) as SanityPost[];
  } catch {
    return [];
  }
}

function uniqueCategories(posts: SanityPost[]) {
  const categories = posts.flatMap(getCategories);

  return Array.from(new Set(categories)).slice(0, 8);
}

export default async function BlogPage() {
  const sanityPosts = await getPosts();
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));
  const posts = [
    ...demoPosts.filter((post) => !sanitySlugs.has(post.slug)),
    ...sanityPosts,
  ];

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const remainingPosts = posts.filter((post) => post._id !== featuredPost?._id);
  const editorPicks = remainingPosts.slice(0, 3);
  const latestPosts = remainingPosts.slice(3);
  const visibleLatest = latestPosts.length > 0 ? latestPosts : remainingPosts;
  const categories = uniqueCategories(posts);
  const seasonalPost = posts.find((post) => post.seasonalLabel) || posts[0];

  return (
    <main className="min-h-screen bg-transparent px-4 py-7 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="article-reveal mb-9 sm:mb-12">
          <Link
            href="/"
            className="mb-6 inline-flex text-sm font-semibold text-gray-600 transition hover:text-primary sm:mb-8"
          >
            Inapoi acasa
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="editorial-kicker mb-3 sm:mb-4">Articole si ghiduri</p>
              <h1 className="max-w-4xl font-serif text-[2.75rem] font-normal leading-[1.03] tracking-normal text-secondary sm:text-6xl lg:text-7xl">
                O colectie botanica pentru citit incet si ales cu grija.
              </h1>
            </div>

            <div className="premium-blush-surface rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6">
              <p className="text-[0.96rem] leading-7 text-gray-700 sm:text-base sm:leading-8">
                Ghiduri de ingrijire, inspiratie pentru gradina si povesti
                despre flori, asezate intr-un ritm clar pentru explorare usoara.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6">
                <div>
                  <p className="font-serif text-3xl text-secondary">
                    {posts.length}
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    articole
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-secondary">
                    {categories.length}
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    teme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {featuredPost ? (
          <>
            <section className="mb-11 sm:mb-20">
              <FeaturedArticleCard post={featuredPost} />
            </section>

            <section className="mb-11 sm:mb-20">
              <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <p className="editorial-kicker mb-3">Selectia redactiei</p>
                  <h2 className="font-serif text-[2.2rem] font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                    Lecturi alese pentru inspiratie, ritm si gradini mai
                    frumoase.
                  </h2>
                </div>
                <Link
                  href="/flori"
                  className="botanical-button-secondary px-5 py-2.5 text-sm font-semibold"
                >
                  Exploreaza flori
                </Link>
              </div>

              {editorPicks.length > 0 ? (
                <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_0.85fr]">
                  <ImageFocusCard post={editorPicks[0]} />
                  <div className="grid gap-5">
                    {editorPicks.slice(1, 3).map((post, index) => (
                      <HorizontalArticleCard key={post._id} post={post} index={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="premium-surface rounded-[2rem] p-7">
                  <p className="max-w-2xl text-base leading-8 text-gray-700">
                    Colectia este la inceput. Pe masura ce apar articole noi,
                    aici vor fi asezate recomandarile principale.
                  </p>
                </div>
              )}
            </section>

            {categories.length > 0 && (
              <section className="mb-11 sm:mb-20">
                <div className="premium-surface-strong rounded-[1.55rem] p-5 sm:rounded-[2.25rem] sm:p-8">
                  <div className="grid gap-6 lg:grid-cols-[0.45fr_1fr] lg:items-center">
                    <div>
                      <p className="editorial-kicker mb-3">Teme de explorat</p>
                      <h2 className="font-serif text-[1.8rem] font-normal leading-tight tracking-normal text-secondary sm:text-4xl">
                        Gaseste rapid zona care te intereseaza.
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-blush/20 bg-blush-soft px-3.5 py-2 text-sm font-semibold text-secondary sm:px-4"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="mb-11 sm:mb-20">
              <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="editorial-kicker mb-3">Ultimele articole</p>
                  <h2 className="font-serif text-[2.2rem] font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                    O arhiva aerisita, pregatita sa creasca.
                  </h2>
                </div>
              </div>

              {visibleLatest.length > 0 ? (
                <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
                  {visibleLatest.slice(0, 9).map((post, index) => (
                    <EditorialArticleCard
                      key={`${post._id}-${index}`}
                      post={post}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="premium-surface rounded-[2rem] p-7">
                  <p className="text-base leading-8 text-gray-700">
                    Momentan exista un singur articol publicat. Colectia va
                    ramane ordonata pe masura ce apar ghiduri noi.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-11 grid gap-4 sm:mb-20 sm:gap-5 lg:grid-cols-[0.82fr_1.18fr]">
              {seasonalPost && <SeasonalHighlightCard post={seasonalPost} />}

              <div className="premium-blush-surface article-reveal rounded-[1.55rem] p-5 sm:rounded-[2.25rem] sm:p-9">
                <p className="editorial-kicker mb-4">Inspiratie de sezon</p>
                <h2 className="max-w-2xl font-serif text-[2.1rem] font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                  Alege articolele dupa ritmul gradinii, nu dupa graba zilei.
                </h2>
                <p className="mt-4 max-w-2xl text-[0.96rem] leading-7 text-gray-700 sm:mt-5 sm:text-base sm:leading-8">
                  Primavara cere plantari si culoare proaspata, vara cere apa si
                  umbra, iar toamna aduce structura. Colectia este pregatita sa
                  primeasca teme, filtre si selectii sezoniere fara sa piarda
                  claritatea.
                </p>
                <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                  {["Ingrijire", "Design de gradina", "Flori de sezon"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white/48 p-4 text-sm font-semibold text-secondary"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {posts.length > 1 && (
              <section className="mb-11 sm:mb-20">
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
                  <div>
                    <p className="editorial-kicker mb-3">Adaugate recent</p>
                    <h2 className="font-serif text-[2.05rem] font-normal leading-tight tracking-normal text-secondary sm:text-4xl">
                      Pentru o plimbare calma prin arhiva.
                    </h2>
                  </div>
                  <div className="rounded-[1.5rem] border border-secondary/10 bg-white/40 px-4 sm:rounded-[2rem] sm:px-7">
                    {posts.slice(0, 5).map((post, index) => (
                      <CompactArticleCard key={post._id} post={post} index={index} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="premium-surface rounded-[2rem] p-8">
            <h2 className="font-serif text-3xl font-normal tracking-normal text-secondary">
              Colectia de articole este in pregatire.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-700">
              In curand aici vor aparea ghiduri botanice, recomandari de flori
              si inspiratie pentru gradini.
            </p>
          </section>
        )}

        <section className="overflow-hidden rounded-[1.7rem] border border-white/70 bg-secondary text-white shadow-[0_26px_76px_rgba(35,53,31,0.2)] sm:rounded-[2.5rem]">
          <div className="grid gap-5 p-5 sm:gap-6 sm:p-10 lg:grid-cols-[1fr_0.75fr] lg:p-12">
            <div>
              <p className="mb-4 text-sm font-semibold text-blush">
                Ramai aproape de gradina
              </p>
              <h2 className="max-w-2xl font-serif text-[2.1rem] font-normal leading-tight tracking-normal sm:text-5xl">
                Exploreaza flori, ghiduri si idei care aduc mai multa liniste
                in spatiile verzi.
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                Enciclopedia Florilor creste ca o biblioteca vie, cu articole
                clare si imagini care te ajuta sa alegi mai bine.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/flori"
                  className="inline-flex justify-center rounded-full bg-[#fffdf7] px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
                >
                  Vezi florile
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-blush/70 hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
