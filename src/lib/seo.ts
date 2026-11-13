import {
  absoluteUrl,
  asset,
  awards,
  home,
  legalPages,
  news,
  site,
  srcSetFor,
} from './content';
import { href, Route } from './router';

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article' | 'profile';
  robots: string;
  publishedTime?: string;
  jsonLd: object[];
  preloadImage?: string;
  preloadSrcSet?: string;
  preloadSizes?: string;
}

const PERSON_NAME = 'Patience Ishaku Abbo';

function clip(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function socialUrls(): string[] {
  return Object.values(site.socials || {}).filter(
    (v): v is string => typeof v === 'string' && /^https?:\/\//.test(v)
  );
}

function personSchema() {
  const homeUrl = absoluteUrl(href('/'));
  return {
    '@type': 'Person',
    '@id': `${homeUrl}#person`,
    name: PERSON_NAME,
    honorificPrefix: 'Dr.',
    alternateName: [
      'Dr. Patience Ishaku Abbo',
      'PIA',
      'Patience Abbo',
      'Dr. Patience Abbo',
    ],
    url: homeUrl,
    image: absoluteUrl(asset(home.hero.image)),
    description: site.seoDescription,
    jobTitle: 'Public Policy Advocate and Humanitarian',
    email: site.email ? `mailto:${site.email}` : undefined,
    nationality: { '@type': 'Country', name: 'Nigeria' },
    homeLocation: {
      '@type': 'Place',
      name: 'Michika, Adamawa State, Nigeria',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Maiduguri' },
      {
        '@type': 'EducationalOrganization',
        name: 'Government Secondary School, Michika',
      },
    ],
    spouse: { '@type': 'Person', name: 'Ishaku Elisha Abbo' },
    award: awards.map((a) => `${a.title}, ${a.organization}`),
    knowsAbout: home.focusAreas.items.map((f) => f.name),
    sameAs: socialUrls(),
  };
}

function organizationSchema() {
  const homeUrl = absoluteUrl(href('/'));
  return {
    '@type': 'Organization',
    '@id': `${homeUrl}#network21`,
    name: 'Woman to Woman Network 21',
    url: site.network21Url,
    founder: { '@id': `${homeUrl}#person` },
    areaServed: 'Adamawa State, Nigeria',
  };
}

function websiteSchema() {
  const homeUrl = absoluteUrl(href('/'));
  return {
    '@type': 'WebSite',
    '@id': `${homeUrl}#website`,
    url: homeUrl,
    name: site.siteName,
    about: { '@id': `${homeUrl}#person` },
    inLanguage: 'en-NG',
  };
}

function breadcrumb(name: string, path: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl(href('/')),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: absoluteUrl(href(path)),
      },
    ],
  };
}

function graph(...items: object[]) {
  return [{ '@context': 'https://schema.org', '@graph': items }];
}

export function buildHead(route: Route): HeadData {
  const canonical = absoluteUrl(href(route.path));
  const defaultImage = absoluteUrl(asset(site.shareImage || home.hero.image));
  const base: HeadData = {
    title: site.seoTitle,
    description: clip(site.seoDescription),
    canonical,
    image: defaultImage,
    imageAlt: 'Dr. Patience Ishaku Abbo',
    type: 'website',
    robots: 'index, follow, max-image-preview:large',
    jsonLd: [],
  };

  switch (route.page) {
    case 'home':
      return {
        ...base,
        type: 'profile',
        preloadImage: asset(home.hero.image),
        preloadSrcSet: srcSetFor(asset(home.hero.image)),
        preloadSizes: '(max-width: 899px) 150vw, 55vw',
        jsonLd: graph(websiteSchema(), personSchema(), organizationSchema(), {
          '@type': 'ProfilePage',
          '@id': `${canonical}#profile`,
          url: canonical,
          name: site.seoTitle,
          mainEntity: { '@id': `${absoluteUrl(href('/'))}#person` },
        }),
      };
    case 'gallery':
      return {
        ...base,
        title: `Photos & Videos | ${site.siteName}`,
        description: clip(
          'Official photos and videos of Dr. Patience Ishaku Abbo (PIA), from portraits to community outreach across Adamawa State and Nigeria.'
        ),
        jsonLd: graph(breadcrumb('Media', route.path)),
      };
    case 'publications':
      return {
        ...base,
        title: `Publications & Blog | ${site.siteName}`,
        description: clip(
          'Publications and blog posts by and about Dr. Patience Ishaku Abbo (PIA), founder of Woman to Woman Network 21.'
        ),
        jsonLd: graph(breadcrumb('Publications', route.path)),
      };
    case 'awards':
      return {
        ...base,
        title: `Awards & Honours | ${site.siteName}`,
        description: clip(
          `Awards, honours and leadership recognition received by Dr. Patience Ishaku Abbo (PIA), including ${awards
            .slice(0, 2)
            .map((a) => a.title.split(':')[0])
            .join(' and ')}.`
        ),
        jsonLd: graph(breadcrumb('Awards', route.path)),
      };
    case 'privacy':
    case 'terms': {
      const pg = legalPages[route.page];
      return {
        ...base,
        title: `${pg.title} | ${site.siteName}`,
        description: clip(pg.description),
        jsonLd: graph(breadcrumb(pg.title, route.path)),
      };
    }
    case 'news': {
      const item = news.find((n) => n.slug === route.slug)!;
      const img = item.image ? absoluteUrl(asset(item.image)) : defaultImage;
      return {
        ...base,
        title: `${item.title} | PIA`,
        description: clip(item.summary || stripMarkdown(item.body)),
        image: img,
        imageAlt: item.imageAlt || item.title,
        type: 'article',
        robots: item.sample ? 'noindex, nofollow' : base.robots,
        publishedTime: item.date,
        jsonLd: graph(
          {
            '@type': 'NewsArticle',
            headline: item.title.slice(0, 110),
            description: clip(item.summary || stripMarkdown(item.body)),
            image: [img],
            datePublished: item.date,
            dateModified: item.date,
            mainEntityOfPage: canonical,
            author: { '@id': `${absoluteUrl(href('/'))}#person`, name: PERSON_NAME },
            publisher: {
              '@type': 'Organization',
              name: site.siteName,
              logo: {
                '@type': 'ImageObject',
                url: absoluteUrl(asset('/uploads/pia-na-sia-logo.webp')),
              },
            },
            about: { '@id': `${absoluteUrl(href('/'))}#person` },
          },
          breadcrumb(item.title, route.path)
        ),
      };
    }
    default:
      return {
        ...base,
        title: `Page not found | ${site.siteName}`,
        robots: 'noindex, follow',
      };
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderHeadTags(h: HeadData): string {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<meta name="robots" content="${h.robots}" />`,
    `<link rel="canonical" href="${esc(h.canonical)}" />`,
    `<meta property="og:site_name" content="${esc(site.siteName)}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:type" content="${h.type}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${esc(h.canonical)}" />`,
    `<meta property="og:image" content="${esc(h.image)}" />`,
    `<meta property="og:image:alt" content="${esc(h.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(h.image)}" />`,
  ];
  if (h.preloadImage) {
    tags.push(
      `<link rel="preload" as="image" href="${esc(h.preloadImage)}"${
        h.preloadSrcSet
          ? ` imagesrcset="${esc(h.preloadSrcSet)}" imagesizes="${esc(h.preloadSizes || '100vw')}"`
          : ''
      } fetchpriority="high" />`
    );
  }
  if (h.publishedTime) {
    tags.push(
      `<meta property="article:published_time" content="${esc(h.publishedTime)}" />`
    );
  }
  if (site.googleVerification) {
    tags.push(
      `<meta name="google-site-verification" content="${esc(site.googleVerification)}" />`
    );
  }
  for (const block of h.jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`
    );
  }
  return tags.join('\n    ');
}

export function applyHeadToDocument(h: HeadData): void {
  document.title = h.title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', h.description);
  set('meta[name="robots"]', 'content', h.robots);
  set('link[rel="canonical"]', 'href', h.canonical);
  set('meta[property="og:title"]', 'content', h.title);
  set('meta[property="og:description"]', 'content', h.description);
  set('meta[property="og:url"]', 'content', h.canonical);
  set('meta[property="og:image"]', 'content', h.image);
  set('meta[name="twitter:title"]', 'content', h.title);
  set('meta[name="twitter:description"]', 'content', h.description);
  set('meta[name="twitter:image"]', 'content', h.image);
}
