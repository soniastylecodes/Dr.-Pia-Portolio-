import React, { useRef } from 'react';
import { PHOTO_SLOT_META } from '../data/piaContent';
import { PiaPhotoSlotKey, PiaPhotoSlots } from '../types/pia';

interface PhotoSlotModalProps {
  isOpen: boolean;
  focusedSlot: PiaPhotoSlotKey | null;
  photos: PiaPhotoSlots;
  onUpdateSlot: (slotKey: PiaPhotoSlotKey, value: string) => void;
  onResetSlots: () => void;
  onClose: () => void;
}

const ALL_SLOT_KEYS: PiaPhotoSlotKey[] = [
  'logoUrl',
  'heroImageUrl',
  'portraitOneUrl',
  'portraitTwoUrl',
  'portraitThreeUrl',
  'featurePhotoUrl',
  'communityImageOneUrl',
  'communityImageTwoUrl',
  'newsImageOneUrl',
  'newsImageTwoUrl',
  'newsImageThreeUrl',
  'footerLogoUrl',
];

export const PhotoSlotModal: React.FC<PhotoSlotModalProps> = ({
  isOpen,
  focusedSlot,
  photos,
  onUpdateSlot,
  onResetSlots,
  onClose,
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isOpen) return null;

  const handleFileUpload = (
    slotKey: PiaPhotoSlotKey,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateSlot(slotKey, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Manage PIA Photographs"
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[88vh] flex flex-col border border-[#e9e9e9]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#e9e9e9] flex items-center justify-between bg-[#102E4A] text-white">
          <div>
            <div className="text-[9px] tracking-[2px] uppercase text-[#93C5FD]">
              PIA PHOTOGRAPH SLOTS
            </div>
            <h2 className="text-[14px] font-medium mt-0.5">
              Supply Actual PIA Photographs (Upload File or Paste URL)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white text-[14px] px-2 py-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-[10px] leading-[1.7] text-[#555]">
            Select local PIA photograph files from your device or paste hosted
            image URLs into each corresponding slot. Changes save automatically
            in your browser.
          </p>

          <div className="space-y-3">
            {ALL_SLOT_KEYS.map((slotKey) => {
              const meta = PHOTO_SLOT_META[slotKey];
              const isFocused = focusedSlot === slotKey;
              const currentValue = photos[slotKey];

              return (
                <div
                  key={slotKey}
                  className={`p-3.5 border ${
                    isFocused
                      ? 'border-[#174D83] bg-[#f4f8fc]'
                      : 'border-[#e9e9e9] bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#102E4A]">
                        {meta.label}
                      </span>
                      <span className="ml-2 text-[9px] text-[#969696]">
                        · {meta.aspectHint}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono tracking-wider uppercase text-[#174D83]">
                      {meta.token}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={
                        currentValue.startsWith('data:image')
                          ? '[Uploaded Local Photograph]'
                          : currentValue
                      }
                      onChange={(e) => onUpdateSlot(slotKey, e.target.value)}
                      placeholder={`Paste ${meta.token} or image URL...`}
                      className="flex-1 text-[10px] px-2.5 py-2 border border-[#d8e0e8] text-[#25343D] focus:outline-none focus:border-[#174D83]"
                    />

                    <input
                      ref={(el) => {
                        fileInputRefs.current[slotKey] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(slotKey, e)}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slotKey]?.click()}
                      className="px-3 py-2 text-[9px] font-semibold tracking-[1.2px] uppercase bg-[#174D83] text-white hover:bg-[#102E4A] whitespace-nowrap cursor-pointer"
                    >
                      Upload Photo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-[#e9e9e9] bg-[#fafafa] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetSlots}
            className="text-[9px] font-medium tracking-[1.2px] uppercase text-[#656565] hover:text-[#102E4A] cursor-pointer"
          >
            Reset Slots
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[9px] font-semibold tracking-[1.4px] uppercase bg-[#102E4A] text-white hover:bg-[#174D83] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
