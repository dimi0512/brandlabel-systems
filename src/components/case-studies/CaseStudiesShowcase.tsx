"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { LocalizedContent } from "@/lib/i18n";

const projects = [
  {
    label: "PROJECT OPERATIONS",
    statement: "From fragmented project administration to one connected operational environment.",
    areas: "Projects · Time · Documents · Quotations · Approvals",
    image: "/case-studies/project-operations-dashboard.png",
    imageWidth: 2216,
    imageHeight: 1566,
    imageAlt: "Project operations dashboard interface",
    href: "/case-studies/project-operations",
  },
  {
    label: "WORKFORCE OPERATIONS",
    statement: "Scheduling, staff management, calculations and reporting brought into one workflow.",
    areas: "Teams · Planning · Payments · Documents · Reporting",
    image: "/case-studies/workforce-operations-system.png",
    imageWidth: 2216,
    imageHeight: 1510,
    imageAlt: "Workforce operations system interface",
    href: "/case-studies/workforce-operations",
  },
  {
    label: "CLIENT OPERATIONS",
    statement: "Client information, workflows and follow-up managed from one operational system.",
    areas: "Clients · Requests · Tasks · Communication · Reporting",
    image: "/case-studies/salon-operations-calendar.png",
    imageWidth: 1586,
    imageHeight: 992,
    imageAlt: "Salon client operations system interface",
    href: "/case-studies/client-operations",
  },
] as const;

type Project = (typeof projects)[number];

function ProjectShowcase({
  project,
  index,
  reducedMotion,
}: {
  project: Project;
  index: number;
  reducedMotion: boolean;
}) {
  const isReversed = index === 1;

  return (
    <motion.article
      className={`bl-case-project${isReversed ? " bl-case-project-reverse" : ""}`}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="bl-case-project-inner">
        <div className="bl-case-copy">
          <p className="bl-case-label">{project.label}</p>
          <h2>{project.statement}</h2>
          <p className="bl-case-areas">{project.areas}</p>
          <LocalizedLink className="bl-case-link" href={project.href}>
            View case study →
          </LocalizedLink>
        </div>

        <div className="bl-case-stage">
          <div className="bl-case-screen-motion">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              sizes="(max-width: 899px) calc(100vw - 2.5rem), 62vw"
              className="bl-case-screen"
            />
          </div>
        </div>
      </Container>
    </motion.article>
  );
}

export function CaseStudiesShowcase() {
  const parallaxRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(900);
  const parallaxEnabled = isDesktop && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 26,
    mass: 0.32,
  });
  const backdropY = useTransform(smoothProgress, [0, 1], [-18, 18]);

  return <LocalizedContent>{(
    <section
      ref={parallaxRef}
      className={`bl-case-parallax${parallaxEnabled ? " is-active" : ""}`}
    >
      <div className="bl-case-parallax-sticky">
        <motion.div
          className="bl-case-parallax-backdrop-motion"
          style={parallaxEnabled ? { y: backdropY, scale: 1.045 } : undefined}
          aria-hidden="true"
        >
          <Image
            src="/case-studies/brandlabel-office-parallax.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="bl-case-parallax-backdrop-image"
          />
        </motion.div>
      </div>
      <div className="bl-case-parallax-track">
        {projects.map((project, index) => (
          <ProjectShowcase
            key={project.label}
            project={project}
            index={index}
            reducedMotion={Boolean(reducedMotion)}
          />
        ))}
      </div>
    </section>
  )}</LocalizedContent>;
}
