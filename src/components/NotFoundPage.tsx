import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onBackHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackHome }) => {
  return (
    <section className="pia-gallery-page">
      <div className="pia-gallery-page-header">
        <div className="pia-eyebrow">PAGE NOT FOUND</div>
        <h1 className="pia-gallery-heading">
          This page has moved or no longer exists.
        </h1>
        <button
          type="button"
          onClick={onBackHome}
          className="pia-gallery-back-btn"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          <span>Back to Home</span>
        </button>
      </div>
    </section>
  );
};
