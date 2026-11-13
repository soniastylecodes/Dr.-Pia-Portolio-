import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LOGO_WHITE_GREEN } from '../lib/content';

interface PreloaderProps {
  isVisible: boolean;
  logoUrl?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const R = 92;

export const Preloader: React.FC<PreloaderProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="pia-preloader"
          className="pia-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, delay: 0.1, ease: EASE_OUT } }}
          role="status"
          aria-label="Loading Dr. Patience Ishaku Abbo official website"
        >
          <motion.div
            className="pia-preloader-orb"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, transition: { duration: 0.5, ease: EASE_OUT } }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <motion.span
              className="pia-preloader-halo"
              aria-hidden="true"
              animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <svg className="pia-preloader-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <linearGradient id="pia-ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3DDC84" />
                  <stop offset="55%" stopColor="#2F8FE0" />
                  <stop offset="100%" stopColor="#5B6CFF" />
                </linearGradient>
                <filter id="pia-ring-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="100" cy="100" r={R} className="pia-preloader-track" />
              <motion.circle
                cx="100"
                cy="100"
                r={R}
                className="pia-preloader-progress"
                stroke="url(#pia-ring-grad)"
                filter="url(#pia-ring-glow)"
                initial={{ pathLength: 0.02 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>

            <motion.img
              src={LOGO_WHITE_GREEN}
              alt=""
              className="pia-preloader-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
