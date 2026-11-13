import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface FeaturedVideoProps {
  fileUrl?: string;
  tiktokId?: string;
  tiktokUrl?: string;
  eyebrow: string;
  heading: string;
  caption?: string;
  coverUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  fileUrl,
  tiktokId,
  tiktokUrl,
  eyebrow,
  heading,
  caption,
  coverUrl,
}) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    window.setTimeout(() => videoRef.current?.play().catch(() => undefined), 30);
  };

  return (
    <section className="pia-video" id="pia-video" aria-labelledby="pia-video-heading">
      <motion.div
        className="pia-video-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <div className="pia-video-frame">
          {fileUrl ? (
            <video
              ref={videoRef}
              src={fileUrl}
              poster={coverUrl}
              preload="none"
              playsInline
              controls={playing}
              onEnded={() => setPlaying(false)}
              aria-label={heading}
            />
          ) : (
            playing &&
            tiktokId && (
              <iframe
                src={`https://www.tiktok.com/player/v1/${tiktokId}?autoplay=1&music_info=0&description=0&rel=0`}
                title={heading}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )
          )}

          {!playing && (
            <button
              type="button"
              className="pia-video-cover"
              onClick={start}
              aria-label={`Play video: ${heading}`}
            >
              {!fileUrl && <img src={coverUrl} alt="" loading="lazy" decoding="async" />}
              <span className="pia-video-play" aria-hidden="true">
                <Play size={18} strokeWidth={0} fill="currentColor" />
              </span>
            </button>
          )}
        </div>

        <div className="pia-video-copy">
          <div className="pia-eyebrow">{eyebrow}</div>
          <h2 id="pia-video-heading" className="pia-video-heading">
            {heading}
          </h2>
          {caption && <p className="pia-video-caption">{caption}</p>}
          {!playing && (
            <button type="button" className="pia-video-watch" onClick={start}>
              <Play size={11} strokeWidth={0} fill="currentColor" />
              Watch the video
            </button>
          )}
          {tiktokUrl && (
            <a
              className="pia-video-source"
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              On TikTok ↗
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};
