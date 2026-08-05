"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export function TextFirstHero() {
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
      hero.style.setProperty("--hero-parallax-far", `${distance * (mobile ? 0.025 : 0.055)}px`);
      hero.style.setProperty("--hero-parallax-near", `${distance * (mobile ? 0.045 : 0.1)}px`);
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

  return (
    <section
      ref={heroRef}
      id="hero"
      className="bl-home-hero"
      aria-label="BrandLabel operational cost introduction"
    >
      <Container className="bl-home-hero-inner">
        <div className="bl-home-hero-copy">
          <h1>
            Do you know what inefficient operations cost you every day?
          </h1>
          <p className="bl-home-hero-lead">
            Let&apos;s do the math. Then let&apos;s discuss the right solution for making
            your business easier to run.
          </p>
          <div className="bl-home-hero-actions">
            <ButtonLink href="/diagnostic" variant="dark">
              Calculate your operational cost
            </ButtonLink>
            <ButtonLink href="/platforms" variant="outline">
              See what we build
            </ButtonLink>
          </div>
          <p className="bl-home-hero-note">
            Immediate estimate · No email required · Usually completed in about a minute
          </p>
        </div>
      </Container>
    </section>
  );
}
