import { site } from './content';

export type Consent = 'granted' | 'denied';

const KEY = 'pia-cookie-consent';
let loaded = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

export function trackingConfigured(): boolean {
  const a = site.analytics || {};
  return Boolean((a.ga4Id || '').trim() || (a.metaPixelId || '').trim());
}

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent): void {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable */
  }
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

function addScript(src: string): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function loadTracking(): void {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  const ga = (site.analytics?.ga4Id || '').trim();
  const px = (site.analytics?.metaPixelId || '').trim();

  if (ga) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`);
  }

  if (px) {
    const n = function fbq(...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const self = n as any;
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as NonNullable<Window['fbq']>;
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    window.fbq = n;
    addScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', px);
    window.fbq('track', 'PageView');
  }
}

export function trackPageView(path: string, title: string): void {
  if (!loaded) return;
  const ga = (site.analytics?.ga4Id || '').trim();
  if (ga && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }
  if (window.fbq && (site.analytics?.metaPixelId || '').trim()) {
    window.fbq('track', 'PageView');
  }
}
