import { marked } from 'marked';
import siteJson from '../../content/settings/site.json';
import homeJson from '../../content/settings/home.json';
import galleryJson from '../../content/settings/gallery.json';

export type FocusIcon =
  | 'women'
  | 'education'
  | 'community'
  | 'healthcare'
  | 'technology';

export type SocialKey =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'tiktok'
  | 'linkedin'
  | 'youtube';

export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  shareImage: string;
  email: string;
  googleVerification?: string;
  socials: Partial<Record<SocialKey, string>>;
  network21Url: string;
}

export interface HomeContent {
  hero: {
    image: string;
    titleLines: string[];
    description: string;
    ctaLabel: string;
  };
  about: {
    eyebrow: string;
    leadHeading: string;
    paragraphs: string[];
    ctaLabel: string;
    portrait: string;
    fullBioTitle: string;
    fullBio: string[];
  };
  highlights: {
    eyebrow: string;
    portrait: string;
    items: string[];
  };
  focusAreas: {
    heading: string;
    closingNote?: string;
    featurePhoto: string;
    photoLeft: string;
    photoRight: string;
    items: { name: string; icon: FocusIcon }[];
  };
  news: {
    eyebrow: string;
    showOnHome: boolean;
    count: number;
  };
  menu: {
    displayName: string;
    avatar: string;
    network21Image: string;
  };
  footer: {
    copyright: string;
  };
}

export interface GalleryPhoto {
  image: string;
  caption: string;
}

export interface GalleryContent {
  eyebrow: string;
  heading: string;
  photos: GalleryPhoto[];
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  imageAlt?: string;
  summary: string;
  body: string;
  draft?: boolean;
}

export interface AwardItem {
  slug: string;
  title: string;
  year: string;
  category: string;
  organization: string;
  description: string;
  image: string;
  order?: number;
}

export interface PublicationItem {
  slug: string;
  title: string;
  type: string;
  year: string;
  summary: string;
  body: string;
  link?: string;
  order?: number;
}

const BASE = import.meta.env.BASE_URL;

export function asset(path: string | undefined): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

export function absoluteUrl(path: string): string {
  const root = site.siteUrl.replace(/\/+$/, '');
  if (/^https?:\/\//.test(path)) return path;
  const base = BASE.replace(/\/+$/, '');
  let rest = path.startsWith(base + '/') ? path.slice(base.length) : path;
  if (!rest.startsWith('/')) rest = `/${rest}`;
  return `${root}${rest}`;
}

export function renderMarkdown(text: string): string {
  return marked.parse(text || '', { async: false, gfm: true, breaks: false }) as string;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Lagos',
    })
    .toUpperCase();
}

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.json$/, '');
}

function collect<T extends { slug: string }>(
  files: Record<string, unknown>
): T[] {
  return Object.entries(files).map(
    ([path, data]) => ({ ...(data as object), slug: slugFromPath(path) }) as T
  );
}

export const site = siteJson as SiteSettings;
export const home = homeJson as HomeContent;
export const gallery = galleryJson as GalleryContent;

export const news: NewsItem[] = collect<NewsItem>(
  import.meta.glob('../../content/news/*.json', {
    eager: true,
    import: 'default',
  })
)
  .filter((n) => !n.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const awards: AwardItem[] = collect<AwardItem>(
  import.meta.glob('../../content/awards/*.json', {
    eager: true,
    import: 'default',
  })
).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const publications: PublicationItem[] = collect<PublicationItem>(
  import.meta.glob('../../content/publications/*.json', {
    eager: true,
    import: 'default',
  })
).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const LOGO = asset('/uploads/pia-na-sia-logo.png');
export const LOGO_WHITE_GREEN = asset('/uploads/pia-na-sia-logo-white-green.png');
