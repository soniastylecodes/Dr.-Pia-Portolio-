export type PiaPhotoSlotKey =
  | 'logoUrl'
  | 'heroImageUrl'
  | 'portraitOneUrl'
  | 'portraitTwoUrl'
  | 'portraitThreeUrl'
  | 'featurePhotoUrl'
  | 'communityImageOneUrl'
  | 'communityImageTwoUrl'
  | 'newsImageOneUrl'
  | 'newsImageTwoUrl'
  | 'newsImageThreeUrl'
  | 'footerLogoUrl';

export interface PiaPhotoSlots {
  logoUrl: string;
  heroImageUrl: string;
  portraitOneUrl: string;
  portraitTwoUrl: string;
  portraitThreeUrl: string;
  featurePhotoUrl: string;
  communityImageOneUrl: string;
  communityImageTwoUrl: string;
  newsImageOneUrl: string;
  newsImageTwoUrl: string;
  newsImageThreeUrl: string;
  footerLogoUrl: string;
}

export interface PiaHighlightItem {
  id: string;
  text: string;
}

export interface PiaSectorItem {
  id: string;
  name: string;
  iconType: 'women' | 'education' | 'community' | 'healthcare' | 'technology';
}

export interface PiaPressItem {
  id: string;
  slotKey: 'newsImageOneUrl' | 'newsImageTwoUrl' | 'newsImageThreeUrl';
  category: string;
  alt: string;
  date: string;
  headline: string;
  body: string[];
}

export interface PiaGalleryItem {
  id: string;
  src: string;
  title: string;
  symbol: string;
}

export interface PiaContentData {
  hero: {
    titleLines: [string, string, string];
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  about: {
    eyebrow: string;
    leadHeading: string;
    paragraphs: string[];
    extendedParagraphs: string[];
    ctaLabel: string;
  };
  highlights: {
    eyebrow: string;
    items: PiaHighlightItem[];
  };
  sectors: {
    heading: string;
    closingNote: string;
    items: PiaSectorItem[];
  };
  press: {
    eyebrow: string;
    items: PiaPressItem[];
  };
  gallery: {
    eyebrow: string;
    heading: string;
    items: PiaGalleryItem[];
  };
  footer: {
    copyright: string;
  };
}

