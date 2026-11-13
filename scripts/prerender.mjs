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

const sampleNews = new Set(
  fs
    .readdirSync(path.join(root, 'content/news'))
    .filter((f) => f.endsWith('.json'))
    .filter((f) => JSON.parse(fs.readFileSync(path.join(root, 'content/news', f), 'utf8')).sample)
    .map((f) => `/news/${f.replace(/\.json$/, '')}/`)
);
const routes = server.routes();
for (const route of routes) {
  const outDir = path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page(route));
}

fs.writeFileSync(path.join(dist, '404.html'), page('/__not-found__/'));

const mediaUrl = server.toAbsolute('/media/');
fs.mkdirSync(path.join(dist, 'gallery'), { recursive: true });
fs.writeFileSync(
  path.join(dist, 'gallery', 'index.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved to Media</title><link rel="canonical" href="${mediaUrl}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${mediaUrl}"><script>location.replace(${JSON.stringify(mediaUrl)} + location.hash)</script></head><body><a href="${mediaUrl}">Media</a></body></html>`
);
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
  .filter((r) => !sampleNews.has(r))
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

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const siteJson = readJson('content/settings/site.json');
const homeJson = readJson('content/settings/home.json');
const listDir = (rel) =>
  (fs.existsSync(path.join(root, rel)) ? fs.readdirSync(path.join(root, rel)) : [])
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace(/\.json$/, ''), ...readJson(`${rel}/${f}`) }));
const awardsList = listDir('content/awards').sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
const newsList = listDir('content/news')
  .filter((n) => !n.draft && !n.sample)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));
const pubList = listDir('content/publications');
const socials = Object.entries(siteJson.socials || {}).filter(([, v]) => v);
const abs = (p) => server.toAbsolute(p);

const llms = [
  `# Dr. Patience Ishaku Abbo (PIA)`,
  ``,
  `> ${siteJson.seoDescription}`,
  ``,
  `This is the official website of Dr. Patience Ishaku Abbo, also known as PIA. Content here is maintained by her office and is the authoritative source for her biography, honours and official statements.`,
  ``,
  `## Key facts`,
  ``,
  ...homeJson.highlights.items.map((i) => `- ${i}`),
  `- Official email: ${siteJson.email}`,
  ``,
  `## Biography`,
  ``,
  homeJson.about.leadHeading,
  ``,
  ...homeJson.about.paragraphs.flatMap((p) => [p, '']),
  `## Pages`,
  ``,
  `- [Home and biography](${abs('/')})`,
  `- [Awards and honours](${abs('/awards/')})`,
  `- [Photos and videos](${abs('/media/')})`,
  `- [Publications and blog](${abs('/publications/')})`,
  `- [Woman to Woman Network 21](${siteJson.network21Url})`,
  ``,
  `## Awards and honours`,
  ``,
  ...awardsList.map((a) => `- ${a.title}, ${a.organization} (${a.year})`),
  ``,
  ...(pubList.length
    ? [`## Publications`, ``, ...pubList.map((p) => `- ${p.title} (${p.year}): ${p.summary}`), ``]
    : []),
  ...(newsList.length
    ? [`## Latest news`, ``, ...newsList.slice(0, 20).map((n) => `- [${n.title}](${abs(`/news/${n.slug}/`)}) (${n.date}): ${n.summary}`), ``]
    : []),
  ...(socials.length
    ? [`## Official social media`, ``, ...socials.map(([k, v]) => `- ${k}: ${v}`), ``]
    : []),
  `## Optional`,
  ``,
  `- [Privacy Policy](${abs('/privacy/')})`,
  `- [Terms of Use](${abs('/terms/')})`,
  `- [Sitemap](${abs('/sitemap.xml')})`,
  ``,
].join('\n');
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml, robots.txt and llms.txt`);
