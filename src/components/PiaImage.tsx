import React, { useState } from 'react';
import { srcSetFor } from '../lib/content';

interface PiaImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export const PiaImage: React.FC<PiaImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className={`pia-photo-slot ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`pia-photo-wrapper ${className}`}>
      <img
        src={src}
        srcSet={srcSetFor(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
