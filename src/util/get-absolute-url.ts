import AstroConfig from '../../astro.config.mjs';
import type { StandaloneCollections } from './get-static-paths.ts';
import type { LanguagesValue } from './languages.ts';

export const getAbsoluteUrl = (path: string): string => {
  return `${AstroConfig.site}${path}`;
};

export function getPrintUrl(
  collection: StandaloneCollections,
  lang: string,
  identifier: string,
) {
  return getAbsoluteUrl(
    `print/${collection.slice(0, -1)}-${identifier}-${lang}.pdf`,
  );
}

export function getAllFlyerPrintUrl(lang: LanguagesValue | 'all') {
  return getAbsoluteUrl(`print/all-flyer-${lang}.pdf`);
}
