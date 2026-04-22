"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Flower = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

type Props = {
  flowers: Flower[];
};

export default function FlowerCarousel({ flowers }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = flowers.length;

  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(interval);
  }, [total]);

  const orderedFlowers = useMemo(() => {
    return flowers.map((_, i) => flowers[(activeIndex + i) % total]);
  }, [flowers, activeIndex, total]);

  const activeFlower = orderedFlowers[0];
  const nextFlower = orderedFlowers[1];
  const thirdFlower = orderedFlowers[2];

  function goToNext() {
    setActiveIndex((prev) => (prev + 1) % total);
  }

  function goToPrev() {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.changedTouches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = e.changedTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-sm md:max-w-5xl">
      {/* Mobile */}
      <div
        className="relative h-[430px] md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {thirdFlower && (
          <div className="pointer-events-none absolute left-4 top-6 w-[82%] scale-95 opacity-35 transition-all duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-md">
              <div className="relative h-52 w-full">
                <Image
                  src={thirdFlower.image}
                  alt={thirdFlower.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {nextFlower && (
          <div className="pointer-events-none absolute right-2 top-3 z-10 w-[86%] scale-[0.98] opacity-65 transition-all duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-lg">
              <div className="relative h-52 w-full">
                <Image
                  src={nextFlower.image}
                  alt={nextFlower.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <Link
          href={`/flori/${activeFlower.slug}`}
          className="absolute left-0 top-0 z-20 block w-[90%] transition-all duration-500 active:scale-[0.99]"
        >
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
            <div className="relative h-56 w-full">
              <Image
                src={activeFlower.image}
                alt={activeFlower.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-5">
              <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Floare
              </div>

              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-950">
                {activeFlower.name}
              </h2>

              <p className="text-sm leading-7 text-gray-600 line-clamp-3">
                {activeFlower.description}
              </p>
            </div>
          </div>
        </Link>

        <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {flowers.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Mergi la cardul ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-8 bg-[var(--primary)]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop */}
      <div className="relative hidden h-[460px] md:block">
        {thirdFlower && (
          <div className="pointer-events-none absolute left-0 top-10 w-[48%] rotate-[-5deg] scale-95 opacity-40 transition-all duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-md">
              <div className="relative h-60 w-full">
                <Image
                  src={thirdFlower.image}
                  alt={thirdFlower.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {nextFlower && (
          <div className="pointer-events-none absolute right-0 top-6 z-10 w-[50%] rotate-[4deg] scale-[0.98] opacity-70 transition-all duration-500">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-lg">
              <div className="relative h-60 w-full">
                <Image
                  src={nextFlower.image}
                  alt={nextFlower.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <Link
          href={`/flori/${activeFlower.slug}`}
          className="absolute left-1/2 top-0 z-20 block w-[54%] -translate-x-1/2 transition-all duration-500 hover:scale-[1.01]"
        >
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
            <div className="relative h-64 w-full">
              <Image
                src={activeFlower.image}
                alt={activeFlower.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6">
              <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Floare
              </div>

              <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-950">
                {activeFlower.name}
              </h2>

              <p className="text-base leading-7 text-gray-600 line-clamp-3">
                {activeFlower.description}
              </p>
            </div>
          </div>
        </Link>

        <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {flowers.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Mergi la cardul ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  isActive
                    ? "w-8 bg-[var(--primary)]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
