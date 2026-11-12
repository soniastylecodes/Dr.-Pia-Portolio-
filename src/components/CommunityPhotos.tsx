import React from 'react';
import { PiaImage } from './PiaImage';

interface CommunityPhotosProps {
  leftUrl: string;
  rightUrl: string;
}

export const CommunityPhotos: React.FC<CommunityPhotosProps> = ({
  leftUrl,
  rightUrl,
}) => {
  return (
    <div className="pia-photo-pair">
      <PiaImage
        src={leftUrl}
        alt="Dr. Patience Ishaku Abbo at a community engagement in Adamawa State"
      />
      <PiaImage
        src={rightUrl}
        alt="Dr. Patience Ishaku Abbo meeting women and community members"
      />
    </div>
  );
};
