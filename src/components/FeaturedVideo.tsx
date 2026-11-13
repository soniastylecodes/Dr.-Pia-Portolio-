import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, m } from 'motion/react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface FeaturedVideoProps {
  fileUrl?: string;
  tiktokId?: string;
  tiktokUrl?: string;
  eyebrow: string;
  heading: string;
  caption?: string;
  details?: string[];
  coverUrl: string;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  fileUrl,
  tiktokId,
  eyebrow,
  heading,
  caption,
  details = [],
  coverUrl,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [tiktokPlaying, setTiktokPlaying] = useState(false);

  const userMuted = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const frame = frameRef.current;
    let io: IntersectionObserver | undefined;
    if (frame) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) go();
        },
        { rootMargin: '400px 0px' }
      );
      io.observe(frame);
    }
    return () => {
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
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
        v.play().catch(() => undefined);
      });
    };
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchend', 'keydown'];
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, unmute));
    events.forEach((e) => window.addEventListener(e, unmute, { passive: true }));
    return cleanup;
  }, [reduceMotion, ready]);

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
      <m.div
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
                src={ready ? fileUrl : undefined}
                poster={coverUrl}
                preload={ready ? 'auto' : 'none'}
                autoPlay={ready}
                muted
                loop
                playsInline
                onClick={togglePlay}
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (progressRef.current && v.duration) {
                    progressRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
                  }
                }}
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
                  <span className="pia-video-hint-touch">Tap for sound</span>
                  <span className="pia-video-hint-pointer">Click for sound</span>
                </span>
              )}
              <span className="pia-video-progress" aria-hidden="true">
                <span ref={progressRef} />
              </span>
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
          <h2 id="pia-video-heading" className="pia-video-heading">
            {heading}
          </h2>
          {caption && <p className="pia-video-caption">{caption}</p>}
          {details.length > 0 && (
            <ul className="pia-video-details">
              {details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      </m.div>
    </section>
  );
};
