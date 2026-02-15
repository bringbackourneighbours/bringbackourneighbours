import AstroConfig from '../../astro.config.mjs';
import type { LanguagesValue } from '../model/languages.ts';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

export const getBasedUrl = (path: string, absolute = false): string => {
  // TODO: could we use the native URL class here?
  return `${absolute ? `${AstroConfig.site}` : '/'}${AstroConfig.base && AstroConfig.base != '' ? `${AstroConfig.base}/` : ''}${path}`;
};

// TODO: move to own file
export function getPrintUrl(
  collection: StandaloneCollections,
  lang: string,
  identifier: string,
  absolute = false,
) {
  return getBasedUrl(
    `print/${collection.slice(0, -1)}-${lang}-${identifier}.pdf`,
    absolute,
  );
}

// TODO: move to own file
export function getAllFlyerPrintUrl(lang: LanguagesValue | 'all') {
  return getBasedUrl(`print/all-flyer-${lang}.pdf`);
}
