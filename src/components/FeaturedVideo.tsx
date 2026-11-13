import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface FeaturedVideoProps {
  videoId: string;
  eyebrow: string;
  heading: string;
  caption?: string;
  coverUrl: string;
  sourceUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  videoId,
  eyebrow,
  heading,
  caption,
  coverUrl,
  sourceUrl,
}) => {
  const [playing, setPlaying] = useState(false);
  const player = `https://www.tiktok.com/player/v1/${videoId}?autoplay=1&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=1`;

  return (
    <section className="pia-video" id="pia-video" aria-labelledby="pia-video-heading">
      <motion.div
        className="pia-video-copy"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <div className="pia-eyebrow">{eyebrow}</div>
        <h2 id="pia-video-heading" className="pia-video-heading">
          {heading}
        </h2>
        {caption && <p className="pia-video-caption">{caption}</p>}
        <a
          className="pia-video-source"
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on TikTok ↗
        </a>
      </motion.div>

      <motion.div
        className="pia-video-frame"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
      >
        {playing ? (
          <iframe
            src={player}
            title={heading}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="pia-video-cover"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${heading}`}
          >
            <img src={coverUrl} alt="" loading="lazy" decoding="async" />
            <span className="pia-video-play" aria-hidden="true">
              <Play size={26} strokeWidth={0} fill="currentColor" />
            </span>
          </button>
        )}
      </motion.div>
    </section>
  );
};
