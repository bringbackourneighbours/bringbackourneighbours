import { getAbsoluteUrl } from './get-absolute-url.ts';
import { getEntry } from 'astro:content';
import type { LanguagesValue } from './languages.ts';
import type { StandaloneCollections } from './get-static-paths.ts';

export async function getCanonicalUrl<T extends StandaloneCollections>(
  collection: T,
  collectionSlug: string,
  lang: LanguagesValue,
  identifier: string,
): Promise<string | undefined> {
  const entry = await getEntry(collection, `${identifier}/${lang}`);

  return entry
    ? getAbsoluteUrl(
        `${lang}/${collectionSlug}/${identifier}/${entry?.data.seo ? encodeURIComponent(entry.data.seo) : ''}`,
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
