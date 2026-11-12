import React, { useState } from 'react';

interface RotatingQuoteProps {
  quotes: string[];
  author: string;
}

export const RotatingQuote: React.FC<RotatingQuoteProps> = ({ quotes, author }) => {
  const list = quotes.filter((q) => q && q.trim());
  const [quote] = useState(() =>
    list.length ? list[Math.floor(Math.random() * list.length)] : ''
  );

  if (!quote) return null;

  return (
    <figure className="pia-menu-quote">
      <blockquote>{quote}</blockquote>
      <figcaption>{author}</figcaption>
    </figure>
  );
};
