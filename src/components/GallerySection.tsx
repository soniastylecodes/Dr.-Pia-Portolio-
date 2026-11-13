import React, { useState } from 'react';
import { ArrowLeft, Download, Play } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { asset, GalleryPhoto, srcSetFor } from '../lib/content';

interface GallerySectionProps {
  eyebrow: string;
  heading: string;
  items: GalleryPhoto[];
  onBackHome: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const GallerySection: React.FC<GallerySectionProps> = ({
  eyebrow,
  heading,
  items,
  onBackHome,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto =
    activePhotoIndex !== null ? items[activePhotoIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % items.length);
  };

  const getDownloadFilename = (item: GalleryPhoto, index: number) =>
    `dr-patience-ishaku-abbo-pia-${index + 1}.${(item.video || item.image).split(".").pop() || "jpg"}`;
  const activeNumber = activePhotoIndex ?? 0;

  return (
    <m.section
      className="pia-gallery-page"
      id="pia-gallery"
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

        <div className="pia-eyebrow">{eyebrow}</div>
        <h1 className="pia-gallery-heading">{heading}</h1>
      </div>

      <div className="pia-gallery-grid">
        {items.map((item, index) => (
          <m.figure
            key={`${index}-${item.image}`}
            className="pia-gallery-card"
            onClick={() => setActivePhotoIndex(index)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: EASE_OUT,
            }}
            whileHover={{ y: -4 }}
          >
            <div className="pia-gallery-img-wrap">
              <img
                src={asset(item.image)}
                srcSet={srcSetFor(asset(item.image))}
                sizes="(min-width: 1024px) 25vw, 46vw"
                alt={item.caption || 'Dr. Patience Ishaku Abbo (PIA)'}
                loading="lazy"
                decoding="async"
              />
              {item.video && (
                <span className="pia-gallery-video-badge" aria-label="Video">
                  <Play size={16} strokeWidth={0} fill="currentColor" />
                </span>
              )}
              <div className="pia-gallery-hover-overlay">
                <a
                  href={asset(item.video || item.image)}
                  download={getDownloadFilename(item, index)}
                  onClick={(e) => e.stopPropagation()}
                  className="pia-gallery-hover-download"
                  title={`Download ${item.video ? 'video' : 'photo'}`}
                >
                  <Download size={14} strokeWidth={2} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </m.figure>
        ))}
      </div>

      <AnimatePresence>
        {activePhoto && activePhotoIndex !== null && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
            onClick={() => setActivePhotoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.caption || 'Media'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <m.div
              className="relative w-full max-w-4xl bg-white p-4 md:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <a
                  href={asset(activePhoto.video || activePhoto.image)}
                  download={getDownloadFilename(activePhoto, activeNumber)}
                  className="inline-flex items-center gap-1.5 bg-[#174D83] text-white! px-3.5 py-2 text-[11px] font-semibold tracking-[1.2px] uppercase hover:bg-[#102E4A] transition-colors"
                >
                  <Download size={13} strokeWidth={2} />
                  <span>{activePhoto.video ? 'Download Video' : 'Download Photo'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="pia-lightbox-stage">
                {activePhoto.video ? (
                  <video
                    key={activePhoto.video}
                    src={asset(activePhoto.video)}
                    poster={asset(activePhoto.image)}
                    className="pia-lightbox-img pia-lightbox-video"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={asset(activePhoto.image)}
                    alt={activePhoto.caption || 'Dr. Patience Ishaku Abbo (PIA)'}
                    className="pia-lightbox-img"
                  />
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8edf2]">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  ← Previous
                </button>
                <span className="text-[11px] text-[#8D99AE] tracking-[1.5px]">
                  {activePhotoIndex + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.section>
  );
};
