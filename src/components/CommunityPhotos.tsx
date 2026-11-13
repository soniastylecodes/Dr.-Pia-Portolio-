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
        sizes="(min-width: 1024px) 22vw, 46vw"
        alt="Dr. Patience Ishaku Abbo at a community engagement in Adamawa State"
      />
      <PiaImage
        src={rightUrl}
        sizes="(min-width: 1024px) 22vw, 46vw"
        alt="Dr. Patience Ishaku Abbo meeting women and community members"
      />
    </div>
  );
};
