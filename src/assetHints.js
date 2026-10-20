import { preconnect, preinit, preload } from 'react-dom';

export const HERO_IMAGE = 'https://picsum.photos/seed/mini-store-hero/1200/320';
const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap';

// Call this while rendering a component. React dedupes repeated calls.
export function initAssetHints() {
  // 1. preconnect: product images live on picsum.photos, but we only discover
  //    their URLs after the products Promise resolves. Warm up the connection now.
  preconnect('https://picsum.photos');

  // 2. preinit: the font stylesheet is render-blocking and always needed, so
  //    fetch it AND apply it right away instead of just downloading it.
  preinit(FONT_CSS, { as: 'style' });

  // 3. preload: the hero banner is the largest above-the-fold image (LCP).
  //    We know its exact URL up front, so start fetching it early.
  preload(HERO_IMAGE, { as: 'image' });
}
