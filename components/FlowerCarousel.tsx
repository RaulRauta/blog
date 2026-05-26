"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Flower = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

type Props = {
  flowers: Flower[];
};

const AUTOPLAY_DELAY = 5200;
const DRAG_THRESHOLD = 50;

function cleanFlowerName(name: string) {
  return name.split("Ã°")[0].split("ð")[0].trim();
}

export default function FlowerCarousel({ flowers }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const total = flowers.length;
  const activeFlower = flowers[activeIndex];

  const clearAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();

    if (total <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY);
  }, [clearAutoplay, total]);

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  const goToIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      startAutoplay();
    },
    [startAutoplay],
  );

  const goToNext = useCallback(() => {
    goToIndex((activeIndex + 1) % total);
  }, [activeIndex, total, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, goToIndex]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    dragEndX.current = e.clientX;
    didDrag.current = false;
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;

    dragEndX.current = e.clientX;

    if (Math.abs(dragStartX.current - dragEndX.current) > 8) {
      didDrag.current = true;
    }
  }

  function handlePointerUp() {
    if (dragStartX.current === null || dragEndX.current === null) return;

    const distance = dragStartX.current - dragEndX.current;

    if (distance > DRAG_THRESHOLD) {
      goToNext();
    } else if (distance < -DRAG_THRESHOLD) {
      goToPrev();
    }

    dragStartX.current = null;
    dragEndX.current = null;
  }

  function handleActiveClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (didDrag.current) {
      e.preventDefault();
      didDrag.current = false;
    }
  }

  if (!activeFlower) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-6xl">
      <div
        className="premium-blush-surface relative cursor-grab select-none overflow-hidden rounded-[2.5rem] p-3 active:cursor-grabbing sm:p-4 lg:p-5"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
          dragEndX.current = null;
        }}
      >
        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-blush-soft blur-2xl sm:block" />
        <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          <Link
            href={`/flori/${activeFlower.slug}`}
            onClick={handleActiveClick}
            className="group relative min-h-[24rem] overflow-hidden rounded-[2.15rem] border border-white/70 shadow-[0_28px_86px_rgba(35,53,31,0.13)] sm:min-h-[34rem]"
          >
            <Image
              key={activeFlower.slug}
              src={activeFlower.image}
              alt={cleanFlowerName(activeFlower.name)}
              fill
              draggable={false}
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
              className="premium-image object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/52 via-secondary/4 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="mb-3 inline-flex rounded-full bg-white/18 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
                Floare recomandata
              </p>
              <h3 className="max-w-xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl">
                {cleanFlowerName(activeFlower.name)}
              </h3>
            </div>
          </Link>

          <div className="flex flex-col justify-between rounded-[2.15rem] border border-white/60 bg-[#fffdf7]/68 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl sm:p-7">
            <div>
              <p className="editorial-kicker mb-4">Profil de gradina</p>
              <h3 className="font-serif text-4xl font-normal leading-tight tracking-normal text-secondary sm:text-5xl">
                {cleanFlowerName(activeFlower.name)}
              </h3>
              <p className="mt-5 text-base leading-8 text-gray-700">
                {activeFlower.description}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/58 p-4">
                  <p className="text-xs font-semibold text-blush">
                    Atmosfera
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    Textura blanda si culoare cu prezenta.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/58 p-4">
                  <p className="text-xs font-semibold text-blush">Ritm</p>
                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    Ideala pentru compozitii aerisite.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/flori/${activeFlower.slug}`}
                  className="botanical-button px-5 py-2.5 text-sm font-semibold"
                >
                  Vezi profilul
                </Link>

                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Floarea anterioara"
                    onClick={goToPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/20 bg-white/72 text-lg text-secondary shadow-[0_10px_30px_rgba(35,53,31,0.08)] transition hover:-translate-y-0.5 hover:bg-blush-soft"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    aria-label="Floarea urmatoare"
                    onClick={goToNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/20 bg-white/72 text-lg text-secondary shadow-[0_10px_30px_rgba(35,53,31,0.08)] transition hover:-translate-y-0.5 hover:bg-blush-soft"
                  >
                    {">"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {flowers.map((flower, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={flower.slug}
                      type="button"
                      aria-label={`Selecteaza ${cleanFlowerName(flower.name)}`}
                      onClick={() => goToIndex(index)}
                      className={`group relative h-20 overflow-hidden rounded-2xl border transition duration-300 sm:h-24 ${
                        isActive
                          ? "border-blush shadow-[0_12px_34px_rgba(35,53,31,0.12)]"
                          : "border-white/70 opacity-72 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={flower.image}
                        alt={cleanFlowerName(flower.name)}
                        fill
                        draggable={false}
                        sizes="140px"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/62 to-transparent px-2 pb-2 pt-5 text-left text-[11px] font-semibold text-white">
                        {cleanFlowerName(flower.name)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
