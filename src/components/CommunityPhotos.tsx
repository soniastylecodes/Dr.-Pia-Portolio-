import React from 'react';
import { PiaPhotoSlotKey, PiaPhotoSlots } from '../types/pia';
import { PiaImage } from './PiaImage';

interface CommunityPhotosProps {
  photos: Pick<PiaPhotoSlots, 'communityImageOneUrl' | 'communityImageTwoUrl'>;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

export const CommunityPhotos: React.FC<CommunityPhotosProps> = ({
  photos,
  onSelectSlot,
}) => {
  return (
    <div className="pia-photo-pair">
      <PiaImage
        slotKey="communityImageOneUrl"
        src={photos.communityImageOneUrl}
        alt="PIA community engagement"
        onSelectSlot={onSelectSlot}
      />
      <PiaImage
        slotKey="communityImageTwoUrl"
        src={photos.communityImageTwoUrl}
        alt="PIA engagement"
        onSelectSlot={onSelectSlot}
      />
    </div>
  );
};
