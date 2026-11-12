import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = fs
  .readdirSync(ssrDir)
  .find((f) => /^entry-server\.(m?js)$/.test(f));
const server = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function page(routePath) {
  const { html, head } = server.render(routePath);
  return template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
}

const routes = server.routes();
for (const route of routes) {
  const outDir = path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page(route));
}

fs.writeFileSync(path.join(dist, '404.html'), page('/__not-found__/'));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

const today = new Date().toISOString().slice(0, 10);
const newsDates = Object.fromEntries(
  fs
    .readdirSync(path.join(root, 'content/news'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(root, 'content/news', f), 'utf8'));
      return [`/news/${f.replace(/\.json$/, '')}/`, String(data.date || today).slice(0, 10)];
    })
);

const urls = routes
  .map((r) => {
    const lastmod = newsDates[r] || today;
    const priority = r === '/' ? '1.0' : r.startsWith('/news/') ? '0.7' : '0.8';
    return `  <url>\n    <loc>${server.toAbsolute(r)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: ${server.base}admin/\n\nSitemap: ${server.toAbsolute('/sitemap.xml')}\n`
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml and robots.txt`);
