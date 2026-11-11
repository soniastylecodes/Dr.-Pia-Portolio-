/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AreasOfInterest } from './components/AreasOfInterest';
import { AwardsPage } from './components/AwardsPage';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header, PiaPageKey } from './components/Header';
import { Hero } from './components/Hero';
import { PhotoSlotModal } from './components/PhotoSlotModal';
import { PortraitGallery } from './components/PortraitGallery';
import { PressSection } from './components/PressSection';
import { ProfileHighlights } from './components/ProfileHighlights';
import { PublicationsPage } from './components/PublicationsPage';
import {
  DEFAULT_PHOTO_SLOTS,
  isPlaceholderToken,
  PIA_CONTENT,
} from './data/piaContent';
import { PiaPhotoSlotKey, PiaPhotoSlots } from './types/pia';

const STORAGE_KEY = 'pia_official_photo_slots_v5';

export default function App() {
  const [photoSlots, setPhotoSlots] = useState<PiaPhotoSlots>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<PiaPhotoSlots>;
        const merged: PiaPhotoSlots = { ...DEFAULT_PHOTO_SLOTS };
        (Object.keys(DEFAULT_PHOTO_SLOTS) as PiaPhotoSlotKey[]).forEach(
          (key) => {
            const val = parsed[key];
            if (val && !isPlaceholderToken(val)) {
              merged[key] = val;
            }
          }
        );
        return merged;
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_PHOTO_SLOTS;
  });

  const [activePage, setActivePage] = useState<PiaPageKey>('home');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [focusedSlot, setFocusedSlot] = useState<PiaPhotoSlotKey | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photoSlots));
    } catch {
      // Ignore storage quota errors
    }
  }, [photoSlots]);

  const handleNavigate = (page: PiaPageKey, sectionId?: string) => {
    setActivePage(page);
    if (page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      if (!sectionId || sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 30);
  };

  const handleOpenPhotoManager = (initialSlot?: PiaPhotoSlotKey) => {
    setFocusedSlot(initialSlot ?? null);
    setPhotoModalOpen(true);
  };

  const handleUpdateSlot = (slotKey: PiaPhotoSlotKey, value: string) => {
    setPhotoSlots((prev) => ({
      ...prev,
      [slotKey]: value,
    }));
  };

  const handleResetSlots = () => {
    setPhotoSlots(DEFAULT_PHOTO_SLOTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="pia-profile">
      {/* HEADER (Centered Logo + ABOUT / GALLERY / PUBLICATIONS / AWARDS on Desktop; Left Logo + Staggered Menu on Mobile) */}
      <Header
        logoUrl={photoSlots.logoUrl}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenPhotoManager={handleOpenPhotoManager}
      />

      {activePage === 'home' && (
        <>
          {/* HERO (Left Subject Portrait + Right Oversized Typography on Desktop; Full-Bleed Overlay on Mobile) */}
          <Hero
            heroImageUrl={photoSlots.heroImageUrl}
            titleLines={PIA_CONTENT.hero.titleLines}
            description={PIA_CONTENT.hero.description}
            ctaLabel={PIA_CONTENT.hero.ctaLabel}
            ctaHref={PIA_CONTENT.hero.ctaHref}
            onSelectSlot={handleOpenPhotoManager}
          />

          {/* SHORT BIO + PORTRAIT 1 */}
          <AboutSection
            eyebrow={PIA_CONTENT.about.eyebrow}
            leadHeading={PIA_CONTENT.about.leadHeading}
            paragraphs={PIA_CONTENT.about.paragraphs}
            extendedParagraphs={PIA_CONTENT.about.extendedParagraphs}
            ctaLabel={PIA_CONTENT.about.ctaLabel}
            portraitOneUrl={photoSlots.portraitOneUrl}
            onSelectSlot={handleOpenPhotoManager}
          />

          {/* MOBILE EXTRA PORTRAIT SEQUENCE (Portrait 2 & Portrait 3 on Mobile) */}
          <PortraitGallery
            photos={{
              portraitTwoUrl: photoSlots.portraitTwoUrl,
              portraitThreeUrl: photoSlots.portraitThreeUrl,
            }}
            onSelectSlot={handleOpenPhotoManager}
          />

          {/* PROFILE HIGHLIGHTS */}
          <ProfileHighlights
            eyebrow={PIA_CONTENT.highlights.eyebrow}
            items={PIA_CONTENT.highlights.items}
            leftPortraitUrl={photoSlots.portraitThreeUrl}
            onSelectSlot={handleOpenPhotoManager}
          />

          {/* FOCUS AREAS + SUPPORTING PHOTOS & TALL FEATURE IMAGE */}
          <AreasOfInterest
            heading={PIA_CONTENT.sectors.heading}
            closingNote={PIA_CONTENT.sectors.closingNote}
            items={PIA_CONTENT.sectors.items}
            featurePhotoUrl={photoSlots.featurePhotoUrl}
            communityPhotos={{
              communityImageOneUrl: photoSlots.communityImageOneUrl,
              communityImageTwoUrl: photoSlots.communityImageTwoUrl,
            }}
            onSelectSlot={handleOpenPhotoManager}
          />

          {/* PRESS RELEASES & MEDIA */}
          <PressSection
            eyebrow={PIA_CONTENT.press.eyebrow}
            items={PIA_CONTENT.press.items}
            photos={{
              newsImageOneUrl: photoSlots.newsImageOneUrl,
              newsImageTwoUrl: photoSlots.newsImageTwoUrl,
              newsImageThreeUrl: photoSlots.newsImageThreeUrl,
            }}
            onSelectSlot={handleOpenPhotoManager}
          />
        </>
      )}

      {activePage === 'gallery' && (
        <GallerySection
          eyebrow={PIA_CONTENT.gallery.eyebrow}
          heading={PIA_CONTENT.gallery.heading}
          items={PIA_CONTENT.gallery.items}
          onBackHome={() => handleNavigate('home', 'top')}
        />
      )}

      {activePage === 'publications' && (
        <PublicationsPage
          pressItems={PIA_CONTENT.press.items}
          photos={{
            newsImageOneUrl: photoSlots.newsImageOneUrl,
            newsImageTwoUrl: photoSlots.newsImageTwoUrl,
            newsImageThreeUrl: photoSlots.newsImageThreeUrl,
          }}
          onSelectSlot={handleOpenPhotoManager}
          onBackHome={() => handleNavigate('home', 'top')}
        />
      )}

      {activePage === 'awards' && (
        <AwardsPage onBackHome={() => handleNavigate('home', 'top')} />
      )}

      {/* FOOTER */}
      <Footer
        footerLogoUrl={photoSlots.footerLogoUrl}
        copyright={PIA_CONTENT.footer.copyright}
      />

      {/* PHOTO SLOT MANAGER MODAL */}
      <PhotoSlotModal
        isOpen={photoModalOpen}
        focusedSlot={focusedSlot}
        photos={photoSlots}
        onUpdateSlot={handleUpdateSlot}
        onResetSlots={handleResetSlots}
        onClose={() => setPhotoModalOpen(false)}
      />
    </div>
  );
}
