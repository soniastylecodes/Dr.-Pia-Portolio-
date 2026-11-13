import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import {
  loadTracking,
  readConsent,
  saveConsent,
  trackingConfigured,
} from '../lib/analytics';
import { href, isPlainLeftClick, useRouter } from '../lib/router';

export const OPEN_COOKIE_SETTINGS = 'pia:open-cookie-settings';

export const CookieBanner: React.FC = () => {
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!trackingConfigured()) return;
    const consent = readConsent();
    if (consent === 'granted') loadTracking();
    let t: number | undefined;
    if (!consent) t = window.setTimeout(() => setOpen(true), 2200);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => {
      if (t) window.clearTimeout(t);
      window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
    };
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    const previous = readConsent();
    saveConsent(value);
    setOpen(false);
    if (value === 'granted') loadTracking();
    else if (previous === 'granted') window.location.reload();
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="pia-cookie"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="pia-cookie-text">
            We use cookies to understand how visitors use this site.{' '}
            <a
              href={href('/privacy/')}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                navigate('/privacy/');
              }}
            >
              Privacy Policy
            </a>
          </p>
          <div className="pia-cookie-actions">
            <button type="button" className="pia-cookie-btn" onClick={() => choose('denied')}>
              Decline
            </button>
            <button
              type="button"
              className="pia-cookie-btn pia-cookie-btn--solid"
              onClick={() => choose('granted')}
            >
              Accept
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
