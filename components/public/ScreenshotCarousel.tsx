"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export function ScreenshotCarousel({ screenshots, name }: { screenshots: string[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (screenshots.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-video w-72 shrink-0 overflow-hidden rounded-lg border bg-muted"
              aria-label={`Open screenshot ${i + 1} of ${name}`}
            >
              <Image
                src={src}
                alt={`${name} screenshot ${i + 1}`}
                fill
                sizes="288px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      {screenshots.length > 2 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous screenshots"
            className="absolute top-1/2 -left-3 -translate-y-1/2 rounded-full border bg-white p-1.5 shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next screenshots"
            className="absolute top-1/2 -right-3 -translate-y-1/2 rounded-full border bg-white p-1.5 shadow-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        slides={screenshots.map((src) => ({ src }))}
      />
    </div>
  );
}
