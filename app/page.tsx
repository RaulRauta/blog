import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FlowerCarousel from "@/components/FlowerCarousel";
import { demoPosts } from "@/lib/demoArticle";
import { flowers } from "@/lib/flowers";
import { client, imageUrl, postsQuery, type SanityPost } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enciclopedia Florilor | Revista botanica pentru gradini calme",
  description:
    "Flori, ghiduri de ingrijire si inspiratie botanica pentru case si gradini calme.",
};

const heroImages = [
  {
    src: "/images/articles/hortensia-demo/hero.png",
    alt: "Hortensii albastre intr-o gradina eleganta",
  },
  {
    src: "/images/articles/hortensia-demo/garden-border.png",
    alt: "Bordura botanica cu hortensii si frunzis bogat",
  },
  {
    src: "/images/trandafir.jpg",
    alt: "Trandafir in lumina calda",
  },
];

const whyItems = [
  {
    title: "Ingrijire clara",
    text: "Ghiduri scrise pe inteles, cu ritm, sezon, lumina, apa si sol explicate firesc.",
  },
  {
    title: "Inspiratie de gradina",
    text: "Idei pentru combinatii botanice, texturi, culori si colturi care se simt asezate.",
  },
  {
    title: "Enciclopedie vie",
    text: "Flori, articole si povesti botanice adunate intr-un loc calm, usor de explorat.",
  },
];

const editorialNotes = [
  "Palete moi, cu verde botanical, olive si blush discret.",
  "Articole gandite ca pagini de revista, nu ca postari generice.",
  "Imagini mari, lumina placuta si spatiu respirabil pe mobile.",
];

async function getPosts() {
  try {
    return (await client.fetch(postsQuery)) as SanityPost[];
  } catch {
    return [];
  }
}

function cleanFlowerName(name: string) {
  return name.split("ð")[0].trim();
}

export default async function Home() {
  const sanityPosts = await getPosts();
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug));
  const posts = [
    ...demoPosts.filter((post) => !sanitySlugs.has(post.slug)),
    ...sanityPosts,
  ];

  const featuredPost = posts[0];
  const guidePosts = posts.slice(0, 3);
  const featuredFlowers = flowers.slice(0, 3);

  return (
    <main className="min-h-screen bg-transparent">
      <section className="px-4 pb-16 pt-8 sm:pb-20 sm:pt-12">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="article-reveal">
            <p className="editorial-kicker mb-4">Enciclopedia Florilor</p>
            <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[1.02] tracking-normal text-secondary sm:text-6xl lg:text-7xl">
              Flori, gradini si liniste botanica, intr-o revista calda.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-700 sm:text-lg">
              Un loc pentru ingrijire atenta, inspiratie de sezon si articole
              botanice despre plantele care aduc viata in casa si in gradina.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="botanical-button px-6 py-3 text-sm font-semibold"
              >
                Citeste ghidurile
              </Link>
              <Link
                href="/contact"
                className="botanical-button-secondary px-6 py-3 text-sm font-semibold"
              >
                Vorbeste cu noi
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {["120+ note botanice", "Ghiduri de sezon", "Inspiratie calma"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/70 bg-white/48 px-3 py-4 text-center shadow-[0_14px_42px_rgba(35,53,31,0.06)] backdrop-blur-xl"
                  >
                    <p className="text-xs font-semibold leading-5 text-secondary">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="article-reveal relative min-h-[34rem] lg:min-h-[40rem]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-blush-soft blur-3xl" />
            <div className="relative grid h-full grid-cols-[0.72fr_1fr] gap-3 sm:gap-4">
              <div className="flex flex-col gap-3 pt-12 sm:gap-4 sm:pt-16">
                <div className="relative h-44 overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_24px_70px_rgba(35,53,31,0.13)] sm:h-56">
                  <Image
                    src={heroImages[1].src}
                    alt={heroImages[1].alt}
                    fill
                    sizes="(max-width: 768px) 42vw, 300px"
                    className="premium-image object-cover"
                  />
                </div>
                <div className="premium-blush-surface rounded-[2rem] p-5 sm:p-6">
                  <p className="font-serif text-2xl leading-tight text-secondary">
                    Lumina naturala, flori alese cu grija si inspiratie care nu
                    grabeste privirea.
                  </p>
                </div>
                <div className="relative h-36 overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_20px_56px_rgba(35,53,31,0.1)] sm:h-44">
                  <Image
                    src={heroImages[2].src}
                    alt={heroImages[2].alt}
                    fill
                    sizes="(max-width: 768px) 42vw, 300px"
                    className="premium-image object-cover"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 shadow-[0_30px_90px_rgba(35,53,31,0.16)]">
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 58vw, 620px"
                  className="premium-image object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/62 to-transparent p-5 text-white sm:p-7">
                  <p className="max-w-xs text-sm leading-6 text-white/86">
                    Hortensii, trandafiri, lalele si ghiduri pentru o gradina
                    cu atmosfera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="editorial-kicker mb-3">Flori recomandate</p>
              <h2 className="font-serif text-4xl font-normal tracking-normal text-secondary sm:text-5xl">
                Flori alese pentru gradini cu ritm, culoare si calm.
              </h2>
            </div>
            <Link
              href="/flori"
              className="botanical-button-secondary px-5 py-2.5 text-sm font-semibold"
            >
              Vezi florile
            </Link>
          </div>

          <FlowerCarousel flowers={flowers} />
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-blush-surface article-reveal rounded-[2.25rem] p-6 sm:p-9">
            <p className="editorial-kicker mb-4">Din revista</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
              Ghiduri care se citesc ca o plimbare printr-o gradina buna.
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-700">
              Aici gasesti ghiduri de ingrijire, idei de combinatii botanice
              si povesti despre flori care dau ritm, culoare si liniste unei
              gradini.
            </p>

            <ul className="mt-7 space-y-3">
              {editorialNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 rounded-2xl bg-white/42 p-4 text-sm leading-7 text-gray-700"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blush" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="article-reveal grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2.25rem] border border-white/70 shadow-[0_26px_80px_rgba(35,53,31,0.12)] sm:min-h-[34rem]">
              <Image
                src="/images/articles/hortensia-demo/vertical.png"
                alt="Hortensie verticala intr-o compozitie editoriala"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="premium-image object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              {featuredFlowers.map((flower) => (
                <Link
                  key={flower.slug}
                  href={`/flori/${flower.slug}`}
                  className="group premium-surface-strong rounded-[2rem] p-5 transition duration-300 hover:-translate-y-1"
                >
                  <p className="mb-2 text-xs font-semibold text-blush">
                    Floare de explorat
                  </p>
                  <h3 className="font-serif text-3xl font-normal tracking-normal text-secondary transition group-hover:text-primary">
                    {cleanFlowerName(flower.name)}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                    {flower.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="editorial-kicker mb-3">Articole si ghiduri</p>
              <h2 className="font-serif text-4xl font-normal tracking-normal text-secondary sm:text-5xl">
                Lecturi recente pentru casa, gradina si sezon.
              </h2>
            </div>
            <Link
              href="/blog"
              className="botanical-button-secondary px-5 py-2.5 text-sm font-semibold"
            >
              Toate articolele
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {guidePosts.map((post, index) => {
              const cardImageUrl = post.mainImage
                ? imageUrl(post.mainImage, 1000, 760)
                : null;

              return (
                <article
                  key={post._id}
                  className={`group article-reveal overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf7]/72 shadow-[0_22px_70px_rgba(35,53,31,0.08)] transition duration-500 hover:-translate-y-1 ${
                    index === 0 ? "lg:col-span-1" : ""
                  }`}
                >
                  {cardImageUrl && (
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={cardImageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 360px"
                          className="premium-image object-cover"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="p-5 sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="rounded-full bg-blush-soft px-3 py-1 font-semibold text-secondary">
                        Ghid botanic
                      </span>
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "ro-RO",
                          )}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-3xl font-normal leading-tight tracking-normal text-secondary">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex text-sm font-semibold text-secondary transition hover:text-primary"
                    >
                      Citeste articolul
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="premium-surface article-reveal rounded-[2rem] p-6 sm:p-7"
              >
                <div className="mb-5 h-10 w-10 rounded-full bg-blush-soft" />
                <h3 className="font-serif text-3xl font-normal tracking-normal text-secondary">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-secondary text-white shadow-[0_32px_100px_rgba(35,53,31,0.22)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="mb-4 text-sm font-semibold text-blush">
                Urmatorul pas
              </p>
              <h2 className="max-w-2xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl">
                Alege o floare, citeste un ghid sau spune-ne ce colt botanic
                pregatesti.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
                Enciclopedia Florilor este locul in care alegi mai usor florile
                potrivite si descoperi idei pentru spatii verzi cu atmosfera.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/blog"
                  className="inline-flex justify-center rounded-full bg-[#fffdf7] px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-blush-soft"
                >
                  Exploreaza articole
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-blush/70 hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="relative min-h-[22rem] lg:min-h-full">
              {featuredPost?.mainImage ? (
                <Image
                  src={imageUrl(featuredPost.mainImage, 1000, 900)}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover opacity-90"
                />
              ) : (
                <Image
                  src="/images/articles/hortensia-demo/care-detail.png"
                  alt="Detaliu botanic"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover opacity-90"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
