import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LOGO } from '../lib/content';

interface PreloaderProps {
  isVisible: boolean;
  logoUrl?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Preloader: React.FC<PreloaderProps> = ({ isVisible, logoUrl }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const startTime = performance.now();
    const duration = 1350;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible]);

  const resolvedLogo = logoUrl || LOGO;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="pia-preloader"
          className="pia-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -18,
            transition: { duration: 0.55, ease: EASE_OUT },
          }}
          role="status"
          aria-live="polite"
          aria-label="Loading Dr. Patience Ishaku Abbo official website"
        >
          <div className="pia-preloader-inner">
            <motion.div
              className="pia-preloader-logo-wrap"
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{
                opacity: 1,
                scale: [0.88, 1.02, 1],
                y: 0,
              }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <motion.img
                src={resolvedLogo}
                alt="PIA na SIA Official Logo"
                className="pia-preloader-logo"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            <motion.div
              className="pia-preloader-meta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            >
              <span className="pia-preloader-title">
                DR. PATIENCE ISHAKU ABBO (PIA)
              </span>

              <div className="pia-preloader-bar-track">
                <motion.div
                  className="pia-preloader-bar-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              <span className="pia-preloader-percent">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
