import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, Volume2, VolumeX } from 'lucide-react';

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
  eyebrow,
  heading,
  coverUrl,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [tiktokPlaying, setTiktokPlaying] = useState(false);

  const userMuted = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!reduceMotion) video.play().catch(() => undefined);

    const unmute = () => {
      cleanup();
      if (userMuted.current || !videoRef.current) return;
      const v = videoRef.current;
      v.muted = false;
      setMuted(false);
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
      });
    };
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchend', 'keydown'];
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, unmute));
    events.forEach((e) => window.addEventListener(e, unmute, { passive: true }));
    return cleanup;
  }, [reduceMotion]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    userMuted.current = next;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.play().catch(() => undefined);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
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
        <div className="pia-video-frame" ref={frameRef}>
          {fileUrl ? (
            <>
              <video
                ref={videoRef}
                src={fileUrl}
                poster={coverUrl}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
                onClick={togglePlay}
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
                aria-label={heading}
              />
              {paused && (
                <button
                  type="button"
                  className="pia-video-cover"
                  onClick={togglePlay}
                  aria-label="Play video"
                >
                  <span className="pia-video-play" aria-hidden="true">
                    <Play size={18} strokeWidth={0} fill="currentColor" />
                  </span>
                </button>
              )}
              {muted && !paused && (
                <span className="pia-video-hint" aria-hidden="true">
                  Tap for sound
                </span>
              )}
              <button
                type="button"
                className="pia-video-sound"
                onClick={toggleSound}
                aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              >
                {muted ? <VolumeX size={15} strokeWidth={2} /> : <Volume2 size={15} strokeWidth={2} />}
              </button>
            </>
          ) : tiktokPlaying && tiktokId ? (
            <iframe
              src={`https://www.tiktok.com/player/v1/${tiktokId}?autoplay=1&music_info=0&description=0&rel=0`}
              title={heading}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="pia-video-cover"
              onClick={() => setTiktokPlaying(true)}
              aria-label={`Play video: ${heading}`}
            >
              <img src={coverUrl} alt="" loading="lazy" decoding="async" />
              <span className="pia-video-play" aria-hidden="true">
                <Play size={18} strokeWidth={0} fill="currentColor" />
              </span>
            </button>
          )}
        </div>

        <div className="pia-video-copy">
          <div className="pia-eyebrow">{eyebrow}</div>
          <p id="pia-video-heading" className="pia-video-heading">
            {heading}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
