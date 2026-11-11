import React from 'react';
import { motion } from 'motion/react';
import { isPlaceholderToken } from '../data/piaContent';
import { PiaPhotoSlotKey } from '../types/pia';

interface HeroProps {
  heroImageUrl: string;
  titleLines: [string, string, string];
  description: string;
  ctaLabel: string;
  ctaHref: string;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Hero: React.FC<HeroProps> = ({
  heroImageUrl,
  titleLines,
  description,
  ctaLabel,
  ctaHref,
}) => {
  const hasRealHeroPhoto = !isPlaceholderToken(heroImageUrl);

  return (
    <section className="pia-hero" id="top">
      {hasRealHeroPhoto && (
        <motion.div
          className="pia-hero-portrait-layer"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, ease: EASE_OUT }}
        >
          <img
            src={heroImageUrl}
            alt="Dr. Patience Ishaku Abbo"
            referrerPolicy="no-referrer"
          />
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
