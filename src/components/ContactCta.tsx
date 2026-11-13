import React from 'react';
import { m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ContactCtaProps {
  eyebrow: string;
  heading: string;
  text: string;
  buttonLabel: string;
  email: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ContactCta: React.FC<ContactCtaProps> = ({
  eyebrow,
  heading,
  text,
  buttonLabel,
  email,
}) => {
  return (
    <section className="pia-cta" id="pia-contact" aria-labelledby="pia-cta-heading">
      <m.div
        className="pia-cta-panel"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <p className="pia-cta-eyebrow">{eyebrow}</p>
        <h2 id="pia-cta-heading" className="pia-cta-heading">
          {heading}
        </h2>
        <p className="pia-cta-text">{text}</p>
        <a href={`mailto:${email}`} className="pia-cta-btn">
          <span>{buttonLabel}</span>
          <span className="pia-cta-btn-icon" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={2} />
          </span>
        </a>
      </m.div>
    </section>
  );
};
