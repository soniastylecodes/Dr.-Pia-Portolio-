import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { allRoutePaths, href, matchRoute } from './lib/router';
import { buildHead, renderHeadTags } from './lib/seo';
import { absoluteUrl, site } from './lib/content';

export function render(path: string) {
  const fullPath = href(path);
  const route = matchRoute(fullPath);
  const html = renderToString(
    <StrictMode>
      <App initialPath={fullPath} />
    </StrictMode>
  );
  return { html, head: renderHeadTags(buildHead(route)) };
}

export const routes = allRoutePaths;
export const base = import.meta.env.BASE_URL;
export const siteUrl = site.siteUrl;
export const toAbsolute = (path: string) => absoluteUrl(href(path));
