import React, { createContext, useContext } from 'react';
import { news } from './content';

export type PageKey =
  | 'home'
  | 'gallery'
  | 'publications'
  | 'awards'
  | 'news'
  | 'privacy'
  | 'terms'
  | 'not-found';

export interface Route {
  page: PageKey;
  path: string;
  slug?: string;
}

const BASE = import.meta.env.BASE_URL;

export function href(path: string): string {
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

export function stripBase(pathname: string): string {
  const base = BASE.replace(/\/+$/, '');
  let p = pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length);
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/index\.html$/, '');
  if (!p.endsWith('/')) p = `${p}/`;
  return p;
}

export function matchRoute(pathname: string): Route {
  const p = stripBase(pathname);
  if (p === '/') return { page: 'home', path: '/' };
  if (p === '/gallery/') return { page: 'gallery', path: p };
  if (p === '/publications/') return { page: 'publications', path: p };
  if (p === '/awards/') return { page: 'awards', path: p };
  if (p === '/privacy/') return { page: 'privacy', path: p };
  if (p === '/terms/') return { page: 'terms', path: p };
  const m = p.match(/^\/news\/([^/]+)\/$/);
  if (m && news.some((n) => n.slug === m[1])) {
    return { page: 'news', path: p, slug: m[1] };
  }
  return { page: 'not-found', path: p };
}

export function allRoutePaths(): string[] {
  return [
    '/',
    '/gallery/',
    '/publications/',
    '/awards/',
    '/privacy/',
    '/terms/',
    ...news.map((n) => `/news/${n.slug}/`),
  ];
}

export interface RouterValue {
  route: Route;
  navigate: (path: string, sectionId?: string) => void;
}

export const RouterContext = createContext<RouterValue>({
  route: { page: 'home', path: '/' },
  navigate: () => undefined,
});

export function useRouter(): RouterValue {
  return useContext(RouterContext);
}

export function isPlainLeftClick(e: React.MouseEvent): boolean {
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
}
