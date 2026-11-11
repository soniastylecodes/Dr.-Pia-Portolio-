import React from 'react';
import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Monitor,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PiaPhotoSlotKey, PiaPhotoSlots, PiaSectorItem } from '../types/pia';
import { CommunityPhotos } from './CommunityPhotos';
import { FeatureImage } from './FeatureImage';

interface AreasOfInterestProps {
  heading: string;
  closingNote: string;
  items: PiaSectorItem[];
  featurePhotoUrl: string;
  communityPhotos: Pick<
    PiaPhotoSlots,
    'communityImageOneUrl' | 'communityImageTwoUrl'
  >;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SectorIllustration: React.FC<{
  type: PiaSectorItem['iconType'];
}> = ({ type }) => {
  switch (type) {
    case 'women':
      return <Users size={20} strokeWidth={1.75} className="text-[#174D83]" />;
    case 'education':
      return (
        <GraduationCap
          size={20}
          strokeWidth={1.75}
          className="text-[#174D83]"
        />
      );
    case 'community':
      return (
        <Landmark size={20} strokeWidth={1.75} className="text-[#174D83]" />
      );
    case 'healthcare':
      return (
        <HeartPulse size={20} strokeWidth={1.75} className="text-[#174D83]" />
      );
    case 'technology':
      return (
        <Monitor size={20} strokeWidth={1.75} className="text-[#174D83]" />
      );
  }
};

export const AreasOfInterest: React.FC<AreasOfInterestProps> = ({
  heading,
  closingNote,
  items,
  featurePhotoUrl,
  communityPhotos,
  onSelectSlot,
}) => {
  return (
    <div id="pia-sectors" className="pia-focus-composite">
      {/* Feature Image: Top on Mobile, Right Tall Column on Desktop */}
      <motion.div
        className="pia-feature-col"
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: EASE_OUT }}
      >
        <FeatureImage
          featurePhotoUrl={featurePhotoUrl}
          onSelectSlot={onSelectSlot}
        />
      </motion.div>

      {/* Sectors + Supporting 2-Column Photos: Bottom on Mobile, Left Column on Desktop */}
      <div className="pia-sectors-col">
        <div>
          <motion.h2
            className="pia-sectors-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
          >
            {heading}
          </motion.h2>

          <section className="pia-sectors">
            {items.map((sector, index) => (
              <motion.div
                key={sector.id}
                className="pia-sector"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: EASE_OUT,
                }}
                whileHover={{ x: 6 }}
              >
                <span className="pia-sector-icon-box">
                  <SectorIllustration type={sector.iconType} />
                </span>
                <span>{sector.name}</span>
              </motion.div>
            ))}
          </section>

          {closingNote && (
            <motion.p
              className="pia-sectors-note"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE_OUT }}
            >
              {closingNote}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
        >
          <CommunityPhotos
            photos={communityPhotos}
            onSelectSlot={onSelectSlot}
          />
        </motion.div>
      </div>
    </div>
  );
};
