import React, { useState } from 'react';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PiaPhotoSlotKey, PiaPhotoSlots, PiaPressItem } from '../types/pia';
import { PiaImage } from './PiaImage';

interface PublicationsPageProps {
  pressItems: PiaPressItem[];
  photos: Pick<
    PiaPhotoSlots,
    'newsImageOneUrl' | 'newsImageTwoUrl' | 'newsImageThreeUrl'
  >;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
  onBackHome: () => void;
}

interface PolicyPublicationItem {
  id: string;
  type: string;
  year: string;
  title: string;
  summary: string;
  fullText: string[];
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const POLICY_PUBLICATIONS: PolicyPublicationItem[] = [
  {
    id: 'pub-1',
    type: 'Public Policy Analysis',
    year: '2026',
    title:
      'Public Policy Implementation and Grassroots Socio-Economic Inclusion in Adamawa State',
    summary:
      'An analytical study examining how local governance structures and public administration frameworks directly shape household livelihoods across Adamawa’s 21 Local Government Areas.',
    fullText: [
      'Drawing from extensive field engagement across Adamawa’s 21 Local Government Areas and postgraduate research in Public Policy Analysis, this publication examines the bridge between policy formulation and everyday community impact.',
      'The study highlights practical mechanisms for strengthening local institutional accountability, expanding women and youth representation in decision-making, and ensuring that social intervention programmes reach underserved wards.',
    ],
  },
  {
    id: 'pub-2',
    type: 'Women & Governance Monograph',
    year: '2025',
    title:
      'Bridging the Participation Gap: Young Women in Nigerian Political Leadership and Civic Service',
    summary:
      'Insights and policy recommendations informed by national leadership experience with the Progressive Young Women Forum in Nigeria and grassroots mobilisation through Woman to Woman Network 21.',
    fullText: [
      'Reflecting on years of national advocacy as National President of the Progressive Young Women Forum in Nigeria, Dr. Patience Ishaku Abbo outlines the structural, educational, and mentorship pathways required to bring more women into elective and appointive leadership.',
      'The publication documents how community-anchored networks such as Woman to Woman Network 21 create sustainable platforms where women connect, build capacity, access economic opportunities, and amplify their civic voices.',
    ],
  },
  {
    id: 'pub-3',
    type: 'Information Science & Education Paper',
    year: '2024',
    title:
      'Information Access, Community Literacy, and Rural Development: Foundations for Inclusive Growth',
    summary:
      'Exploring the role of communication, information literacy, and community learning initiatives in empowering students, educators, and rural households.',
    fullText: [
      'Rooted in her academic foundation in Mass Communication and Library and Information Science from the University of Maiduguri, this paper explores how equitable access to information transforms rural education and civic awareness.',
      'It presents actionable models for community learning centres, scholarship outreach, and ICT literacy programmes tailored to young learners in developing communities.',
    ],
  },
];

export const PublicationsPage: React.FC<PublicationsPageProps> = ({
  pressItems,
  photos,
  onSelectSlot,
  onBackHome,
}) => {
  const [activePressArticle, setActivePressArticle] =
    useState<PiaPressItem | null>(null);
  const [activePolicyPaper, setActivePolicyPaper] =
    useState<PolicyPublicationItem | null>(null);

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

        <div className="pia-eyebrow">PUBLICATIONS &amp; MEDIA</div>
        <h1 className="pia-gallery-heading">
          Publications, Policy Papers &amp; Press Releases
        </h1>
      </div>

      {/* Policy & Academic Publications List */}
      <div className="mb-16">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#8D99AE] mb-6">
          SELECTED POLICY PAPERS &amp; MONOGRAPHS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POLICY_PUBLICATIONS.map((pub, index) => (
            <motion.article
              key={pub.id}
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

      {/* Press Releases & Media Coverage */}
      <div>
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#8D99AE] mb-6">
          PRESS RELEASES &amp; OUTREACH REPORTS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressItems.map((article, index) => (
            <motion.article
              className="pia-press-card max-w-full!"
              key={article.id}
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
                  slotKey={article.slotKey}
                  src={photos[article.slotKey]}
                  alt={article.alt}
                  onSelectSlot={onSelectSlot}
                />
              </div>

              <div className="pia-press-date">{article.date}</div>

              <h3>{article.headline}</h3>

              <button
                type="button"
                onClick={() => setActivePressArticle(article)}
                className="pia-press-link"
              >
                LEARN MORE
              </button>
            </motion.article>
          ))}
        </div>
      </div>

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

              <div className="space-y-3.5">
                {activePolicyPaper.fullText.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-xs md:text-sm leading-[1.85] text-[#25343D]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Press Release Reader Modal */}
      <AnimatePresence>
        {activePressArticle && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            onClick={() => setActivePressArticle(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pia-press-page-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg bg-white p-6 md:p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.26, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#969696]">
                  {activePressArticle.date}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePressArticle(null)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer"
                >
                  Close ✕
                </button>
              </div>

              <h3
                id="pia-press-page-modal-title"
                className="text-lg font-medium text-[#102E4A] leading-snug mb-4"
              >
                {activePressArticle.headline}
              </h3>

              <div className="space-y-3">
                {activePressArticle.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-xs leading-[1.9] text-[#25343D]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
