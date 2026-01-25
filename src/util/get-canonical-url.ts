import type { LanguagesValue } from '../model/languages.ts';

// import AstroConfig from '../astro.config.mjs';  -> old import. new import WIP
import { site } from 'astro:config/client';

import { getAbsoluteUrl } from './get-absolute-url.ts';
import { getEntry } from 'astro:content';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

export async function getCanonicalUrl<T extends StandaloneCollections>(
  collection: T,
  collectionSlug: string,
  lang: LanguagesValue,
  identifier: string,
): Promise<string | undefined> {
  // TODO: refactor so avoid dependency to astro:content
  const entry = await getEntry(collection, `${identifier}/${lang}`);

  return entry
    ? getAbsoluteUrl(
        `${lang}/${collectionSlug}/${identifier}/${encodeURIComponent(entry.data.title)}`,
      )
    : undefined;
}

export const getCanonicalUrlToFlyer = async (
  lang: LanguagesValue,
  identifier: string,
): Promise<string | undefined> => {
  return getCanonicalUrl('flyers', 'flyer', lang, identifier);
};

export const getCanonicalUrlToKit = async (
  lang: LanguagesValue,
  identifier: string,
): Promise<string | undefined> => {
  return getCanonicalUrl('kits', 'kit', lang, identifier);
};

export const getCanonicalUrlToPage = async (
  lang: LanguagesValue,
  identifier: string,
): Promise<string | undefined> => {
  return getCanonicalUrl('pages', 'page', lang, identifier);
};

export const getCanonicalUrlFn = (
  collection: StandaloneCollections,
): ((
  lang: LanguagesValue,
  identifier: string,
) => Promise<string | undefined>) => {
  if (collection === 'flyers') {
    return getCanonicalUrlToFlyer;
  }
  if (collection === 'kits') {
    return getCanonicalUrlToKit;
  }
  if (collection === 'pages') {
    return getCanonicalUrlToPage;
  }
  return () => Promise.resolve(`${site}`);
};

export function getCanonicalUrlForPath(lang: LanguagesValue, path: string) {
  if (path === '') {
    // avoid trailing slash
    return getAbsoluteUrl(lang);
  }
  return getAbsoluteUrl(`${[lang, path].join('/')}`);
}
