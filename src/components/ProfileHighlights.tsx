import React from 'react';
import { motion } from 'motion/react';
import { PiaImage } from './PiaImage';

interface ProfileHighlightsProps {
  eyebrow: string;
  items: string[];
  portraitUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ProfileHighlights: React.FC<ProfileHighlightsProps> = ({
  eyebrow,
  items,
  portraitUrl,
}) => {
  return (
    <section className="pia-highlights-section" id="pia-highlights">
      {/* Left Portrait on Desktop */}
      <motion.div
        className="pia-highlights-left-portrait"
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: EASE_OUT }}
      >
        <PiaImage
          src={portraitUrl}
          alt="Dr. Patience Ishaku Abbo leadership portrait"
        />
      </motion.div>

      {/* Right Column: Profile Highlights */}
      <div className="pia-highlights-right-col">
        <motion.div
          className="pia-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          {eyebrow}
        </motion.div>

        {items.map((item, index) => (
          <motion.div
            key={`${index}-${item.slice(0, 24)}`}
            className="pia-highlight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: index * 0.08,
              ease: EASE_OUT,
            }}
            whileHover={{ x: 6 }}
          >
            <span>{item}</span>
            <span className="pia-highlight-arrow" aria-hidden="true">
              ↗
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
