import { PiaContentData, PiaPhotoSlotKey, PiaPhotoSlots } from '../types/pia';

const svgToDataUri = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

/**
 * PIA Monogram + 3-line stacked name lockup matching the exact reference logo layout,
 * rendered in PIA's blue & white brand palette.
 */
export const PIA_BRAND_LOGO_BLUE = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 76" fill="none">
  <!-- Stylized PIA Interlocking Monogram -->
  <path d="M10 60L30 12L50 60H41L30 32L19 60H10Z" fill="#102E4A"/>
  <path d="M6 22C20 19 38 27 54 52" stroke="#2B72B8" stroke-width="5" stroke-linecap="round"/>
  <circle cx="30" cy="12" r="3.8" fill="#174D83"/>
  <!-- 3-Line Stacked Name Lockup -->
  <text x="66" y="26" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#102E4A">DR. PATIENCE</text>
  <text x="66" y="43" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#102E4A">ISHAKU</text>
  <text x="66" y="60" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#102E4A">ABBO</text>
</svg>
`);

export const PIA_BRAND_LOGO_WHITE = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 76" fill="none">
  <!-- Stylized PIA Interlocking Monogram in White -->
  <path d="M10 60L30 12L50 60H41L30 32L19 60H10Z" fill="#FFFFFF"/>
  <path d="M6 22C20 19 38 27 54 52" stroke="#93C5FD" stroke-width="5" stroke-linecap="round"/>
  <circle cx="30" cy="12" r="3.8" fill="#FFFFFF"/>
  <!-- 3-Line Stacked Name Lockup -->
  <text x="66" y="26" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#FFFFFF">DR. PATIENCE</text>
  <text x="66" y="43" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#FFFFFF">ISHAKU</text>
  <text x="66" y="60" font-family="Sora, sans-serif" font-size="12" font-weight="500" letter-spacing="2.4" fill="#FFFFFF">ABBO</text>
</svg>
`);

export const PIA_IMAGE_1 = '/assets/aistudio/IMG_5862_27de8187.jpeg';
export const PIA_IMAGE_2 = '/assets/aistudio/IMG_5468_7440a813.jpeg';
export const PIA_IMAGE_3 = '/assets/aistudio/IMG_5866_4cf24a1b.jpeg';
export const PIA_IMAGE_4 = '/assets/aistudio/IMG_5865_27c742f1.jpeg';
export const PIA_IMAGE_5 =
  '/assets/aistudio/899271630_1134876032256958_1014021104154786291_n_c463340c.jpeg';
export const PIA_IMAGE_6 =
  '/assets/aistudio/854779757_1133438679067360_8984683565725269711_n_23699f93.jpeg';
export const PIA_IMAGE_7 =
  '/assets/aistudio/864308632_1119778173766744_6714995158138751591_n_e12d672b.jpg';
export const PIA_IMAGE_8 =
  '/assets/aistudio/854569358_1481090993882788_3132476486288767891_n_01db93df.jpeg';
export const PIA_IMAGE_9 =
  '/assets/aistudio/818730137_1086827117327761_6622728787505067371_n_1854b821.jpeg';
export const PIA_IMAGE_10 =
  '/assets/aistudio/756807649_2541003633086706_94459262993092502_n_683807aa.jpeg';
export const PIA_IMAGE_11 =
  '/assets/aistudio/752534311_1573923037463793_290854812550778156_n_d5db4703.jpeg';

/**
 * Default photo slot values using unique, non-repeating PIA photographs
 * across every single section of the website.
 */
export const DEFAULT_PHOTO_SLOTS: PiaPhotoSlots = {
  logoUrl: PIA_BRAND_LOGO_BLUE,
  heroImageUrl: PIA_IMAGE_2,
  portraitOneUrl: PIA_IMAGE_1,
  portraitTwoUrl: PIA_IMAGE_3,
  portraitThreeUrl: PIA_IMAGE_4,
  featurePhotoUrl: PIA_IMAGE_9,
  communityImageOneUrl: PIA_IMAGE_5,
  communityImageTwoUrl: PIA_IMAGE_8,
  newsImageOneUrl: PIA_IMAGE_7,
  newsImageTwoUrl: PIA_IMAGE_6,
  newsImageThreeUrl: PIA_IMAGE_10,
  footerLogoUrl: PIA_BRAND_LOGO_WHITE,
};

export const PHOTO_SLOT_META: Record<
  PiaPhotoSlotKey,
  {
    label: string;
    token: string;
    aspectHint: string;
    section: string;
  }
> = {
  logoUrl: {
    label: 'Header Logo',
    token: 'PASTE-PIA-LOGO-URL',
    aspectHint: 'Horizontal Lockup',
    section: 'Header',
  },
  heroImageUrl: {
    label: 'Hero Photograph (Image 2)',
    token: 'PASTE-PIA-HERO-IMAGE-URL',
    aspectHint: 'Hero Subject Portrait',
    section: 'Hero',
  },
  portraitOneUrl: {
    label: 'Short Bio Portrait 1 (Image 1)',
    token: 'PIA-PORTRAIT-ONE-URL',
    aspectHint: 'Vertical Portrait',
    section: 'Short Bio',
  },
  portraitTwoUrl: {
    label: 'Portrait Gallery 2 (Image 3)',
    token: 'PIA-PORTRAIT-TWO-URL',
    aspectHint: 'Editorial Frame',
    section: 'Portrait Gallery',
  },
  portraitThreeUrl: {
    label: 'Profile Highlights Portrait / Gallery 3 (Image 4)',
    token: 'PIA-PORTRAIT-THREE-URL',
    aspectHint: 'Vertical Portrait',
    section: 'Profile Highlights',
  },
  featurePhotoUrl: {
    label: 'Focus Areas Feature Photograph',
    token: 'PIA-FEATURE-PHOTO-URL',
    aspectHint: 'Tall Feature Portrait',
    section: 'Focus Areas',
  },
  communityImageOneUrl: {
    label: 'Supporting Photograph Left',
    token: 'PIA-COMMUNITY-IMAGE-ONE',
    aspectHint: 'Vertical Pair',
    section: 'Focus Areas',
  },
  communityImageTwoUrl: {
    label: 'Supporting Photograph Right',
    token: 'PIA-COMMUNITY-IMAGE-TWO',
    aspectHint: 'Vertical Pair',
    section: 'Focus Areas',
  },
  newsImageOneUrl: {
    label: 'Press Release 1 Media Photo',
    token: 'PIA-NEWS-IMAGE-ONE',
    aspectHint: '16 : 10 Landscape',
    section: 'Press & Media',
  },
  newsImageTwoUrl: {
    label: 'Press Release 2 Media Photo',
    token: 'PIA-NEWS-IMAGE-TWO',
    aspectHint: '16 : 10 Landscape',
    section: 'Press & Media',
  },
  newsImageThreeUrl: {
    label: 'Press Release 3 Media Photo',
    token: 'PIA-NEWS-IMAGE-THREE',
    aspectHint: '16 : 10 Landscape',
    section: 'Press & Media',
  },
  footerLogoUrl: {
    label: 'Footer Logo (White)',
    token: 'PIA-FOOTER-LOGO-URL',
    aspectHint: 'Horizontal Lockup',
    section: 'Footer',
  },
};

export function isPlaceholderToken(url: string | undefined): boolean {
  if (!url || !url.trim()) return true;
  const trimmed = url.trim();
  return (
    trimmed.startsWith('PASTE-') ||
    trimmed.startsWith('PIA-') ||
    trimmed === '#'
  );
}

export const PIA_CONTENT: PiaContentData = {
  hero: {
    titleLines: ['Leader', 'Advocate', 'Change Maker'],
    description:
      'Dr. Patience Ishaku Abbo is a politician, public policy advocate, humanitarian, and community leader whose work spans governance, women’s advancement, and grassroots service.',
    ctaLabel: 'EXPLORE PROFILE',
    ctaHref: '#pia-about',
  },
  about: {
    eyebrow: 'SHORT BIO',
    leadHeading:
      'Dr. Patience Ishaku Abbo is a politician, public policy advocate, and humanitarian leader founding Woman to Woman Network 21.',
    paragraphs: [
      'Growing up in Michika, Adamawa State, she served as Head Girl at Government Secondary School, Michika, and proceeded to the University of Maiduguri where she earned a Diploma in Mass Communication and a Degree in Library and Information Science.',
      'She went on to attain a Postgraduate Diploma in Public Administration and a Master’s Degree in Public Policy Analysis, and is advancing a PhD in Public Administration alongside a Master’s in Business Management. She is happily married to Sen. Ishaku Elisha Abbo and blessed with a daughter.',
    ],
    extendedParagraphs: [
      'Beyond the titles, beyond what you may have known me for, and beyond the name PIA, this is me.',
      'I was once simply a girl child growing up in Michika, Adamawa State, with no idea how much of my life would eventually revolve around leadership and service. I did not even understand what leadership meant then, but responsibility seemed to find me early. One of my first experiences of it was serving as Head Girl at Government Secondary School, Michika. Looking back now, I realise that some journeys begin long before we have the words to describe them.',
      'Education opened another chapter of my life. I started with a diploma in Mass Communication at the University of Maiduguri and later continued my degree into Library and Information Science. As the years went by, learning became more than earning certificates for me. I became increasingly curious about people, governance, decisions and how policies eventually affect everyday lives. That curiosity took me further into a PGD in Public Administration, a Master’s in Public Policy Analysis and eventually pursuing my PhD in Public Administration soon and I am still learning, with another Master’s in Business Management currently in progress.',
      'Life also kept taking me beyond the classroom. I found myself working with women and young people, getting involved in humanitarian service, community development and politics. I served as National President of the Progressive Young Women Forum in Nigeria, and at different points in my journey, I have stepped forward to participate in political leadership and seek elective office. Each experience has taught me something about people, responsibility, service and the kind of leader I continue to aspire to become.',
      'Today, that journey continues through Woman to Woman Network 21, which I founded to create a space where women across Adamawa’s 21 Local Government Areas can connect, grow, find opportunities and have their voices heard. Beyond the awards, titles and political seasons, there have been lessons, mistakes, growth and many chapters that have never made it here. Through all of them, however, I have remained deeply committed to learning, serving and becoming better with every season.',
      'She is happily married to Sen. Ishaku Elisha Abbo and blessed with a daughter.',
      'So, beyond everything you may already know about PIA, this is a little more of the woman behind the name.',
      'A politician. A public policy advocate. A humanitarian. A community leader. And above all, a woman whose story is still being written.',
    ],
    ctaLabel: 'LEARN MORE ABOUT PIA',
  },
  highlights: {
    eyebrow: 'PROFILE HIGHLIGHTS',
    items: [
      {
        id: 'h1',
        text: 'Founder of Woman to Woman Network 21, creating a space where women across Adamawa’s 21 Local Government Areas connect, grow, find opportunities, and have their voices heard.',
      },
      {
        id: 'h2',
        text: 'Served as National President of the Progressive Young Women Forum in Nigeria, advancing women and youth participation in governance and political leadership.',
      },
      {
        id: 'h3',
        text: 'Alumna of the University of Maiduguri (Diploma in Mass Communication; Degree in Library & Information Science), holding a PGD in Public Administration and a Master’s in Public Policy Analysis.',
      },
      {
        id: 'h4',
        text: 'Pursuing a PhD in Public Administration alongside a Master’s in Business Management, driven by a deep commitment to how public policies shape everyday lives.',
      },
      {
        id: 'h5',
        text: 'Rooted in Michika, Adamawa State, where her leadership journey began as Head Girl at Government Secondary School, Michika, she remains dedicated to humanitarian service and community development.',
      },
    ],
  },
  sectors: {
    heading: 'Focus areas under her leadership include',
    closingNote:
      'Plus other key leading sectors in Nigeria and beyond.',
    items: [
      {
        id: 'women-girls',
        name: 'Women & Girls Development',
        iconType: 'women',
      },
      {
        id: 'education',
        name: 'Education & Opportunity',
        iconType: 'education',
      },
      {
        id: 'community',
        name: 'Community Development',
        iconType: 'community',
      },
      {
        id: 'healthcare',
        name: 'Healthcare & Social Impact',
        iconType: 'healthcare',
      },
      {
        id: 'technology',
        name: 'ICT Learning & Innovation',
        iconType: 'technology',
      },
    ],
  },
  press: {
    eyebrow: 'PRESS RELEASES & MEDIA',
    items: [
      {
        id: 'press-1',
        slotKey: 'newsImageOneUrl',
        category: 'General',
        alt: 'Press release 1',
        date: 'OCTOBER 24, 2026',
        headline:
          'Educational Support & Community Learning Initiative Across Underserved Wards 2026',
        body: [
          'Dr. Patience Ishaku Abbo reaffirmed her commitment to grassroots capacity building and educational excellence during the latest community outreach, providing learning materials and scholarship support for students.',
          'Addressing educators, parents, and community leaders, she emphasized that quality education remains the strongest foundation for community transformation.',
        ],
      },
      {
        id: 'press-2',
        slotKey: 'newsImageTwoUrl',
        category: 'General',
        alt: 'Press release 2',
        date: 'OCTOBER 24, 2026',
        headline:
          'Empowerment Program for Women & Widows Through Woman to Woman Network 21 2026',
        body: [
          'Through Woman to Woman Network 21, Dr. Patience Ishaku Abbo led a comprehensive empowerment distribution equipping women and widows with vocational tools, micro-enterprise grants, and cooperative training.',
          'The programme is designed to foster long-term economic independence and household resilience across rural and urban communities.',
        ],
      },
      {
        id: 'press-3',
        slotKey: 'newsImageThreeUrl',
        category: 'General',
        alt: 'Press release 3',
        date: 'OCTOBER 24, 2026',
        headline:
          'PIA’s Empowerment Pillar Focuses on Giving Women Sustainable Livelihood Skills',
        body: [
          'Focusing on practical skills and sustainable enterprise, Dr. Patience Ishaku Abbo’s empowerment pillar continues to expand agricultural processing and trade opportunities for women collectives.',
          'Beneficiaries receive both equipment and ongoing mentorship to scale their local businesses and support their families.',
        ],
      },
    ],
  },
  gallery: {
    eyebrow: 'OFFICIAL GALLERY',
    heading: 'Portrait & Outreach Gallery',
    items: [
      {
        id: 'gal-1',
        src: PIA_IMAGE_1,
        symbol: '✦',
        title: 'Dr. Patience Ishaku Abbo (PIA) ✦',
      },
      {
        id: 'gal-2',
        src: PIA_IMAGE_2,
        symbol: '◆',
        title: 'Dr. Patience Ishaku Abbo (PIA) ◆',
      },
      {
        id: 'gal-4',
        src: PIA_IMAGE_4,
        symbol: '★',
        title: 'Dr. Patience Ishaku Abbo (PIA) ★',
      },
      {
        id: 'gal-5',
        src: PIA_IMAGE_5,
        symbol: '✧',
        title: 'Dr. Patience Ishaku Abbo (PIA) ✧',
      },
      {
        id: 'gal-6',
        src: PIA_IMAGE_6,
        symbol: '◈',
        title: 'Dr. Patience Ishaku Abbo (PIA) ◈',
      },
      {
        id: 'gal-7',
        src: PIA_IMAGE_7,
        symbol: '✵',
        title: 'Dr. Patience Ishaku Abbo (PIA) ✵',
      },
      {
        id: 'gal-8',
        src: PIA_IMAGE_8,
        symbol: '✶',
        title: 'Dr. Patience Ishaku Abbo (PIA) ✶',
      },
      {
        id: 'gal-9',
        src: PIA_IMAGE_9,
        symbol: '❂',
        title: 'Dr. Patience Ishaku Abbo (PIA) ❂',
      },
      {
        id: 'gal-10',
        src: PIA_IMAGE_10,
        symbol: '✺',
        title: 'Dr. Patience Ishaku Abbo (PIA) ✺',
      },
      {
        id: 'gal-11',
        src: PIA_IMAGE_11,
        symbol: '❈',
        title: 'Dr. Patience Ishaku Abbo (PIA) ❈',
      },
    ],
  },
  footer: {
    copyright: 'ALL RIGHTS RESERVED',
  },
};
