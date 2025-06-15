import AstroConfig from '../../astro.config.mjs';
import type { StandaloneCollections } from './get-static-paths.ts';

export const getAbsoluteUrl = (path: string): string => {
  return `${AstroConfig.site}${path}`;
};

export function getPrintUrl(
  collection: StandaloneCollections,
  lang: string,
  identifier: string,
) {
  return getAbsoluteUrl(
    `print/${collection.slice(0, -1)}-${lang}-${identifier}.pdf`,
  );
}

export function getAllFlyerPrintUrl(lang: string) {
  return getAbsoluteUrl(`print/all-flyer-${lang}.pdf`);
}
