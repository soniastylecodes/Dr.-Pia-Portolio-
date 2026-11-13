import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView, useReducedMotion, m } from 'motion/react';
import { asset, formatDate, NewsItem } from '../lib/content';
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
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [pausedUntil, setPausedUntil] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const AUTO_MS = 4500;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const check = () => setScrollable(track.scrollWidth > track.clientWidth + 8);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [items.length]);

  const autoOn = scrollable && inView && !reduceMotion && items.length > 1;

  useEffect(() => {
    if (!autoOn) return;
    const wait = Math.max(0, pausedUntil - Date.now());
    const t = window.setTimeout(() => {
      scrollToSlide(activeIndex >= items.length - 1 ? 0 : activeIndex + 1);
    }, AUTO_MS + wait);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOn, activeIndex, pausedUntil, items.length]);

  const holdAuto = () => setPausedUntil(Date.now() + 6000);

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
      <section className="pia-press" id="pia-press" ref={sectionRef}>
        <div className="pia-press-header">
          <m.div
            className="pia-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            {eyebrow}
          </m.div>

          {/* Slider Arrow Controls */}
          <div
            className="pia-press-slider-controls"
            aria-label="News slider navigation"
          >
            <button
              type="button"
              onClick={() => {
                holdAuto();
                scrollToSlide(activeIndex - 1);
              }}
              disabled={activeIndex === 0}
              className="pia-press-arrow-btn"
              aria-label="Previous news article"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                holdAuto();
                scrollToSlide(activeIndex + 1);
              }}
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
          onPointerDown={holdAuto}
          onTouchStart={holdAuto}
          className="pia-press-track"
        >
          {items.map((item, index) => (
            <m.div
              key={item.slug}
              className={`pia-press-card${index === activeIndex ? ' is-current' : ''}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 36 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, delay: index * 0.14, ease: EASE_OUT },
                },
              }}
              whileHover={{ y: -5 }}
            >
              <m.div
                className="pia-press-image-wrap"
                variants={{
                  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
                  show: {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    transition: { duration: 1.1, delay: 0.1 + index * 0.14, ease: EASE_OUT },
                  },
                }}
              >
                <m.span
                  className="pia-press-badge"
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: 0.7 + index * 0.14, ease: EASE_OUT },
                    },
                  }}
                >
                  {item.category}
                </m.span>
                <PiaImage
                  src={asset(item.image)}
                  sizes="(min-width: 1024px) 30vw, 85vw"
                  alt={item.imageAlt || item.title}
                />
              </m.div>
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
              <m.a
                href={href(`/news/${item.slug}/`)}
                onClick={(e) => openArticle(e, item.slug)}
                className="pia-press-link"
                whileHover={{ x: 4 }}
              >
                READ ARTICLE
              </m.a>
            </m.div>
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
              onClick={() => {
                holdAuto();
                scrollToSlide(idx);
              }}
              className={`pia-press-dot ${idx === activeIndex ? 'is-active' : ''}${
                idx === activeIndex && autoOn && pausedUntil < Date.now() ? ' is-timed' : ''
              }`}
            >
              {idx === activeIndex && autoOn && pausedUntil < Date.now() && (
                <m.span
                  key={`fill-${activeIndex}-${pausedUntil}`}
                  className="pia-press-dot-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="pia-press-more">
          <a
            href={href('/publications/')}
            className="pia-readmore"
            onClick={(e) => {
              if (!isPlainLeftClick(e)) return;
              e.preventDefault();
              navigate('/publications/');
            }}
          >
            <span className="pia-readmore-icon" aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </span>
            <span className="pia-readmore-label">See all articles</span>
          </a>
        </div>
      </section>

    </>
  );
};
