import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
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

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModalOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [modalOpen]);

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

      {typeof document !== 'undefined' &&
        createPortal(
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="pia-bio-overlay"
              onClick={() => setModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pia-full-bio-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="pia-bio-sheet"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <div className="pia-bio-sheet-bar">
                  <span className="pia-bio-sheet-label">Full biography</span>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="pia-bio-sheet-close"
                    aria-label="Close biography"
                  >
                    <X size={18} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="pia-bio-sheet-body">
                  <h3 id="pia-full-bio-title" className="pia-bio-sheet-title">
                    {fullBioTitle || leadHeading}
                  </h3>

                  <div className="pia-bio-sheet-text">
                    {fullBioBody.map((paragraph, index) => {
                      const isClosingSignature = index === fullBioBody.length - 1;
                      return (
                        <p
                          key={index}
                          className={isClosingSignature ? 'pia-bio-sheet-sign' : undefined}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
