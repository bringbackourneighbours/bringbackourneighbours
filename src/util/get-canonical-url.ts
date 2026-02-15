import type { LanguagesValue } from '../model/languages.ts';

import AstroConfig from '../../astro.config.mjs';

import { getBasedUrl } from './get-based-url.ts';
import { getEntry } from 'astro:content';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

export async function getCanonicalUrl<T extends StandaloneCollections>(
  collection: T,
  collectionSlug: string,
  lang: LanguagesValue,
  identifier: string,
  absolute = false,
): Promise<string | undefined> {
  // TODO: refactor so avoid dependency to astro:content
  const entry = await getEntry(collection, `${identifier}/${lang}`);

  return entry
    ? getBasedUrl(
        `${lang}/${collectionSlug}/${identifier}/${encodeURIComponent(entry.data.title)}`,
        absolute,
      )
    : undefined;
}

export const getCanonicalUrlToFlyer = async (
  lang: LanguagesValue,
  identifier: string,
  absolute = false,
): Promise<string | undefined> => {
  return getCanonicalUrl('flyers', 'flyer', lang, identifier, absolute);
};

export const getCanonicalUrlToKit = async (
  lang: LanguagesValue,
  identifier: string,
  absolute = false,
): Promise<string | undefined> => {
  return getCanonicalUrl('kits', 'kit', lang, identifier, absolute);
};

export const getCanonicalUrlToPage = async (
  lang: LanguagesValue,
  identifier: string,
  absolute = false,
): Promise<string | undefined> => {
  return getCanonicalUrl('pages', 'page', lang, identifier, absolute);
};

export const getCanonicalUrlFn = (
  collection: StandaloneCollections,
): ((
  lang: LanguagesValue,
  identifier: string,
  absolute?: boolean,
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
  return () => Promise.resolve(`${AstroConfig.site}`);
};

export function getCanonicalUrlForPath(
  lang: LanguagesValue,
  path: string,
  absolute = false,
) {
  if (path === '') {
    // avoid trailing slash
    return getBasedUrl(lang, absolute);
  }
  return getBasedUrl(`${[lang, path].join('/')}`, absolute);
}
