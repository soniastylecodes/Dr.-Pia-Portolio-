import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { legalPages, renderMarkdown } from '../lib/content';

interface LegalPageProps {
  page: 'privacy' | 'terms';
  onBackHome: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const LegalPageView: React.FC<LegalPageProps> = ({ page, onBackHome }) => {
  const content = legalPages[page];

  return (
    <motion.article
      className="pia-gallery-page pia-article-page pia-legal-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div className="pia-gallery-page-header">
        <button type="button" onClick={onBackHome} className="pia-gallery-back-btn">
          <ArrowLeft size={14} strokeWidth={2} />
          <span>Back to Home</span>
        </button>
        <div className="pia-eyebrow">LEGAL</div>
        <h1 className="pia-gallery-heading">{content.title}</h1>
      </div>

      <div
        className="pia-article-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content.body) }}
      />
    </motion.article>
  );
};
