import React from 'react';
import { PiaPhotoSlotKey, PiaPhotoSlots } from '../types/pia';
import { PiaImage } from './PiaImage';

interface PortraitGalleryProps {
  photos: Pick<PiaPhotoSlots, 'portraitTwoUrl' | 'portraitThreeUrl'>;
  onSelectSlot: (slotKey: PiaPhotoSlotKey) => void;
}

export const PortraitGallery: React.FC<PortraitGalleryProps> = ({
  photos,
  onSelectSlot,
}) => {
  return (
    <div className="pia-mobile-extra-portraits">
      <div className="pia-gallery-item-2">
        <PiaImage
          slotKey="portraitTwoUrl"
          src={photos.portraitTwoUrl}
          alt="Dr. Patience Ishaku Abbo portrait 2"
          onSelectSlot={onSelectSlot}
        />
      </div>

      <div className="pia-gallery-item-3">
        <PiaImage
          slotKey="portraitThreeUrl"
          src={photos.portraitThreeUrl}
          alt="Dr. Patience Ishaku Abbo portrait 3"
          onSelectSlot={onSelectSlot}
        />
      </div>
    </div>
  );
};
