import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, House, ImagePlay, UserRound } from 'lucide-react';
import { href, isPlainLeftClick, PageKey, useRouter } from '../lib/router';

type DockKey = 'home' | 'about' | 'gallery' | 'awards' | 'publications';

interface DockItem {
  key: DockKey;
  label: string;
  path: string;
  section?: string;
  icon: React.ElementType;
}

const ITEMS: DockItem[] = [
  { key: 'home', label: 'Home', path: '/', section: 'top', icon: House },
  { key: 'about', label: 'About', path: '/', section: 'pia-about', icon: UserRound },
  { key: 'gallery', label: 'Media', path: '/media/', icon: ImagePlay },
  { key: 'awards', label: 'Awards', path: '/awards/', icon: Award },
  { key: 'publications', label: 'Blog', path: '/publications/', icon: BookOpen },
];

function activeFor(page: PageKey, section: 'home' | 'about' | 'blog'): DockKey | null {
  if (page === 'home') {
    if (section === 'about') return 'about';
    if (section === 'blog') return 'publications';
    return 'home';
  }
  if (page === 'news') return 'publications';
  if (page === 'gallery' || page === 'awards' || page === 'publications') {
    return page;
  }
  return null;
}

export const MobileDock: React.FC = () => {
  const { route, navigate } = useRouter();
  const [hidden, setHidden] = useState(false);
  const [homeSection, setHomeSection] = useState<'home' | 'about' | 'blog'>('home');

  const lockUntil = React.useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 24;

      if (y < 120 || nearBottom || Date.now() < lockUntil.current) {
        setHidden(false);
      }
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);

      const line = window.innerHeight * 0.5;
      const inView = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < line && r.bottom > line;
      };
      if (inView('pia-press') || inView('pia-contact')) setHomeSection('blog');
      else if (inView('pia-about')) setHomeSection('about');
      else setHomeSection('home');

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route.path]);

  const active = activeFor(route.page, homeSection);

  const onClick = (e: React.MouseEvent, item: DockItem) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    lockUntil.current = Date.now() + 1600;
    setHidden(false);
    navigate(item.path, item.section);
  };

  return (
    <motion.nav
      className="pia-dock"
      aria-label="Quick navigation"
      initial={{ y: 120, opacity: 0 }}
      animate={hidden ? { y: 120, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34, delay: hidden ? 0 : 0.05 }}
    >
      <ul className="pia-dock-list">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          const link =
            item.section && item.section !== 'top'
              ? href(`${item.path}#${item.section}`)
              : href(item.path);
          return (
            <li key={item.key}>
              <a
                href={link}
                onClick={(e) => onClick(e, item)}
                className={`pia-dock-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="pia-dock-pill"
                    className="pia-dock-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <motion.span
                  className="pia-dock-icon"
                  animate={isActive ? { y: -1, scale: 1.08 } : { y: 0, scale: 1 }}
                  whileTap={{ scale: 0.86 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                </motion.span>
                <span className="pia-dock-label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};
