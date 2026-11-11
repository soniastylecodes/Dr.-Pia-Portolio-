import React from 'react';
import { PiaPhotoSlotKey } from '../types/pia';
import { PiaImage } from './PiaImage';

interface FeatureImageProps {
  featurePhotoUrl: string;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

export const FeatureImage: React.FC<FeatureImageProps> = ({
  featurePhotoUrl,
  onSelectSlot,
}) => {
  return (
    <div className="pia-feature-image">
      <PiaImage
        slotKey="featurePhotoUrl"
        src={featurePhotoUrl}
        alt="Dr. Patience Ishaku Abbo"
        onSelectSlot={onSelectSlot}
      />
    </div>
  );
};
