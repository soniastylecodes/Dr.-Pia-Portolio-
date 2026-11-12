import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { asset, home, site } from '../lib/content';
import { RotatingQuote } from './RotatingQuote';
import { SOCIAL_ICONS } from './socialIcons';
import { SocialKey } from '../lib/content';

const MENU_SOCIALS: SocialKey[] = ['facebook', 'tiktok', 'x', 'youtube'];
import { href, isPlainLeftClick, useRouter } from '../lib/router';

interface HeaderProps {
  logoUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Header: React.FC<HeaderProps> = ({ logoUrl }) => {
  const { route, navigate } = useRouter();
  const activePage = route.page;
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [network21ModalOpen, setNetwork21ModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const resolvedLogo = logoUrl;
  const email = site.email;
  const menuSocials = MENU_SOCIALS.filter((key) => Boolean(site.socials?.[key]));

  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    setAboutDropdownOpen(false);
    setMenuOpen(false);
    navigate('/', sectionId);
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    path: string
  ) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    setAboutDropdownOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className={`pia-header ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Left Navigation Group (Desktop): ABOUT & GALLERY */}
        <nav
          className="pia-desktop-nav-group"
          aria-label="Primary Left Navigation"
        >
          <div
            ref={dropdownRef}
            className="pia-nav-dropdown-wrapper"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              type="button"
              className={`pia-desktop-nav-link ${
                aboutDropdownOpen ? 'is-active' : ''
              }`}
              aria-expanded={aboutDropdownOpen}
              onClick={() => setAboutDropdownOpen((prev) => !prev)}
            >
              <span>ABOUT</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  aboutDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  className="pia-nav-dropdown-menu"
                  role="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: EASE_OUT }}
                >
                  <a
                    href={href('/#pia-about')}
                    role="menuitem"
                    className="pia-nav-dropdown-item"
                    onClick={(e) => handleSectionLink(e, 'pia-about')}
                  >
                    About PIA
                  </a>
                  <button
                    type="button"
                    role="menuitem"
                    className="pia-nav-dropdown-item w-full text-left"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      setNetwork21ModalOpen(true);
                    }}
                  >
                    Network 21
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={href('/gallery/')}
            onClick={(e) => handlePageClick(e, '/gallery/')}
            className={`pia-desktop-nav-link ${
              activePage === 'gallery' ? 'is-active' : ''
            }`}
          >
            GALLERY
          </a>
        </nav>

        {/* Single Centered Brand Logo */}
        <a
          href={href('/')}
          onClick={(e) => handleSectionLink(e, 'top')}
          className="pia-logo-link"
          aria-label="Dr. Patience Ishaku Abbo Home"
        >
          <img
            className="pia-logo"
            src={resolvedLogo}
            alt="PIA na SIA, Dr. Patience Ishaku Abbo"
          />
        </a>

        {/* Right Navigation Group (Desktop): PUBLICATIONS & AWARDS */}
        <nav
          className="pia-desktop-nav-group"
          aria-label="Primary Right Navigation"
        >
          <a
            href={href('/publications/')}
            onClick={(e) => handlePageClick(e, '/publications/')}
            className={`pia-desktop-nav-link ${
              activePage === 'publications' ? 'is-active' : ''
            }`}
          >
            PUBLICATIONS
          </a>
          <a
            href={href('/awards/')}
            onClick={(e) => handlePageClick(e, '/awards/')}
            className={`pia-desktop-nav-link ${
              activePage === 'awards' ? 'is-active' : ''
            }`}
          >
            AWARDS
          </a>
        </nav>

        {/* Mobile Menu Trigger Button */}
        <button
          type="button"
          className="pia-menu"
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="pia-menu-bars">
            <span className="pia-menu-line-1" />
            <span className="pia-menu-line-2" />
            <span className="pia-menu-line-3" />
          </span>
        </button>
      </header>

      {/* Mobile Menu: full screen premium panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pia-mobile-backdrop"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.aside
              className="pia-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <motion.div
                className="pia-menu-portrait"
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE_OUT }}
              >
                <img
                  src={asset(home.hero.image)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </motion.div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="pia-menu-close"
                aria-label="Close menu"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>

              <div className="pia-menu-body">
                <motion.p
                  className="pia-menu-eyebrow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
                >
                  Dr. Patience Ishaku Abbo
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.38, ease: EASE_OUT }}
                >
                  <RotatingQuote quotes={home.menu.quotes || []} />
                </motion.div>

                <motion.div
                  className="pia-menu-buttons"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.52, ease: EASE_OUT }}
                >
                  <a href={`mailto:${email}`} className="pia-menu-btn pia-menu-btn--light">
                    Send a message
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setNetwork21ModalOpen(true);
                    }}
                    className="pia-menu-btn pia-menu-btn--ghost"
                  >
                    Join Network 21
                  </button>
                </motion.div>

                {menuSocials.length > 0 && (
                  <motion.ul
                    className="pia-menu-socials"
                    aria-label="Follow Dr. Patience Ishaku Abbo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                  >
                    {menuSocials.map((key) => (
                      <li key={key}>
                        <a
                          href={site.socials[key]}
                          target="_blank"
                          rel="noopener noreferrer me"
                          aria-label={`Dr. Patience Ishaku Abbo on ${SOCIAL_ICONS[key].label}`}
                        >
                          {SOCIAL_ICONS[key].icon}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network 21 Modal */}
      <AnimatePresence>
        {network21ModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            onClick={() => setNetwork21ModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pia-network21-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-white p-6 md:p-10 shadow-xl max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.24, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[10px] font-semibold tracking-[2.4px] uppercase text-[#174D83]">
                  WOMAN TO WOMAN NETWORK 21
                </span>
                <button
                  type="button"
                  onClick={() => setNetwork21ModalOpen(false)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5">
                  <img
                    src={asset(home.menu.network21Image)}
                    loading="lazy"
                    alt="Dr. Patience Ishaku Abbo, Founder, Woman to Woman Network 21"
                    className="w-full aspect-square object-cover border border-[#e8edf2]"
                  />
                </div>
                <div className="md:col-span-7 space-y-3.5">
                  <h3
                    id="pia-network21-title"
                    className="text-xl font-medium text-[#102E4A] leading-snug"
                  >
                    Connecting &amp; Empowering Women Across Adamawa’s 21 Local
                    Government Areas
                  </h3>
                  <p className="text-[13.5px] leading-[1.85] text-[#25343D]">
                    Founded by Dr. Patience Ishaku Abbo (PIA),{' '}
                    <strong>Woman to Woman Network 21</strong> was established
                    to create a dedicated platform where women across all 21
                    Local Government Areas of Adamawa State can connect, grow,
                    find opportunities, and have their voices heard.
                  </p>
                  <p className="text-[13.5px] leading-[1.85] text-[#25343D]">
                    Through grassroots mobilisation, mentorship, vocational
                    capacity building, and community solidarity, Network 21
                    equips women and families with sustainable livelihood
                    pathways and civic representation.
                  </p>
                  <div className="pt-2">
                    <a
                      href={site.network21Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#174D83] text-white! px-5 py-3 text-[11px] font-semibold tracking-[1.6px] uppercase hover:bg-[#102E4A] transition-colors"
                    >
                      <span>Click to be part</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
