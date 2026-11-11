import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface AwardsPageProps {
  onBackHome: () => void;
}

interface PiaAwardItem {
  id: string;
  image: string;
  year: string;
  category: string;
  title: string;
  organization: string;
  description: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PIA_AWARDS: PiaAwardItem[] = [
  {
    id: 'award-1',
    image:
      '/assets/aistudio/a3862730-2b8f-45fe-a894-4fdda7310b49_501189c6.jpeg',
    year: '2025',
    category: 'Good Governance & Gender Equality',
    title: 'Award of Excellence: Icon of Societal Development',
    organization: 'Arewa Youth Advocacy for Good Governance (AYAGG)',
    description:
      'In recognition of her commitment, dedication, steadfast resoluteness, passion for youth development, and exceptional track record of relentless service to the Federal Republic of Nigeria.',
  },
  {
    id: 'award-2',
    image:
      '/assets/aistudio/171a1fa1-7c19-424d-a3a5-b91435498bd2_a93e3aee.jpeg',
    year: '2024',
    category: 'Women Empowerment & Education',
    title:
      'Mrs. Ladi Kwali Platinum Leadership Award of Excellence: Icon of Women Development',
    organization:
      'National Youth for Women Empowerment and Education in Nigeria (NYWEEN)',
    description:
      'In recognition and appreciation of her immense contribution towards women empowerment and educational development for the benefit of humanity and country.',
  },
  {
    id: 'award-3',
    image:
      '/assets/aistudio/402615a1-d6ea-4a6d-838f-5fb0232df6ba_cf2ee20b.jpeg',
    year: '2024',
    category: 'Peace & Nation Building',
    title:
      'Sir Abubakar Tafawa Balewa Distinguished Leadership Award: Icon of Nation Building',
    organization:
      'North East Youth Initiative for Peace and Good Governance (NEYIPGG)',
    description:
      'Conferred as Sarauniyan Matasan Arewa Masogabas / Icon of Nation Building in recognition of her contribution towards nation building, humanitarian service, youth empowerment, philanthropy, and educational development.',
  },
  {
    id: 'award-4',
    image:
      '/assets/aistudio/9c757285-dc4c-49e7-926b-3998126f2c85_48057ee1.jpeg',
    year: '2024',
    category: 'Youth Development & Leadership',
    title:
      'Award of Honour: Icon of Exemplary Leadership & Youth Development',
    organization:
      'National Patriotic Youth Advocates for Good Governance (NPYAGG)',
    description:
      'In recognition and appreciation of her immense contribution to youths emancipation, employment, and empowerment, acknowledging her exemplary leadership and selfless service towards nation building.',
  },
  {
    id: 'award-5',
    image:
      '/assets/aistudio/286c5b00-cbcc-4ba6-90c0-0f111904f340_a0964fd1.jpeg',
    year: '2024',
    category: 'Education & Societal Transformation',
    title: 'Award of Honour: Icon of Hope & Nation Building',
    organization: 'Association of Northern Nigerian Students (ANNS)',
    description:
      'Conferred in recognition of her passion for education, youth and women empowerment, capital empowerment, societal transformation, selfless service to humanity, and nation building at large.',
  },
  {
    id: 'award-6',
    image:
      '/assets/aistudio/8b81a8be-54a6-47a0-b751-3303b75f93ff_a78142c0.jpeg',
    year: 'Honour',
    category: 'Legal & Academic Mentorship',
    title: 'Award of Exceptional Leadership and Dedication',
    organization:
      'Ministry of Justice Chambers, Faculty of Law, University of Abuja Chapter',
    description:
      'In recognition of her outstanding leadership roles, inspiring achievements, selfless services, insightful advice, and empowering encouragement towards the progress and development of the Faculty of Law Chambers.',
  },
  {
    id: 'award-7',
    image:
      '/assets/aistudio/a964b4ea-823f-46bd-807b-1a0242a956b9_9645aef2.jpeg',
    year: 'Honour',
    category: 'Humanitarian & Youth Service',
    title: 'Award of Recognition for Humanitarian Service',
    organization: 'Gombe South Youth Forces in Politics',
    description:
      'In heartfelt appreciation of her outstanding support for youths and the less privileged, and her unwavering commitment to humanitarian services in Adamawa State and Nigeria at large.',
  },
  {
    id: 'award-8',
    image:
      '/assets/aistudio/aa75e09c-943f-4aad-b966-273963b53875_d92727c7.jpeg',
    year: 'Leadership',
    category: 'National Women’s Leadership',
    title: 'National President Commemorative Honour',
    organization: 'Progressive Young Women Forum (PYWF)',
    description:
      'Commemorating her distinguished tenure and national service as National President of the Progressive Young Women Forum in Nigeria.',
  },
  {
    id: 'award-9',
    image:
      '/assets/aistudio/0bd27c88-0835-48e3-815c-d288f114b929_00003a80.jpeg',
    year: 'Service',
    category: 'Faith & Community Dedication',
    title: 'Commendation for Commitment & Labour of Love',
    organization: 'Church of the Brethren in Nigeria (EYN LCC No. 2 Viniklang)',
    description:
      'Presented in appreciation of her steadfast commitment in church activities, community fellowship, and labour of love.',
  },
];

export const AwardsPage: React.FC<AwardsPageProps> = ({ onBackHome }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeAward = activeIndex !== null ? PIA_AWARDS[activeIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + PIA_AWARDS.length) % PIA_AWARDS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % PIA_AWARDS.length);
  };

  return (
    <motion.section
      className="pia-gallery-page"
      id="pia-awards-page"
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

        <div className="pia-eyebrow">HONOURS &amp; RECOGNITION</div>
        <h1 className="pia-gallery-heading">
          Awards, Honours &amp; Leadership Recognition
        </h1>
      </div>

      <div className="pia-awards-grid">
        {PIA_AWARDS.map((item, idx) => (
          <motion.article
            key={item.id}
            className="pia-award-card"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: idx * 0.06,
              ease: EASE_OUT,
            }}
            whileHover={{ y: -5 }}
            onClick={() => setActiveIndex(idx)}
          >
            {/* Museum Matte & Framed Plaque Container */}
            <div className="pia-award-frame-outer">
              <div className="pia-award-frame-matte">
                <img
                  src={item.image}
                  alt={item.title}
                  className="pia-award-plaque-img"
                  referrerPolicy="no-referrer"
                />
                <span className="pia-award-zoom-badge" aria-hidden="true">
                  <Maximize2 size={13} strokeWidth={2} />
                </span>
              </div>
            </div>

            {/* Plaque Details */}
            <div className="pia-award-card-body">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[1.4px] uppercase text-[#174D83] bg-[#F0F6FC] px-2.5 py-1">
                  <Award size={12} strokeWidth={2} />
                  <span>{item.category}</span>
                </span>
                <span className="text-[11px] font-semibold tracking-[1.2px] uppercase text-[#8D99AE]">
                  {item.year}
                </span>
              </div>

              <h2 className="text-[16px] md:text-[17.5px] font-medium text-[#102E4A] leading-snug mb-2">
                {item.title}
              </h2>

              <div className="inline-flex items-start gap-1.5 text-[11.5px] font-medium text-[#174D83] mb-3">
                <CheckCircle2
                  size={13}
                  strokeWidth={2}
                  className="shrink-0 mt-0.5"
                />
                <span>{item.organization}</span>
              </div>

              <p className="text-[12.5px] leading-[1.75] text-[#25343D]">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox Modal for Inspecting Framed Award Up Close */}
      <AnimatePresence>
        {activeAward && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeAward.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white p-5 md:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <span className="block text-[10px] font-semibold tracking-[2px] uppercase text-[#174D83]">
                    {activeAward.organization}
                  </span>
                  <h3 className="text-sm md:text-base font-medium text-[#102E4A]">
                    {activeAward.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="text-xs font-semibold tracking-[1px] uppercase text-[#969696] hover:text-[#102E4A] cursor-pointer shrink-0"
                >
                  Close ✕
                </button>
              </div>

              <div className="pia-lightbox-stage">
                <img
                  src={activeAward.image}
                  alt={activeAward.title}
                  className="pia-lightbox-img"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="mt-4 text-xs md:text-[13px] leading-[1.8] text-[#25343D]">
                {activeAward.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8edf2]">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  ← Previous Award
                </button>
                <span className="text-[11px] text-[#8D99AE] tracking-[1.5px]">
                  {activeIndex + 1} / {PIA_AWARDS.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-[#174D83] hover:text-[#102E4A] cursor-pointer"
                >
                  Next Award →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
