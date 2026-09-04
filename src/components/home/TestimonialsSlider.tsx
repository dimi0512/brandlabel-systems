"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";

const testimonials = [
  {
    title: "Understanding the operation",
    quote: "BrandLabel understood how we actually work before proposing anything. The system feels like it was designed from inside our business, not adapted from something generic.",
    name: "Sophie Lambert",
    role: "Managing Director",
  },
  {
    title: "Everything connected",
    quote: "We were working across spreadsheets, emails and separate tools. Now the information and workflows we use every day are connected in one place.",
    name: "Thomas De Smet",
    role: "Operations Director",
  },
  {
    title: "Time saved",
    quote: "Tasks that used to take us hours every week now take minutes. We spend far less time on administration and have a much clearer view of the operation.",
    name: "Charlotte Peeters",
    role: "Head of Operations",
  },
  {
    title: "Working with BrandLabel",
    quote: "We explained how the business worked and where we were struggling. BrandLabel translated that into a system that made sense from the first version.",
    name: "Nicolas Laurent",
    role: "Founder & CEO",
  },
  {
    title: "Software that adapts to the business",
    quote: "For once, we didn’t have to change the way we work to fit the software. The software was built around the way our team actually operates.",
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

  return (
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
  );
}
