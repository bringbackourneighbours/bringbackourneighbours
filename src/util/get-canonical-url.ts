import type { LanguagesValue } from '../model/languages.ts';
import type { CollectionEntry } from 'astro:content';
import type {
  StandaloneCollectionEntry,
  StandaloneCollections,
} from '../model/standalone-collections.ts';

import { getAbsoluteUrl } from './get-absolute-url.ts';

export type CanonicalUrlFn<T extends StandaloneCollections> = (
  entry: StandaloneCollectionEntry<T>,
  lang: LanguagesValue, // FIXME: the lang here is redundant, as it has to be the same as entry.data.lang
) => Promise<string>;

async function getCanonicalUrl<T extends StandaloneCollections>(
  entry: CollectionEntry<T> | undefined,
  collectionSlug: string,
  lang: LanguagesValue,
): Promise<string> {
  if (entry) {
    return getAbsoluteUrl(
      `${lang}/${collectionSlug}/${entry.data.identifier}/${encodeURIComponent(entry.data.title)}`,
    );
  } else {
    throw new Error(
      `And Link to a ${collectionSlug} in ${lang} requires an entry. See in log above what might be missing.`,
    );
  }
}

export const getCanonicalUrlToFlyer: CanonicalUrlFn<'flyers'> = async (
  entry: CollectionEntry<'flyers'>,
  lang: LanguagesValue,
): Promise<string> => {
  return getCanonicalUrl(entry, 'flyer', lang);
};

export const getCanonicalUrlToKit: CanonicalUrlFn<'kits'> = async (
  entry: CollectionEntry<'kits'> | undefined,
  lang: LanguagesValue,
): Promise<string> => {
  return getCanonicalUrl(entry, 'kit', lang);
};

export const getCanonicalUrlToPage: CanonicalUrlFn<'pages'> = async (
  entry: CollectionEntry<'pages'> | undefined,
  lang: LanguagesValue,
): Promise<string> => {
  return getCanonicalUrl(entry, 'page', lang);
};

export function getCanonicalUrlFn<T extends StandaloneCollections>(
  collection: T,
): CanonicalUrlFn<T> {
  if (collection === 'flyers') {
    return getCanonicalUrlToFlyer as CanonicalUrlFn<T>;
  }
  if (collection === 'kits') {
    return getCanonicalUrlToKit as CanonicalUrlFn<T>;
  }
  if (collection === 'pages') {
    return getCanonicalUrlToPage as CanonicalUrlFn<T>;
  }
  throw new Error(`Cannot calculate getCanonicalUrl to a ${collection}.`);
}

export function getCanonicalUrlForPath(lang: LanguagesValue, path: string) {
  if (path === '') {
    // avoid trailing slash
    return getAbsoluteUrl(lang);
  }
  return getAbsoluteUrl(`${[lang, path].join('/')}`);
}
