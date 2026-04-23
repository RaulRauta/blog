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

const AUTOPLAY_DELAY = 4000;
const TRANSITION_MS = 550;

export default function FlowerCarousel({ flowers }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = flowers.length;

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
      if (index === activeIndex) {
        startAutoplay();
        return;
      }

      setActiveIndex(index);
      startAutoplay();
    },
    [activeIndex, startAutoplay],
  );

  const goToNext = useCallback(() => {
    goToIndex((activeIndex + 1) % total);
  }, [activeIndex, total, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, goToIndex]);

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
      <div
        className="relative overflow-hidden md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[430px]">
          {flowers.map((flower, index) => {
            let relativeIndex = index - activeIndex;
            if (relativeIndex < 0) relativeIndex += total;

            let classes =
              "absolute top-0 left-1/2 w-[88%] -translate-x-1/2 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = {
              transitionDuration: `${TRANSITION_MS}ms`,
            };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform = "translateX(-50%) translateY(0px) scale(1)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 pointer-events-none";
              style.transform = "translateX(-34%) translateY(16px) scale(0.94)";
              style.opacity = 0.7;
            } else if (relativeIndex === 2) {
              classes += " z-10 pointer-events-none";
              style.transform = "translateX(-66%) translateY(30px) scale(0.88)";
              style.opacity = 0.35;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform = "translateX(-50%) translateY(40px) scale(0.82)";
              style.opacity = 0;
            }

            const card = (
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover"
                    priority={relativeIndex === 0}
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    Floare
                  </div>

                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-950">
                    {flower.name}
                  </h2>

                  <p className="text-sm leading-7 text-gray-600 line-clamp-3">
                    {flower.description}
                  </p>
                </div>
              </div>
            );

            return relativeIndex === 0 ? (
              <Link
                key={flower.slug}
                href={`/flori/${flower.slug}`}
                className={classes}
                style={style}
              >
                {card}
              </Link>
            ) : (
              <div key={flower.slug} className={classes} style={style}>
                {card}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {flowers.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Mergi la cardul ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[var(--primary)]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="relative hidden overflow-hidden md:block">
        <div className="relative h-[470px]">
          {flowers.map((flower, index) => {
            let relativeIndex = index - activeIndex;
            if (relativeIndex < 0) relativeIndex += total;

            let classes =
              "absolute top-0 left-1/2 w-[54%] -translate-x-1/2 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = {
              transitionDuration: `${TRANSITION_MS}ms`,
            };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform =
                "translateX(-50%) translateY(0px) scale(1) rotate(0deg)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 pointer-events-none";
              style.transform =
                "translateX(-6%) translateY(18px) scale(0.92) rotate(4deg)";
              style.opacity = 0.7;
            } else if (relativeIndex === 2) {
              classes += " z-10 pointer-events-none";
              style.transform =
                "translateX(-94%) translateY(28px) scale(0.88) rotate(-5deg)";
              style.opacity = 0.35;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform =
                "translateX(-50%) translateY(40px) scale(0.82) rotate(0deg)";
              style.opacity = 0;
            }

            const card = (
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
                <div className="relative h-64 w-full">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover"
                    priority={relativeIndex === 0}
                  />
                </div>

                <div className="p-6">
                  <div className="mb-3 inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    Floare
                  </div>

                  <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-950">
                    {flower.name}
                  </h2>

                  <p className="text-base leading-7 text-gray-600 line-clamp-3">
                    {flower.description}
                  </p>
                </div>
              </div>
            );

            return relativeIndex === 0 ? (
              <Link
                key={flower.slug}
                href={`/flori/${flower.slug}`}
                className={classes}
                style={style}
              >
                {card}
              </Link>
            ) : (
              <div key={flower.slug} className={classes} style={style}>
                {card}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {flowers.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Mergi la cardul ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
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
