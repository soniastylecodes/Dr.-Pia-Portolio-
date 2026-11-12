import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

interface HeroProps {
  heroImageUrl: string;
  titleLines: string[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Hero: React.FC<HeroProps> = ({
  heroImageUrl,
  titleLines,
  description,
  ctaLabel,
  ctaHref,
}) => {
  const hasRealHeroPhoto = Boolean(heroImageUrl);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section className="pia-hero" id="top" ref={sectionRef}>
      {hasRealHeroPhoto && (
        <motion.div
          className="pia-hero-portrait-layer"
          style={reduceMotion ? undefined : { y: parallaxY, opacity: fadeOut }}
        >
          <motion.div
            className="pia-hero-portrait-reveal"
            initial={
              reduceMotion
                ? false
                : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 }
            }
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
            transition={{ duration: 1.6, delay: 0.15, ease: EASE_OUT }}
          >
            <img
              src={heroImageUrl}
              alt="Dr. Patience Ishaku Abbo, public policy advocate and humanitarian"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
          {!reduceMotion && (
            <motion.span
              className="pia-hero-sheen"
              aria-hidden="true"
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '120%', opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.8, delay: 1.35, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      )}

      <div className="pia-hero-scrim" />

      <div className="pia-hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE_OUT }}
        >
          {titleLines[0]}
          <span className="pia-hero-pipe">|</span>
          <br />
          {titleLines[1]}
          <span className="pia-hero-pipe">|</span>
          <br />
          {titleLines[2]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
        >
          {description}
        </motion.p>

        <motion.a
          href={ctaHref}
          className="pia-explore"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42, ease: EASE_OUT }}
        >
          <span>{ctaLabel}</span>
          <span className="pia-explore-arrow" aria-hidden="true">
            →
          </span>
        </motion.a>
      </div>
    </section>
  );
};
