import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploads = path.join(root, 'public', 'uploads');
const outDir = path.join(uploads, '_r');
const manifestPath = path.join(root, 'src', 'generated', 'images.json');
const WIDTHS = [480, 800, 1200];
const MIN_BYTES = 45 * 1024;

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

const manifest = {};
let made = 0;

for (const file of fs.readdirSync(uploads)) {
  const full = path.join(uploads, file);
  if (!fs.statSync(full).isFile() || !/\.(jpe?g|png|webp)$/i.test(file)) continue;
  if (fs.statSync(full).size < MIN_BYTES) continue;

  const meta = await sharp(full).metadata();
  const width = meta.width || 0;
  const base = file.replace(/\.[^.]+$/, '');
  const variants = [];

  for (const w of WIDTHS) {
    if (w >= width * 0.9) continue;
    const name = `${base}-${w}.webp`;
    const target = path.join(outDir, name);
    if (!fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(full).mtimeMs) {
      await sharp(full).rotate().resize({ width: w }).webp({ quality: 78 }).toFile(target);
      made += 1;
    }
    variants.push([w, `/uploads/_r/${name}`]);
  }

  manifest[`/uploads/${file}`] = { width, variants };
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Responsive images: ${Object.keys(manifest).length} sources, ${made} new variants`);
