import React, { useState } from 'react';
import { isPlaceholderToken, PHOTO_SLOT_META } from '../data/piaContent';
import { PiaPhotoSlotKey } from '../types/pia';

interface PiaImageProps {
  slotKey: PiaPhotoSlotKey;
  src: string;
  alt: string;
  className?: string;
  onSelectSlot?: (slotKey: PiaPhotoSlotKey) => void;
}

export const PiaImage: React.FC<PiaImageProps> = ({
  slotKey,
  src,
  alt,
  className = '',
  onSelectSlot,
}) => {
  const [hasError, setHasError] = useState(false);
  const meta = PHOTO_SLOT_META[slotKey];
  const isPlaceholder = isPlaceholderToken(src) || hasError;

  if (isPlaceholder) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectSlot?.(slotKey)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectSlot?.(slotKey);
          }
        }}
        className={`pia-photo-slot ${className}`}
        title={`Click to set actual PIA photograph for ${meta.label}`}
      >
        <span className="text-[9px] font-semibold tracking-[1.6px] uppercase text-[#174D83] mb-1">
          {meta.token}
        </span>
        <span className="text-[11px] font-medium text-[#102E4A]">
          {meta.label}
        </span>
      </div>
    );
  }

  return (
    <div className={`pia-photo-wrapper ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
      {onSelectSlot && (
        <button
          type="button"
          onClick={() => onSelectSlot(slotKey)}
          className="pia-photo-replace-btn"
        >
          Change Photo
        </button>
      )}
    </div>
  );
};
