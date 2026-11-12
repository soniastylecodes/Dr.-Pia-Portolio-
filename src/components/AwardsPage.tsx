import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { asset, awards } from '../lib/content';

interface AwardsPageProps {
  onBackHome: () => void;
}


const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PIA_AWARDS = awards;

export const AwardsPage: React.FC<AwardsPageProps> = ({ onBackHome }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeAward = activeIndex !== null ? PIA_AWARDS[activeIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + PIA_AWARDS.length) % PIA_AWARDS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % PIA_AWARDS.length);
  };

  return (
    <motion.section
      className="pia-gallery-page"
      id="pia-awards-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div className="pia-gallery-page-header">
        <button
          type="button"
          onClick={onBackHome}
          className="pia-gallery-back-btn"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          <span>Back to Home</span>
        </button>

        <div className="pia-eyebrow">HONOURS &amp; RECOGNITION</div>
        <h1 className="pia-gallery-heading">
          Awards, Honours &amp; Leadership Recognition
        </h1>
      </div>

      <div className="pia-awards-grid">
        {PIA_AWARDS.map((item, idx) => (
          <motion.article
            key={item.slug}
            className="pia-award-card"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: idx * 0.06,
              ease: EASE_OUT,
            }}
            whileHover={{ y: -5 }}
            onClick={() => setActiveIndex(idx)}
          >
            {/* Museum Matte & Framed Plaque Container */}
            <div className="pia-award-frame-outer">
              <div className="pia-award-frame-matte">
                <img
                  src={asset(item.image)}
                  alt={`${item.title}, presented to Dr. Patience Ishaku Abbo by ${item.organization}`}
                  className="pia-award-plaque-img"
                  loading="lazy"
                  decoding="async"
                />
                <span className="pia-award-zoom-badge" aria-hidden="true">
                  <Maximize2 size={13} strokeWidth={2} />
                </span>
              </div>
            </div>

            {/* Plaque Details */}
            <div className="pia-award-card-body">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[1.4px] uppercase text-[#174D83] bg-[#F0F6FC] px-2.5 py-1">
                  <Award size={12} strokeWidth={2} />
                  <span>{item.category}</span>
                </span>
                <span className="text-[11px] font-semibold tracking-[1.2px] uppercase text-[#8D99AE]">
                  {item.year}
                </span>
              </div>

              <h2 className="text-[16px] md:text-[17.5px] font-medium text-[#102E4A] leading-snug mb-2">
                {item.title}
              </h2>

              <div className="inline-flex items-start gap-1.5 text-[11.5px] font-medium text-[#174D83] mb-3">
                <CheckCircle2
                  size={13}
                  strokeWidth={2}
                  className="shrink-0 mt-0.5"
                />
                <span>{item.organization}</span>
              </div>

              <p className="text-[12.5px] leading-[1.75] text-[#25343D]">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox Modal for Inspecting Framed Award Up Close */}
      <AnimatePresence>
        {activeAward && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeAward.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white p-5 md:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <span className="block text-[10px] font-semibold tracking-[2px] uppercase text-[#174D83]">
                    {activeAward.organization}
                  </span>
                  <h3 className="text-sm md:text-base font-medium text-[#102E4A]">
                    {activeAward.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer shrink-0"
                >
                  Close ✕
                </button>
              </div>

              <div className="pia-lightbox-stage">
                <img
                  src={asset(activeAward.image)}
                  alt={activeAward.title}
                  className="pia-lightbox-img"
                />
              </div>

              <p className="mt-4 text-xs md:text-[13px] leading-[1.8] text-[#25343D]">
                {activeAward.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8edf2]">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  ← Previous Award
                </button>
                <span className="text-[11px] text-[#8D99AE] tracking-[1.5px]">
                  {activeIndex + 1} / {PIA_AWARDS.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  Next Award →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
