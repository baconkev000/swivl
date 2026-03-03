"use client";

import React from 'react';

/* ─── Brand-color SVG icons ─── */
const GoogleAdsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <circle cx="10" cy="34" r="8" fill="#FBBC04"/>
    <path d="M40 8L18 44l7 4L47 16l-7-8z" fill="#4285F4"/>
    <path d="M8 14l22 36 7-4L15 10 8 14z" fill="#34A853"/>
  </svg>
);

const MetaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <path d="M6 24c0-5 2-9 4.5-12C13 9 15.5 8 17.5 8c2.5 0 4.5 1.5 7 5.5l.5 1 .5-1c2.5-4 4.5-5.5 7-5.5 2 0 4.5 1 7 4 2.5 3 4.5 7 4.5 12 0 3-.5 5.5-1.5 7s-2.5 2.5-4 2.5c-2.5 0-4-1-6.5-4.5L30 39c-1.5-2-2.5-3-4-3s-2.5 1-4 3l-2 2.5C17.5 45 16 46 13.5 46c-1.5 0-3-.7-4-2.5S6 38.5 6 36v-2z" fill="url(#meta1)"/>
    <defs>
      <linearGradient id="meta1" x1="6" y1="8" x2="42" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0081FB"/>
        <stop offset="1" stopColor="#0064E0"/>
      </linearGradient>
    </defs>
  </svg>
);

const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#010101"/>
    <path d="M33 14.5a8.5 8.5 0 01-5-1.5v15a8 8 0 11-8-8l.7.04V24l-.7-.02a4 4 0 104 4V10h4a8.5 8.5 0 008.5 8.5" fill="#EE1D52"/>
    <path d="M32 14a8 8 0 01-4-1.1V27a8 8 0 11-9-7.9V23a4 4 0 104 4V10h5a8 8 0 004 4z" fill="#fff"/>
    <path d="M33 14.5a8.5 8.5 0 01-5-1.5v15a8 8 0 11-8-8l.7.04V24l-.7-.02a4 4 0 104 4V10h4a8.5 8.5 0 008.5 8.5" fill="#69C9D0" opacity="0.7"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="8" fill="#0A66C2"/>
    <path d="M14 19h5v15h-5V19zm2.5-7a3 3 0 110 6 3 3 0 010-6zm8.5 7h5v2.2c.7-1.3 2.3-2.7 4.8-2.7 5.2 0 6.2 3.4 6.2 7.8V34h-5v-7.5c0-1.8-.03-4-2.5-4s-2.9 1.9-2.9 3.9V34H25V19z" fill="#fff"/>
  </svg>
);

const HubSpotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <path d="M34 19.6V17a3.6 3.6 0 002-3.2v-.2a3.6 3.6 0 00-3.6-3.6h-.2a3.6 3.6 0 00-3.6 3.6v.2c0 1.4.8 2.6 2 3.2v2.6a10.4 10.4 0 00-5 2.4L13.4 12.2a4 4 0 00.2-1A4.2 4.2 0 1011 15.2c.7 0 1.5-.3 2.1-.7l12.8 10a10.4 10.4 0 00-1 4.5A10.4 10.4 0 0024.9 39c.6.4 1.2.7 1.9.9A10.4 10.4 0 0036 32a10.4 10.4 0 00-2-6.1 10.3 10.3 0 00-2.8-2.6l2.8-3.7zm-1.5 15.7a5 5 0 110-10 5 5 0 010 10z" fill="#FF7A59"/>
  </svg>
);

const ShopifyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <path d="M38 11.6l-.2-.2s-2.6-.4-2.6-.4-1.7-1.8-1.9-2c-.2-.2-.6-.2-.6 0l-1 .4s-.7-2-1.9-3C28.2 4.5 26 4.5 25.4 4.7c-.2 0-.4-.2-.6-.2C22 3.3 19.8 3.7 18.3 5.8 17.1 7.4 16.3 9.6 16 10.8l-4.5 1.4c-1.4.4-1.4.5-1.6 1.8-.1 1-3.8 29.2-3.8 29.2L34 48l13-3.2S38 11.7 38 11.6z" fill="#95BF47"/>
    <path d="M34 11l-4.5 1.3-.3-.1s-1.5-1.8-1.9-2c-.4-.3-2.6-8.2-2.6-8.2L34 11z" fill="#5E8E3E"/>
    <path d="M25 16l-1.2 3.5s-1.4-.6-2.8-.5c-2.2.2-2.2 1.5-2.2 1.8 0 1.9 5.4 2.6 5.4 7.3 0 3.6-2.3 6-5.4 6-3.7 0-5.6-2.3-5.6-2.3l1-3.4s2 1.7 3.7 1.7c1.1 0 1.6-.9 1.6-1.6 0-2.5-4.4-2.6-4.4-6.9 0-3.5 2.5-7 7.7-7.3 1.9 0 2.8.4 2.8.4z" fill="#fff"/>
  </svg>
);

const WordPressIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#21759B"/>
    <path d="M6 24a18 18 0 0118-18c4 0 7.7 1.4 10.6 3.7L9 35.3A18 18 0 016 24z" fill="#21759B"/>
    <path d="M24 6a18 18 0 0116.3 25.3L28.5 16.5c-.5-1.3-.8-2-.8-2.7 0-.7.4-1.2 1-1.6a3 3 0 001.3-2.7H17A17.9 17.9 0 0124 6zM10 36.7L19.5 9A17.9 17.9 0 0142 24a18 18 0 01-9.1 15.6L24 19l-7.5 21.7A17.9 17.9 0 0110 36.7z" fill="#fff"/>
  </svg>
);

const GoogleAnalyticsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect x="30" y="8" width="8" height="32" rx="4" fill="#F9AB00"/>
    <rect x="20" y="20" width="8" height="20" rx="4" fill="#E37400"/>
    <circle cx="14" cy="36" r="4" fill="#E37400"/>
  </svg>
);

const SearchConsoleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" fill="#4285F4" opacity="0.15"/>
    <circle cx="21" cy="21" r="9" stroke="#4285F4" strokeWidth="3" fill="none"/>
    <path d="M28 28l6 6" stroke="#34A853" strokeWidth="3" strokeLinecap="round"/>
    <path d="M17 21h8M21 17v8" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SemrushIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#FF642D"/>
    <path d="M15 30l9-18 9 18H28l-4-8.5-4 8.5H15z" fill="#fff"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <defs>
      <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#ffd600"/>
        <stop offset="50%" stopColor="#ff0100"/>
        <stop offset="100%" stopColor="#d800b9"/>
      </radialGradient>
      <radialGradient id="ig2" cx="0%" cy="100%" r="100%">
        <stop offset="0%" stopColor="#ff6400"/>
        <stop offset="100%" stopColor="#ff6400" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ig1)"/>
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ig2)" opacity="0.5"/>
    <circle cx="24" cy="24" r="9" stroke="#fff" strokeWidth="3" fill="none"/>
    <circle cx="34.5" cy="13.5" r="2.5" fill="#fff"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#1877F2"/>
    <path d="M28 16h-2c-1.1 0-2 .9-2 2v3h4l-.5 4H24v10h-4V25h-3v-4h3v-3c0-3.3 2.7-6 6-6h2v4z" fill="#fff"/>
  </svg>
);

const ZapierIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#FF4A00"/>
    <path d="M28 10h-8v8.4L13 12 7.6 17.4l6.5 6.5H6v8h8.4L8 38.3 13.4 44l6.5-6.5V46h8v-8.4l6.5 6.5L39.4 38 33 31.5H42v-8h-8.4l6.5-6.5-5.4-5.4-6.5 6.5V10z" fill="#fff" opacity="0.95"/>
  </svg>
);

const MailchimpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#FFE01B"/>
    <path d="M33 26c1.1 0 2 .6 2 1.5s-.9 1.5-2 1.5-2-.7-2-1.5.9-1.5 2-1.5zm-14.5 2c-.4 1.4-1.8 2.4-3.5 2.4-2 0-3.5-1.3-3.5-3s1.5-3 3.5-3c1.7 0 3.1 1 3.5 2.4h.5v-5h2v5h.5c.4-1.4 1.8-2.4 3.5-2.4 2 0 3.5 1.3 3.5 3s-1.5 3-3.5 3c-1.7 0-3.1-1-3.5-2.4H18.5zm3.5-1c-.8 0-1.5.4-1.5 1s.7 1 1.5 1 1.5-.4 1.5-1-.7-1-1.5-1zm-6 0c-.8 0-1.5.4-1.5 1s.7 1 1.5 1 1.5-.4 1.5-1-.7-1-1.5-1z" fill="#241C15"/>
  </svg>
);

const SalesforceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <path d="M20 10.5a9 9 0 017.6 4.2 10 10 0 0113.4 9.4A8 8 0 0140 38.5H11a8.4 8.4 0 01-2.8-16.4A10 10 0 0120 10.5z" fill="#00A1E0"/>
  </svg>
);

const AhrefsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="#FF7043"/>
    <path d="M16 34l8-20 8 20H27l-3-8-3 8H16z" fill="#fff"/>
  </svg>
);

const BingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
    <rect x="2" y="2" width="44" height="44" rx="8" fill="#008373"/>
    <path d="M14 8v24l8 4.5 14-8V22l-9 5-4.5-2.5V8H14z" fill="#fff"/>
  </svg>
);

const integrations1 = [
  { name: "Google Ads", Icon: GoogleAdsIcon },
  { name: "Meta", Icon: MetaIcon },
  { name: "TikTok", Icon: TikTokIcon },
  { name: "LinkedIn", Icon: LinkedInIcon },
  { name: "HubSpot", Icon: HubSpotIcon },
  { name: "Shopify", Icon: ShopifyIcon },
  { name: "Salesforce", Icon: SalesforceIcon },
  { name: "WordPress", Icon: WordPressIcon },
  { name: "Mailchimp", Icon: MailchimpIcon },
];

const integrations2 = [
  { name: "Google Analytics", Icon: GoogleAnalyticsIcon },
  { name: "Search Console", Icon: SearchConsoleIcon },
  { name: "Semrush", Icon: SemrushIcon },
  { name: "Ahrefs", Icon: AhrefsIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "Facebook", Icon: FacebookIcon },
  { name: "Bing Ads", Icon: BingIcon },
  { name: "Zapier", Icon: ZapierIcon },
  { name: "Mailchimp", Icon: MailchimpIcon },
];

function IntegrationPill({ name, Icon }: { name: string; Icon: React.FC }) {
  return (
    <div className="flex items-center gap-3 px-6 h-[68px] shrink-0 min-w-[165px] justify-center" style={{ borderRight: "1px solid #f5f5f7" }}>
      <Icon />
      <span className="text-[13px] font-medium text-black whitespace-nowrap" style={{ opacity: 0.6 }}>{name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof integrations1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-full overflow-hidden" style={{ borderBottom: "1px solid #f5f5f7" }}>
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, idx) => (
          <IntegrationPill key={idx} name={item.name} Icon={item.Icon} />
        ))}
      </div>
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, idx) => (
          <IntegrationPill key={`dup-${idx}`} name={item.name} Icon={item.Icon} />
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section className="w-full bg-white py-[80px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 mb-14">
        <h2 className="text-[36px] md:text-[48px] font-semibold text-black tracking-[-0.03em] leading-[1.1] max-w-[560px]">
          Connects to tools you already use
        </h2>
      </div>

      <div className="overflow-hidden" style={{ borderTop: "1px solid #f5f5f7" }}>
        <MarqueeRow items={integrations1} />
        <MarqueeRow items={integrations2} reverse />
      </div>
    </section>
  );
}
