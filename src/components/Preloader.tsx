import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LOGO } from '../lib/content';

interface PreloaderProps {
  isVisible: boolean;
  logoUrl?: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Preloader: React.FC<PreloaderProps> = ({ isVisible, logoUrl }) => {
  const resolvedLogo = logoUrl || LOGO;
  const mask = `url("${resolvedLogo}") center / contain no-repeat`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="pia-preloader"
          className="pia-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE_OUT } }}
          role="status"
          aria-label="Loading Dr. Patience Ishaku Abbo official website"
        >
          <motion.div
            className="pia-preloader-mark"
            initial={{ opacity: 0, scale: 0.92, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)', transition: { duration: 0.55, ease: EASE_OUT } }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <img src={resolvedLogo} alt="" className="pia-preloader-logo" />
            <motion.span
              className="pia-preloader-shine"
              aria-hidden="true"
              style={{ WebkitMask: mask, mask }}
              initial={{ backgroundPosition: '-120% 0' }}
              animate={{ backgroundPosition: '220% 0' }}
              transition={{ duration: 1.4, delay: 0.45, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
