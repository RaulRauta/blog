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
const DRAG_THRESHOLD = 50;

export default function FlowerCarousel({ flowers }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const didDrag = useRef(false);

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

    const distance = Math.abs(dragStartX.current - dragEndX.current);

    if (distance > 8) {
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

  function getRelativeIndex(index: number) {
    let relativeIndex = index - activeIndex;
    if (relativeIndex < 0) relativeIndex += total;
    return relativeIndex;
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl">
      <div
        className="relative cursor-grab select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
          dragEndX.current = null;
        }}
      >
        {/* Mobile */}
        <div className="relative mx-auto h-[500px] w-full max-w-sm overflow-hidden md:hidden">
          {flowers.map((flower, index) => {
            const relativeIndex = getRelativeIndex(index);

            let classes =
              "absolute left-1/2 top-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = {
              width: "84%",
            };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform = "translateX(-50%) translateY(0px) scale(1)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 cursor-pointer";
              style.transform = "translateX(-44%) translateY(16px) scale(0.92)";
              style.opacity = 0.45;
            } else if (relativeIndex === 2) {
              classes += " z-10 cursor-pointer";
              style.transform = "translateX(-56%) translateY(28px) scale(0.86)";
              style.opacity = 0.18;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform = "translateX(-50%) translateY(36px) scale(0.82)";
              style.opacity = 0;
            }

            const card = (
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    draggable={false}
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

            if (relativeIndex === 0) {
              return (
                <Link
                  key={flower.slug}
                  href={`/flori/${flower.slug}`}
                  onClick={handleActiveClick}
                  className={classes}
                  style={style}
                >
                  {card}
                </Link>
              );
            }

            return (
              <button
                key={flower.slug}
                type="button"
                onClick={() => goToIndex(index)}
                className={classes}
                style={style}
              >
                {card}
              </button>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="relative mx-auto hidden h-[470px] w-full max-w-5xl overflow-hidden md:block">
          {flowers.map((flower, index) => {
            const relativeIndex = getRelativeIndex(index);

            let classes =
              "absolute left-1/2 top-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = {
              width: "52%",
            };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform = "translateX(-50%) scale(1) rotate(0deg)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 cursor-pointer";
              style.transform =
                "translateX(-10%) translateY(18px) scale(0.92) rotate(4deg)";
              style.opacity = 0.55;
            } else if (relativeIndex === 2) {
              classes += " z-10 cursor-pointer";
              style.transform =
                "translateX(-90%) translateY(28px) scale(0.88) rotate(-5deg)";
              style.opacity = 0.22;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform = "translateX(-50%) translateY(36px) scale(0.82)";
              style.opacity = 0;
            }

            const card = (
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl transition hover:shadow-2xl">
                <div className="relative h-64 w-full">
                  <Image
                    src={flower.image}
                    alt={flower.name}
                    fill
                    draggable={false}
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

            if (relativeIndex === 0) {
              return (
                <Link
                  key={flower.slug}
                  href={`/flori/${flower.slug}`}
                  onClick={handleActiveClick}
                  className={classes}
                  style={style}
                >
                  {card}
                </Link>
              );
            }

            return (
              <button
                key={flower.slug}
                type="button"
                onClick={() => goToIndex(index)}
                className={classes}
                style={style}
              >
                {card}
              </button>
            );
          })}
        </div>
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
                isActive ? "w-8 bg-[var(--primary)]" : "w-2.5 bg-gray-300"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
