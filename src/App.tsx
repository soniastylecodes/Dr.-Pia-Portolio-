/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LazyMotion } from 'motion/react';

const loadMotion = () => import('./lib/motionFeatures').then((r) => r.default);

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AreasOfInterest } from './components/AreasOfInterest';
import { AwardsPage } from './components/AwardsPage';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedVideo } from './components/FeaturedVideo';
import { ContactCta } from './components/ContactCta';
import { CookieBanner } from './components/CookieBanner';
import { LegalPageView } from './components/LegalPage';
import { MobileDock } from './components/MobileDock';
import { NewsArticlePage } from './components/NewsArticlePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Preloader } from './components/Preloader';
import { PressSection } from './components/PressSection';
import { ProfileHighlights } from './components/ProfileHighlights';
import { PublicationsPage } from './components/PublicationsPage';
import { asset, gallery, home, LOGO, LOGO_WHITE_GREEN, news, site, tiktokId } from './lib/content';
import { href, matchRoute, Route, RouterContext } from './lib/router';
import { applyHeadToDocument, buildHead } from './lib/seo';
import { trackPageView } from './lib/analytics';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const [route, setRoute] = useState<Route>(() =>
    matchRoute(
      initialPath ??
        (typeof window !== 'undefined' ? window.location.pathname : '/')
    )
  );
  const [isLoading, setIsLoading] = useState(true);
  const firstRender = useRef(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1050);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(matchRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const hash = window.location.hash.slice(1);
      if (hash && route.page === 'home') {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 1100);
      }
      return;
    }
    const head = buildHead(route);
    applyHeadToDocument(head);
    trackPageView(window.location.pathname, head.title);
  }, [route]);

  const navigate = useCallback(
    (path: string, sectionId?: string) => {
      const next = matchRoute(href(path));
      const isPageChange = next.path !== route.path;

      if (isPageChange) {
        window.history.pushState(
          {},
          '',
          href(path) + (sectionId && sectionId !== 'top' ? `#${sectionId}` : '')
        );
        setRoute(next);
      }

      if (next.page !== 'home' || !sectionId || sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: isPageChange ? 'auto' : 'smooth' });
        return;
      }

      window.setTimeout(
        () => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: 'smooth' });
        },
        isPageChange ? 120 : 30
      );
    },
    [route.path]
  );

  const routerValue = useMemo(() => ({ route, navigate }), [route, navigate]);
  const backHome = () => navigate('/', 'top');
  const homeNews = news.slice(0, Math.max(1, home.news.count || 6));

  return (
    <LazyMotion features={loadMotion}>
    <RouterContext.Provider value={routerValue}>
      <div className="pia-profile">
        <Preloader isVisible={isLoading} logoUrl={LOGO} />

        <Header logoUrl={LOGO} />

        <main>
          {route.page === 'home' && (
            <>
              <Hero
                heroImageUrl={asset(home.hero.image)}
                titleLines={home.hero.titleLines}
                description={home.hero.description}
                ctaLabel={home.hero.ctaLabel}
                ctaHref="#pia-about"
              />

              <AboutSection
                eyebrow={home.about.eyebrow}
                leadHeading={home.about.leadHeading}
                paragraphs={home.about.paragraphs}
                fullBioTitle={home.about.fullBioTitle}
                fullBio={home.about.fullBio}
                ctaLabel={home.about.ctaLabel}
                portraitUrl={asset(home.about.portrait)}
              />

              {home.video?.show &&
                (home.video.file || tiktokId(home.video.tiktokUrl)) && (
                  <FeaturedVideo
                    fileUrl={home.video.file ? asset(home.video.file) : undefined}
                    tiktokId={tiktokId(home.video.tiktokUrl)}
                    tiktokUrl={home.video.tiktokUrl || undefined}
                    eyebrow={home.video.eyebrow}
                    heading={home.video.heading}
                    caption={home.video.caption}
                    coverUrl={asset(home.video.cover)}
                  />
                )}

              <ProfileHighlights
                eyebrow={home.highlights.eyebrow}
                items={home.highlights.items}
                portraitUrl={asset(home.highlights.portrait)}
              />

              <AreasOfInterest
                heading={home.focusAreas.heading}
                closingNote={home.focusAreas.closingNote || ''}
                items={home.focusAreas.items}
                featurePhotoUrl={asset(home.focusAreas.featurePhoto)}
                photoLeftUrl={asset(home.focusAreas.photoLeft)}
                photoRightUrl={asset(home.focusAreas.photoRight)}
              />

              {home.news.showOnHome && homeNews.length > 0 && (
                <PressSection eyebrow={home.news.eyebrow} items={homeNews} />
              )}

              {home.contact && (
                <ContactCta
                  eyebrow={home.contact.eyebrow}
                  heading={home.contact.heading}
                  text={home.contact.text}
                  buttonLabel={home.contact.buttonLabel}
                  email={site.email}
                />
              )}
            </>
          )}

          {route.page === 'gallery' && (
            <GallerySection
              eyebrow={gallery.eyebrow}
              heading={gallery.heading}
              items={gallery.photos}
              onBackHome={backHome}
            />
          )}

          {route.page === 'publications' && (
            <PublicationsPage onBackHome={backHome} />
          )}

          {route.page === 'awards' && <AwardsPage onBackHome={backHome} />}

          {route.page === 'news' && route.slug && (
            <NewsArticlePage slug={route.slug} onBackHome={backHome} />
          )}

          {(route.page === 'privacy' || route.page === 'terms') && (
            <LegalPageView page={route.page} onBackHome={backHome} />
          )}

          {route.page === 'not-found' && <NotFoundPage onBackHome={backHome} />}
        </main>

        <Footer
          footerLogoUrl={LOGO_WHITE_GREEN}
          copyright={home.footer.copyright}
          socials={site.socials}
        />

        <MobileDock />

        <CookieBanner />
      </div>
    </RouterContext.Provider>
    </LazyMotion>
  );
}
