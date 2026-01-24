// import AstroConfig from '../astro.config.mjs';  -> old import. new import WIP
import { site } from 'astro:config/client';
import type { LanguagesValue } from '../model/languages.ts';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

export const getAbsoluteUrl = (path: string): string => {
  return `${site}${path}`;
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

export function getAllFlyerPrintUrl(lang: LanguagesValue | 'all') {
  return getAbsoluteUrl(`print/all-flyer-${lang}.pdf`);
}
