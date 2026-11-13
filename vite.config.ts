import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { defineConfig, type Plugin } from 'vite';

function basePath(): string {
  if (process.env.SITE_BASE) return process.env.SITE_BASE;
  try {
    const site = JSON.parse(
      fs.readFileSync(path.resolve(import.meta.dirname, 'content/settings/site.json'), 'utf8')
    );
    const pathname = new URL(site.siteUrl).pathname.replace(/\/+$/, '');
    return `${pathname}/`;
  } catch {
    return '/';
  }
}

function markdownAtBuild(): Plugin {
  return {
    name: 'pia-markdown-at-build',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0];
      if (!/[\\/]content[\\/].+\.json$/.test(file)) return null;
      const data = JSON.parse(code);
      if (typeof data.body !== 'string') return null;
      data.bodyHtml = marked.parse(data.body, { async: false, gfm: true, breaks: false });
      return { code: JSON.stringify(data), map: null };
    },
  };
}

export default defineConfig(() => {
  return {
    base: basePath(),
    plugins: [markdownAtBuild(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
