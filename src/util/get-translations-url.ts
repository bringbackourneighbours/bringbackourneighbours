import { type CollectionEntry } from 'astro:content';
import {
  type CanonicalUrlFn,
  getCanonicalUrlFn,
  getCanonicalUrlForPath,
} from './get-canonical-url.ts';
import { type LanguagesValue, SupportedLanguages } from '../model/languages.ts';

import type { StandaloneCollections } from '../model/standalone-collections.ts';

export async function getTranslationsUrls<T extends StandaloneCollections>(
  allEntries: CollectionEntry<T>[],
  lang: LanguagesValue,
  identifier: string,
  getCanonicalUrlFn: CanonicalUrlFn<T>,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> {
  const allWithUrls = await Promise.all(
    allEntries
      .filter((entry: CollectionEntry<T>) => {
        return SupportedLanguages.map((e) => `${e}`).includes(entry.data.lang);
      })
      .filter((entry: CollectionEntry<T>) => {
        return entry.data.identifier === identifier;
      })
      .filter((entry: CollectionEntry<T>) => {
        return entry.data.lang !== lang;
      })
      .map(async (entry: CollectionEntry<T>) => {
        return {
          lang: entry.data.lang,
          url: await getCanonicalUrlFn(entry, entry.data.lang),
        };
      }),
  );
  return allWithUrls.filter((translation) => {
    return translation.url !== undefined;
  }) as {
    lang: LanguagesValue;
    url: string;
  }[];
}

export const getTranslationsUrlsForFlyer = async (
  allEntries: CollectionEntry<'flyers'>[],
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls(
    allEntries,
    lang,
    identifier,
    getCanonicalUrlFn('flyers'),
  );
};

export const getTranslationsUrlsForKit = async (
  allEntries: CollectionEntry<'kits'>[],
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls(
    allEntries,
    lang,
    identifier,
    getCanonicalUrlFn('kits'),
  );
};

export const getTranslationsUrlsForPages = async (
  allEntries: CollectionEntry<'pages'>[],
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls(
    allEntries,
    lang,
    identifier,
    getCanonicalUrlFn('pages'),
  );
};

export const getTranslationsUrlsForPath = (
  lang: LanguagesValue,
  path: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  const allLanguages = Object.values(SupportedLanguages);

  return Promise.resolve(
    allLanguages
      .filter((possibleLang) => possibleLang !== lang)
      .map((lang) => ({
        lang,
        url: getCanonicalUrlForPath(lang, path),
      })),
  );
};
