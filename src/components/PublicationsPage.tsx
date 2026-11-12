import React, { useState } from 'react';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  asset,
  formatDate,
  news,
  PublicationItem,
  publications,
  renderMarkdown,
} from '../lib/content';
import { href, isPlainLeftClick, useRouter } from '../lib/router';
import { PiaImage } from './PiaImage';

interface PublicationsPageProps {
  onBackHome: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const PublicationsPage: React.FC<PublicationsPageProps> = ({
  onBackHome,
}) => {
  const { navigate } = useRouter();
  const [activePolicyPaper, setActivePolicyPaper] =
    useState<PublicationItem | null>(null);
  const openArticle = (e: React.MouseEvent, slug: string) => {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    navigate(`/news/${slug}/`);
  };

  return (
    <motion.section
      className="pia-gallery-page"
      id="pia-publications-page"
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

        <div className="pia-eyebrow">PUBLICATIONS &amp; BLOG</div>
        <h1 className="pia-gallery-heading">Publications &amp; Blog</h1>
      </div>

      {publications.length === 0 && news.length === 0 && (
        <p className="pia-empty-note">
          New stories and publications will appear here soon.
        </p>
      )}

      {/* Policy & Academic Publications List */}
      {publications.length > 0 && (
      <div className="mb-16">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#8D99AE] mb-6">
          PUBLICATIONS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <motion.article
              key={pub.slug}
              className="border border-[#E5E7EB] bg-white p-6 md:p-7 flex flex-col justify-between hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: EASE_OUT,
              }}
              whileHover={{ y: -4 }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[1.5px] uppercase text-[#174D83] bg-[#F0F6FC] px-2.5 py-1">
                    <BookOpen size={12} strokeWidth={2} />
                    <span>{pub.type}</span>
                  </span>
                  <span className="text-[11px] font-medium text-[#8D99AE]">
                    {pub.year}
                  </span>
                </div>

                <h2 className="text-[17px] md:text-[18px] font-medium text-[#102E4A] leading-snug mb-3">
                  {pub.title}
                </h2>

                <p className="text-[13px] leading-[1.75] text-[#25343D] mb-6">
                  {pub.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActivePolicyPaper(pub)}
                className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[2.4px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer w-fit"
              >
                <FileText size={13} strokeWidth={2} />
                <span>READ PUBLICATION</span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      )}

      {/* Press Releases & Media Coverage */}
      {news.length > 0 && (
      <div>
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#8D99AE] mb-6">
          BLOG
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <motion.article
              className="pia-press-card max-w-full!"
              key={article.slug}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.2 + index * 0.1,
                ease: EASE_OUT,
              }}
              whileHover={{ y: -4 }}
            >
              <div className="pia-press-img-wrap">
                <span className="pia-press-badge">{article.category}</span>
                <PiaImage
                  src={asset(article.image)}
                  alt={article.imageAlt || article.title}
                />
              </div>

              <div className="pia-press-date">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>

              <h3>
                <a
                  href={href(`/news/${article.slug}/`)}
                  onClick={(e) => openArticle(e, article.slug)}
                >
                  {article.title}
                </a>
              </h3>

              <a
                href={href(`/news/${article.slug}/`)}
                onClick={(e) => openArticle(e, article.slug)}
                className="pia-press-link"
              >
                READ ARTICLE
              </a>
            </motion.article>
          ))}
        </div>
      </div>
      )}

      {/* Policy Paper Reader Modal */}
      <AnimatePresence>
        {activePolicyPaper && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            onClick={() => setActivePolicyPaper(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pia-policy-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xl bg-white p-6 md:p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.26, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#174D83]">
                  {activePolicyPaper.type} ({activePolicyPaper.year})
                </span>
                <button
                  type="button"
                  onClick={() => setActivePolicyPaper(null)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <h3
                id="pia-policy-modal-title"
                className="text-lg md:text-xl font-medium text-[#102E4A] leading-snug mb-4"
              >
                {activePolicyPaper.title}
              </h3>

              <div
                className="pia-article-body pia-article-body-compact"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(activePolicyPaper.body),
                }}
              />

              {activePolicyPaper.link && (
                <a
                  href={activePolicyPaper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-[10.5px] font-semibold tracking-[2.4px] uppercase text-[#174D83] hover:text-[#102E4A]"
                >
                  <FileText size={13} strokeWidth={2} />
                  <span>OPEN FULL DOCUMENT ↗</span>
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
