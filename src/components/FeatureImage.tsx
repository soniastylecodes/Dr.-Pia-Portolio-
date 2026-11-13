import React from 'react';
import { PiaImage } from './PiaImage';

interface FeatureImageProps {
  featurePhotoUrl: string;
}

export const FeatureImage: React.FC<FeatureImageProps> = ({ featurePhotoUrl }) => {
  return (
    <div className="pia-feature-image">
      <PiaImage
        src={featurePhotoUrl}
        sizes="(min-width: 1024px) 40vw, 90vw"
        alt="Dr. Patience Ishaku Abbo, founder of Woman to Woman Network 21"
      />
    </div>
  );
};
