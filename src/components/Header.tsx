import React, { useEffect, useRef, useState } from 'react';
import {
  isPlaceholderToken,
  PIA_BRAND_LOGO_BLUE,
  PIA_IMAGE_3,
} from '../data/piaContent';
import { PiaPhotoSlotKey } from '../types/pia';

export type PiaPageKey = 'home' | 'gallery' | 'publications' | 'awards';

interface HeaderProps {
  logoUrl: string;
  activePage: PiaPageKey;
  onNavigate: (page: PiaPageKey, sectionId?: string) => void;
  onOpenPhotoManager: (initialSlot?: PiaPhotoSlotKey) => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl,
  activePage,
  onNavigate,
  onOpenPhotoManager,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [network21ModalOpen, setNetwork21ModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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

  const resolvedLogo = isPlaceholderToken(logoUrl)
    ? PIA_BRAND_LOGO_BLUE
    : logoUrl;

  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setAboutDropdownOpen(false);
    setMenuOpen(false);
    onNavigate('home', sectionId);
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: PiaPageKey
  ) => {
    e.preventDefault();
    setAboutDropdownOpen(false);
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header className={`pia-header ${scrolled ? 'is-scrolled' : ''}`}>
        {/* Left Navigation Group (Desktop): ABOUT (Dropdown: About PIA, Network 21) & GALLERY */}
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
              className="pia-desktop-nav-link pia-dropdown-trigger"
              aria-expanded={aboutDropdownOpen}
              onClick={() => setAboutDropdownOpen((prev) => !prev)}
            >
              <span>ABOUT</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                className={`transition-transform duration-150 ${
                  aboutDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {aboutDropdownOpen && (
              <div className="pia-nav-dropdown-menu" role="menu">
                <a
                  href="#pia-about"
                  role="menuitem"
                  className="pia-nav-dropdown-item"
                  onClick={(e) => handleSectionLink(e, 'pia-about')}
                >
                  About PIA
                </a>
                <button
                  type="button"
                  role="menuitem"
                  className="pia-nav-dropdown-item text-left w-full"
                  onClick={() => {
                    setAboutDropdownOpen(false);
                    setNetwork21ModalOpen(true);
                  }}
                >
                  Network 21
                </button>
              </div>
            )}
          </div>

          <a
            href="#gallery"
            onClick={(e) => handlePageClick(e, 'gallery')}
            className={`pia-desktop-nav-link ${
              activePage === 'gallery' ? 'text-[#2B72B8]' : ''
            }`}
          >
            GALLERY
          </a>
        </nav>

        {/* Single Centered Brand Logo */}
        <a
          href="#top"
          onClick={(e) => handleSectionLink(e, 'top')}
          className="pia-logo-link"
          aria-label="Dr. Patience Ishaku Abbo Home"
        >
          <img
            className="pia-logo"
            src={resolvedLogo}
            alt="Dr. Patience Ishaku Abbo Logo"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Right Navigation Group (Desktop): PUBLICATIONS & AWARDS */}
        <nav
          className="pia-desktop-nav-group"
          aria-label="Primary Right Navigation"
        >
          <a
            href="#publications"
            onClick={(e) => handlePageClick(e, 'publications')}
            className={`pia-desktop-nav-link ${
              activePage === 'publications' ? 'text-[#2B72B8]' : ''
            }`}
          >
            PUBLICATIONS
          </a>
          <a
            href="#awards"
            onClick={(e) => handlePageClick(e, 'awards')}
            className={`pia-desktop-nav-link ${
              activePage === 'awards' ? 'text-[#2B72B8]' : ''
            }`}
          >
            AWARDS
          </a>
        </nav>

        {/* Mobile Staggered 3-Line Menu Button */}
        <button
          type="button"
          className="pia-menu"
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="pia-menu-line-1" />
          <span className="pia-menu-line-2" />
          <span className="pia-menu-line-3" />
        </button>
      </header>

      {menuOpen && (
        <div
          className="pia-mobile-drawer"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col gap-3">
            <div className="border-b border-[#f2f4f7] pb-2">
              <span className="block text-[11px] font-semibold tracking-[1.5px] uppercase text-[#8D99AE] mb-1.5">
                About
              </span>
              <div className="flex flex-col gap-2 pl-3">
                <a
                  href="#pia-about"
                  onClick={(e) => handleSectionLink(e, 'pia-about')}
                  className="text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] py-0.5"
                >
                  About PIA
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setNetwork21ModalOpen(true);
                  }}
                  className="text-left text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] py-0.5"
                >
                  Network 21
                </button>
              </div>
            </div>

            <a
              href="#gallery"
              onClick={(e) => handlePageClick(e, 'gallery')}
              className="text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] py-1.5 border-b border-[#f2f4f7]"
            >
              Gallery
            </a>
            <a
              href="#publications"
              onClick={(e) => handlePageClick(e, 'publications')}
              className="text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] py-1.5 border-b border-[#f2f4f7]"
            >
              Publications
            </a>
            <a
              href="#awards"
              onClick={(e) => handlePageClick(e, 'awards')}
              className="text-[13px] font-medium text-[#102E4A] hover:text-[#174D83] py-1.5 border-b border-[#f2f4f7]"
            >
              Awards
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenPhotoManager();
              }}
              className="mt-1 text-left text-[10px] font-semibold tracking-[2px] uppercase text-[#174D83] py-1"
            >
              Manage Photographs →
            </button>
          </nav>
        </div>
      )}

      {network21ModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setNetwork21ModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pia-network21-title"
        >
          <div
            className="w-full max-w-2xl bg-white p-6 md:p-10 shadow-xl max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
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
                  src={PIA_IMAGE_3}
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
                  <strong>Woman to Woman Network 21</strong> was established to
                  create a dedicated platform where women across all 21 Local
                  Government Areas of Adamawa State can connect, grow, find
                  opportunities, and have their voices heard.
                </p>
                <p className="text-[13.5px] leading-[1.85] text-[#25343D]">
                  Through grassroots mobilisation, mentorship, vocational
                  capacity building, and community solidarity, Network 21 equips
                  women and families with sustainable livelihood pathways and
                  civic representation.
                </p>
                <div className="pt-2">
                  <a
                    href="https://womantowomannetwork21.org"
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
          </div>
        </div>
      )}
    </>
  );
};

