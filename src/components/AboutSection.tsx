import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PiaImage } from './PiaImage';

interface AboutSectionProps {
  eyebrow: string;
  leadHeading: string;
  paragraphs: string[];
  fullBioTitle: string;
  fullBio: string[];
  ctaLabel: string;
  portraitUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const AboutSection: React.FC<AboutSectionProps> = ({
  eyebrow,
  leadHeading,
  paragraphs,
  fullBioTitle,
  fullBio,
  ctaLabel,
  portraitUrl,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const fullBioBody = fullBio.length ? fullBio : paragraphs;

  return (
    <section className="pia-bio-container" id="pia-about">
      <div className="pia-bio-split">
        <motion.div
          className="pia-bio-copy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <div className="pia-eyebrow">{eyebrow}</div>
          <h2 className="pia-bio-lead">{leadHeading}</h2>

          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <motion.button
            type="button"
            onClick={() => setModalOpen(true)}
            className="pia-readmore"
            whileHover={{ x: 5 }}
          >
            {ctaLabel}
          </motion.button>
        </motion.div>

        <motion.div
          className="pia-bio-portrait-right"
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE_OUT }}
        >
          <PiaImage
            src={portraitUrl}
            alt="Portrait of Dr. Patience Ishaku Abbo (PIA)"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pia-full-bio-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-white p-6 md:p-10 shadow-xl max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[10px] font-semibold tracking-[2.4px] uppercase text-[#174D83]">
                  FULL BIOGRAPHY OF DR. PATIENCE ISHAKU ABBO (PIA)
                </span>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <h3
                id="pia-full-bio-title"
                className="text-xl md:text-2xl font-medium text-[#102E4A] leading-snug mb-6"
              >
                {fullBioTitle || leadHeading}
              </h3>

              <div className="space-y-4">
                {fullBioBody.map((paragraph, index) => {
                  const isClosingSignature = index === fullBioBody.length - 1;
                  return (
                    <p
                      key={index}
                      className={
                        isClosingSignature
                          ? 'text-[14px] md:text-[15px] leading-[1.85] font-medium text-[#102E4A] pt-2 border-t border-[#e8edf2]'
                          : 'text-[13.5px] md:text-[14.5px] leading-[1.9] text-[#25343D]'
                      }
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
