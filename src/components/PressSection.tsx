import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { asset, formatDate, NewsItem, site } from '../lib/content';
import { href, isPlainLeftClick, useRouter } from '../lib/router';
import { PiaImage } from './PiaImage';

interface PressSectionProps {
  eyebrow: string;
  items: NewsItem[];
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const PressSection: React.FC<PressSectionProps> = ({
  eyebrow,
  items,
}) => {
  const { navigate } = useRouter();
  const openArticle = (e: React.MouseEvent, slug: string) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    navigate(`/news/${slug}/`);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (targetIndex: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, targetIndex));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.pia-press-card');
    const card = cards[clamped];
    if (card) {
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.pia-press-card');
    if (!cards.length) return;
    let closestIndex = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(
        card.offsetLeft - track.offsetLeft - track.scrollLeft
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <>
      <section className="pia-press" id="pia-press">
        <div className="pia-press-header">
          <motion.div
            className="pia-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            {eyebrow}
          </motion.div>

          {/* Slider Arrow Controls */}
          <div
            className="pia-press-slider-controls"
            aria-label="News slider navigation"
          >
            <button
              type="button"
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="pia-press-arrow-btn"
              aria-label="Previous news article"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex === items.length - 1}
              className="pia-press-arrow-btn"
              aria-label="Next news article"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="pia-press-track"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.slug}
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
                  src={asset(item.image)}
                  alt={item.imageAlt || item.title}
                />
              </div>
              <div className="pia-press-date">
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <h3>
                <a
                  href={href(`/news/${item.slug}/`)}
                  onClick={(e) => openArticle(e, item.slug)}
                >
                  {item.title}
                </a>
              </h3>
              <motion.a
                href={href(`/news/${item.slug}/`)}
                onClick={(e) => openArticle(e, item.slug)}
                className="pia-press-link"
                whileHover={{ x: 4 }}
              >
                READ ARTICLE
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider Pagination Dots */}
        <div className="pia-press-dots" role="tablist" aria-label="News slides">
          {items.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to news slide ${idx + 1}`}
              onClick={() => scrollToSlide(idx)}
              className={`pia-press-dot ${
                idx === activeIndex ? 'is-active' : ''
              }`}
            />
          ))}
        </div>
        <motion.div
          className="pia-press-cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <a href={`mailto:${site.email}`} className="pia-press-cta-btn">
            <Mail size={16} strokeWidth={1.8} />
            Send a message
          </a>
        </motion.div>
      </section>

    </>
  );
};
