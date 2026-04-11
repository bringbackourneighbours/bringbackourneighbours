import type { LanguagesValue } from '../model/languages';
import type { CollectionEntry } from 'astro:content';
import type {
  StandaloneCollectionEntry,
  StandaloneCollections,
} from '../model/standalone-collections';

import { getBasedUrl } from './get-based-url';

export type CanonicalUrlFn<T extends StandaloneCollections> = (
  entry: StandaloneCollectionEntry<T>,
  // the lang here is not redundant, as it we could use it for a fallback as entry.data.lang
  lang: LanguagesValue,
  absolute?: boolean,
) => Promise<string>;

async function getCanonicalUrl<T extends StandaloneCollections>(
  entry: CollectionEntry<T> | undefined,
  collectionSlug: string,
  lang: LanguagesValue,
  absolute = false,
): Promise<string> {
  if (entry) {
    const langMismatch: boolean = lang !== entry.data.lang;
    const seoTitle = !langMismatch
      ? `/${encodeURIComponent(entry.data.title)}`
      : '';
    return getBasedUrl(
      `${lang}/${collectionSlug}/${entry.data.identifier}${seoTitle}`,
      absolute,
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
  absolute = false,
): Promise<string> => {
  return getCanonicalUrl(entry, 'flyer', lang, absolute);
};

export const getCanonicalUrlToKit: CanonicalUrlFn<'kits'> = async (
  entry: CollectionEntry<'kits'> | undefined,
  lang: LanguagesValue,
  absolute = false,
): Promise<string> => {
  return getCanonicalUrl(entry, 'kit', lang, absolute);
};

export const getCanonicalUrlToPage: CanonicalUrlFn<'pages'> = async (
  entry: CollectionEntry<'pages'> | undefined,
  lang: LanguagesValue,
  absolute = false,
): Promise<string> => {
  return getCanonicalUrl(entry, 'page', lang, absolute);
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
