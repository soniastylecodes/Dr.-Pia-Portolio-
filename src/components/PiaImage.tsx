import React, { useState } from 'react';

interface PiaImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const PiaImage: React.FC<PiaImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className={`pia-photo-slot ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`pia-photo-wrapper ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
