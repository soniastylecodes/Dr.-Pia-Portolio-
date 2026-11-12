import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import {
  absoluteUrl,
  asset,
  formatDate,
  news,
  renderMarkdown,
} from '../lib/content';
import { href, isPlainLeftClick, useRouter } from '../lib/router';
import { PiaImage } from './PiaImage';

interface NewsArticlePageProps {
  slug: string;
  onBackHome: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const NewsArticlePage: React.FC<NewsArticlePageProps> = ({
  slug,
  onBackHome,
}) => {
  const { navigate } = useRouter();
  const index = news.findIndex((n) => n.slug === slug);
  const item = news[index];
  if (!item) return null;

  const pageUrl = absoluteUrl(href(`/news/${item.slug}/`));
  const shareText = encodeURIComponent(`${item.title} ${pageUrl}`);
  const related = news.filter((n) => n.slug !== slug).slice(0, 3);

  const go = (e: React.MouseEvent, path: string) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    navigate(path);
  };

  return (
    <motion.article
      className="pia-gallery-page pia-article-page"
      id="pia-news-article"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div className="pia-gallery-page-header">
        <button
          type="button"
          onClick={onBackHome}
          className="pia-gallery-back-btn"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          <span>Back to Home</span>
        </button>

        <div className="pia-eyebrow">{item.category || 'PRESS RELEASE'}</div>
        <h1 className="pia-gallery-heading">{item.title}</h1>
        <div className="pia-article-meta">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span aria-hidden="true">·</span>
          <span>Office of Dr. Patience Ishaku Abbo</span>
        </div>
      </div>

      {item.image && (
        <figure className="pia-article-figure">
          <PiaImage
            src={asset(item.image)}
            alt={item.imageAlt || item.title}
            priority
          />
        </figure>
      )}

      <div
        className="pia-article-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(item.body) }}
      />

      <div className="pia-article-share">
        <span>SHARE</span>
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href={`https://x.com/intent/post?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </div>

      {related.length > 0 && (
        <aside className="pia-article-related" aria-label="More news">
          <div className="pia-eyebrow">MORE NEWS</div>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <a
                  href={href(`/news/${r.slug}/`)}
                  onClick={(e) => go(e, `/news/${r.slug}/`)}
                >
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                  <span>{r.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </motion.article>
  );
};
