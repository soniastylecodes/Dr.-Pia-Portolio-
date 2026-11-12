import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface RotatingQuoteProps {
  quotes: string[];
  author: string;
  intervalMs?: number;
}

export const RotatingQuote: React.FC<RotatingQuoteProps> = ({
  quotes,
  author,
  intervalMs = 6500,
}) => {
  const list = quotes.filter((q) => q && q.trim());
  const [index, setIndex] = useState(() =>
    list.length ? Math.floor(Math.random() * list.length) : 0
  );
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (list.length < 2 || paused) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % list.length),
      intervalMs
    );
    return () => window.clearInterval(t);
  }, [list.length, intervalMs, paused]);

  if (!list.length) return null;

  return (
    <figure
      className="pia-quote-card"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span className="pia-quote-mark" aria-hidden="true">
        “
      </span>
      <div className="pia-quote-stage" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            className="pia-quote-text"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {list[index]}
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <figcaption className="pia-quote-author">{author}</figcaption>

      {list.length > 1 && (
        <div className="pia-quote-dots" role="tablist" aria-label="Quotes">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote ${i + 1}`}
              className={`pia-quote-dot${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            >
              {i === index && !paused && !reduceMotion && (
                <motion.span
                  key={`p-${index}`}
                  className="pia-quote-dot-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: intervalMs / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </figure>
  );
};
