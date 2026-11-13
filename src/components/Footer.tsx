import React from 'react';
import { m } from 'motion/react';
import { SocialKey } from '../lib/content';
import { SOCIAL_ICONS, SOCIAL_ORDER } from './socialIcons';
import { href, isPlainLeftClick, useRouter } from '../lib/router';
import { trackingConfigured } from '../lib/analytics';
import { OPEN_COOKIE_SETTINGS } from './CookieBanner';

interface FooterProps {
  footerLogoUrl: string;
  copyright: string;
  socials: Partial<Record<SocialKey, string>>;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Footer: React.FC<FooterProps> = ({
  footerLogoUrl,
  copyright,
  socials,
}) => {
  const resolvedFooterLogo = footerLogoUrl;
  const { navigate } = useRouter();
  const go = (e: React.MouseEvent, path: string) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="pia-footer">
      <m.img
        className="pia-footer-logo"
        src={resolvedFooterLogo}
        alt="PIA na SIA logo"
        loading="lazy"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      />

      <m.div
        className="pia-socials"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
      >
        {SOCIAL_ORDER.filter((key) => socials[key]).map((key) => (
          <m.a
            key={key}
            href={socials[key]}
            aria-label={`Dr. Patience Ishaku Abbo on ${SOCIAL_ICONS[key].label}`}
            target="_blank"
            rel="noopener noreferrer me"
            whileHover={{ y: -3, scale: 1.08 }}
          >
            {SOCIAL_ICONS[key].icon}
          </m.a>
        ))}
      </m.div>

      <m.div
        className="pia-copyright"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
      >
        {copyright}
      </m.div>

      <nav className="pia-footer-legal" aria-label="Legal">
        <a href={href('/privacy/')} onClick={(e) => go(e, '/privacy/')}>
          Privacy Policy
        </a>
        <a href={href('/terms/')} onClick={(e) => go(e, '/terms/')}>
          Terms of Use
        </a>
        {trackingConfigured() && (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
          >
            Cookie settings
          </button>
        )}
      </nav>
    </footer>
  );
};
