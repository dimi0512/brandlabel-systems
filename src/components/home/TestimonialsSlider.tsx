"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { LocalizedContent } from "@/lib/i18n";

const testimonials = [
  {
    title: "Understanding the operation",
    quote: "They took the time to understand how we work before building anything. What we got really feels made for us.",
    name: "Sophie Lambert",
    role: "Managing Director",
  },
  {
    title: "Everything connected",
    quote: "Before, we were jumping between Excel, emails and a few different tools. Now everyone knows where to find the right information.",
    name: "Thomas De Smet",
    role: "Operations Director",
  },
  {
    title: "Time saved",
    quote: "The admin used to take a few hours every week. Now it’s mostly a quick check, and we can see what’s happening straight away.",
    name: "Charlotte Peeters",
    role: "Head of Operations",
  },
  {
    title: "Working with BrandLabel",
    quote: "We showed them what was slowing us down. The first version already felt familiar and was easy for the team to understand.",
    name: "Nicolas Laurent",
    role: "Founder & CEO",
  },
  {
    title: "Software that adapts to the business",
    quote: "The biggest difference is that the system follows the way we work. We didn’t have to reorganise the whole team around the software.",
    name: "Julie Van den Berg",
    role: "General Manager",
  },
] as const;

export function TestimonialsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function goTo(index: number) {
    const next = (index + testimonials.length) % testimonials.length;
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
    <section className="bl-home-testimonials" aria-labelledby="testimonials-heading">
      <Container>
        <div className="bl-testimonials-heading">
          <h2 id="testimonials-heading">What they say about us</h2>
        </div>

        <div className="bl-testimonials-stage">
          <button
            className="bl-testimonials-side-arrow bl-testimonials-side-arrow-previous"
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Previous review"
          >
            ←
          </button>

          <div className="bl-testimonials-track" ref={trackRef} onScroll={updateCurrent}>
            {testimonials.map((testimonial, index) => (
              <article className="bl-testimonial-slide" key={testimonial.name} aria-hidden={index !== current}>
                <p className="bl-testimonial-category">{testimonial.title}</p>
                <blockquote>“{testimonial.quote}”</blockquote>
                <p className="bl-testimonial-stars" aria-label="5 out of 5 stars">★★★★★</p>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </footer>
              </article>
            ))}
          </div>

          <button
            className="bl-testimonials-side-arrow bl-testimonials-side-arrow-next"
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Next review"
          >
            →
          </button>
        </div>

        <div className="bl-testimonials-dots" aria-label="Choose a review">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={testimonial.name}
              className={index === current ? "is-active" : ""}
              onClick={() => goTo(index)}
              aria-label={testimonial.name}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  )}</LocalizedContent>;
}
