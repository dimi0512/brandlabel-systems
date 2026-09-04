"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseStudyScreen } from "@/lib/caseStudies";
import { LocalizedContent } from "@/lib/i18n";

export function CaseStudyScreenSlider({ screens }: { screens: CaseStudyScreen[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function goTo(index: number) {
    const next = (index + screens.length) % screens.length;
    const track = trackRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (track) {
      track.scrollTo({ left: track.clientWidth * next, behavior: reduceMotion ? "auto" : "smooth" });
    }
    setCurrent(next);
  }

  function updateCurrent() {
    const track = trackRef.current;
    if (!track?.clientWidth) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  }

  return <LocalizedContent>{(
    <div className="bl-study-slider">
      <div className="bl-study-slider-toolbar">
        <div>
          <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous screen">
            ←
          </button>
          <button type="button" onClick={() => goTo(current + 1)} aria-label="Next screen">
            →
          </button>
        </div>
      </div>

      <div className="bl-study-slider-track" ref={trackRef} onScroll={updateCurrent}>
        {screens.map((screen, index) => (
          <figure className="bl-study-slide" key={screen.title} aria-hidden={index !== current}>
            <figcaption>
              <h2>{screen.title}</h2>
              <p>{screen.caption}</p>
            </figcaption>
            <div className={`bl-study-slide-image${screen.kind === "photo" ? " is-photo" : ""}`}>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(max-width: 899px) calc(100vw - 2.5rem), 62vw"
                priority={index === 0}
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="bl-study-slider-dots" aria-label="Choose an interface screen">
        {screens.map((screen, index) => (
          <button
            type="button"
            key={screen.title}
            className={index === current ? "is-active" : ""}
            onClick={() => goTo(index)}
            aria-label={screen.title}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  )}</LocalizedContent>;
}
