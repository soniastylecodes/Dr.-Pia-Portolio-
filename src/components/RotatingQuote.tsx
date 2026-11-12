import React, { useState } from 'react';

interface RotatingQuoteProps {
  quotes: string[];
}

export const RotatingQuote: React.FC<RotatingQuoteProps> = ({ quotes }) => {
  const list = quotes.filter((q) => q && q.trim());
  const [quote] = useState(() =>
    list.length ? list[Math.floor(Math.random() * list.length)] : ''
  );

  if (!quote) return null;

  return (
    <blockquote className="pia-menu-quote">
      <span aria-hidden="true">“</span>
      {quote}
      <span aria-hidden="true">”</span>
    </blockquote>
  );
};
