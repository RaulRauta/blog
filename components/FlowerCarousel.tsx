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

const AUTOPLAY_DELAY = 4800;
const DRAG_THRESHOLD = 50;

function cleanFlowerName(name: string) {
  return name.split("ð")[0].trim();
}

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

  function getRelativeIndex(index: number) {
    let relativeIndex = index - activeIndex;
    if (relativeIndex < 0) relativeIndex += total;
    return relativeIndex;
  }

  function renderCard(flower: Flower, relativeIndex: number, large = false) {
    return (
      <div className="group overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf7]/86 shadow-[0_26px_82px_rgba(35,53,31,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_92px_rgba(35,53,31,0.14)]">
        <div
          className={`relative w-full overflow-hidden ${
            large ? "h-72" : "h-64"
          }`}
        >
          <Image
            src={flower.image}
            alt={cleanFlowerName(flower.name)}
            fill
            draggable={false}
            className="premium-image object-cover"
            priority={relativeIndex === 0}
          />
        </div>

        <div className={large ? "p-7" : "p-6"}>
          <div className="mb-4 inline-flex rounded-full border border-blush/20 bg-blush-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-normal text-secondary">
            Floare recomandata
          </div>

          <h2
            className={`${large ? "text-4xl" : "text-3xl"} mb-3 font-serif font-normal tracking-normal text-secondary`}
          >
            {cleanFlowerName(flower.name)}
          </h2>

          <p
            className={`${large ? "text-base" : "text-sm"} line-clamp-3 leading-7 text-gray-600`}
          >
            {flower.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-6xl">
      <div
        className="relative cursor-grab select-none rounded-[2rem] px-2 py-4 active:cursor-grabbing sm:px-6"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
          dragEndX.current = null;
        }}
      >
        <div className="relative mx-auto h-[34rem] w-full max-w-sm overflow-hidden md:hidden">
          {flowers.map((flower, index) => {
            const relativeIndex = getRelativeIndex(index);
            let classes =
              "absolute left-1/2 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = { width: "86%" };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform = "translateX(-50%) translateY(0px) scale(1)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 cursor-pointer";
              style.transform = "translateX(-43%) translateY(18px) scale(0.92)";
              style.opacity = 0.42;
            } else if (relativeIndex === 2) {
              classes += " z-10 cursor-pointer";
              style.transform = "translateX(-57%) translateY(30px) scale(0.86)";
              style.opacity = 0.16;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform = "translateX(-50%) translateY(38px) scale(0.82)";
              style.opacity = 0;
            }

            const card = renderCard(flower, relativeIndex);

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

        <div className="relative mx-auto hidden h-[31rem] w-full max-w-6xl overflow-hidden md:block">
          {flowers.map((flower, index) => {
            const relativeIndex = getRelativeIndex(index);
            let classes =
              "absolute left-1/2 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
            const style: React.CSSProperties = { width: "52%" };

            if (relativeIndex === 0) {
              classes += " z-30 pointer-events-auto";
              style.transform = "translateX(-50%) scale(1)";
              style.opacity = 1;
            } else if (relativeIndex === 1) {
              classes += " z-20 cursor-pointer";
              style.transform = "translateX(-11%) translateY(20px) scale(0.91)";
              style.opacity = 0.5;
            } else if (relativeIndex === 2) {
              classes += " z-10 cursor-pointer";
              style.transform = "translateX(-89%) translateY(28px) scale(0.87)";
              style.opacity = 0.2;
            } else {
              classes += " z-0 pointer-events-none";
              style.transform = "translateX(-50%) translateY(36px) scale(0.82)";
              style.opacity = 0;
            }

            const card = renderCard(flower, relativeIndex, true);

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

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Floarea anterioara"
          onClick={goToPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/20 bg-[#fffdf7]/72 text-lg text-secondary shadow-[0_10px_30px_rgba(35,53,31,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-blush-soft"
        >
          {"<"}
        </button>

        <div className="flex items-center justify-center gap-2">
          {flowers.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Mergi la cardul ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-8 bg-blush" : "w-2 bg-secondary/20"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Floarea urmatoare"
          onClick={goToNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-blush/20 bg-[#fffdf7]/72 text-lg text-secondary shadow-[0_10px_30px_rgba(35,53,31,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-blush-soft"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
