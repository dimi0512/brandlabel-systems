"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { LocalizedContent } from "@/lib/i18n";

export function PlatformsHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || reduceMotion.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.min(window.scrollY, window.innerHeight * 1.15);
      const mobile = window.innerWidth < 700;
      hero.style.setProperty("--platform-hero-far", `${distance * (mobile ? 0.02 : 0.045)}px`);
      hero.style.setProperty("--platform-hero-near", `${distance * (mobile ? 0.04 : 0.085)}px`);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <LocalizedContent>{(
    <section ref={heroRef} className="bl-platform-hero">
      <Container className="bl-platform-hero-inner">
        <div className="bl-platform-hero-copy">
          <h1>Custom business software starts with how your operation actually works.</h1>
          <p>
            We design the operation before we design the software. The technology follows
            the workflow—not the other way around.
          </p>
          <div className="bl-platform-hero-actions">
            <ButtonLink href="/contact" variant="dark">
              Discuss your operation
            </ButtonLink>
            <ButtonLink href="#examples" variant="outline">
              Explore completed platforms
            </ButtonLink>
          </div>
          <p className="bl-platform-hero-note">
            Tailored workflows · Data migration where suitable · Clear approval points
          </p>
        </div>
      </Container>
    </section>
  )}</LocalizedContent>;
}
