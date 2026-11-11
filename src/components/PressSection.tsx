import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PiaPhotoSlotKey, PiaPhotoSlots, PiaPressItem } from '../types/pia';
import { PiaImage } from './PiaImage';

interface PressSectionProps {
  eyebrow: string;
  items: PiaPressItem[];
  photos: Pick<
    PiaPhotoSlots,
    'newsImageOneUrl' | 'newsImageTwoUrl' | 'newsImageThreeUrl'
  >;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const PressSection: React.FC<PressSectionProps> = ({
  eyebrow,
  items,
  photos,
  onSelectSlot,
}) => {
  const [activeArticle, setActiveArticle] = useState<PiaPressItem | null>(null);

  return (
    <>
      <section className="pia-press" id="pia-press">
        <motion.div
          className="pia-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          {eyebrow}
        </motion.div>

        <div className="pia-press-track">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="pia-press-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: EASE_OUT,
              }}
              whileHover={{ y: -5 }}
            >
              <div className="pia-press-image-wrap">
                <span className="pia-press-badge">{item.category}</span>
                <PiaImage
                  slotKey={item.slotKey}
                  src={photos[item.slotKey]}
                  alt={item.alt}
                  onSelectSlot={onSelectSlot}
                />
              </div>
              <div className="pia-press-date">{item.date}</div>
              <h3>{item.headline}</h3>
              <motion.button
                type="button"
                onClick={() => setActiveArticle(item)}
                className="pia-press-link"
                whileHover={{ x: 4 }}
              >
                READ ARTICLE
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeArticle && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setActiveArticle(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeArticle.headline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white max-w-md w-full p-6 border border-[#e6e8ec] shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.26, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-[1.5px] uppercase text-[#6B7280]">
                  {activeArticle.date}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] px-2 py-1"
                  aria-label="Close article"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-[15px] leading-[1.45] font-medium text-[#102E4A] mb-4">
                {activeArticle.headline}
              </h3>

              <div className="space-y-3 text-[12px] leading-[1.75] text-[#25343D]">
                {activeArticle.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#e6e8ec] flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="text-[9.5px] tracking-[2.5px] uppercase text-[#174D83]"
                >
                  CLOSE ARTICLE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
