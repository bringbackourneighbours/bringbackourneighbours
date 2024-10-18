import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
import { SupportedLanguages, type LanguagesValue } from './languages.ts';
import { getAbsoluteUrl } from './get-absolute-url.ts';
import type { StandaloneCollections } from './get-static-paths.ts';

export async function getTranslationsUrls<T extends StandaloneCollections>(
  collection: T,
  lang: LanguagesValue,
  identifier: string,
  getCanonicalUrlFn: (
    lang: LanguagesValue,
    identifier: string,
  ) => Promise<string | undefined>,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> {
  const allEntries = await getCollection(collection);
  const allWithUrls = await Promise.all(
    allEntries
      .filter((flyer: CollectionEntry<T>) => {
        return flyer.data.identifier === identifier && flyer.data.lang !== lang;
      })
      .map(async (flyer: CollectionEntry<T>) => {
        return {
          lang: flyer.data.lang,
          url: await getCanonicalUrlFn(flyer.data.lang, flyer.data.identifier),
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
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls(
    'flyers',
    lang,
    identifier,
    getCanonicalUrlToFlyer,
  );
};

export const getTranslationsUrlsForKit = async (
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls('kits', lang, identifier, getCanonicalUrlToKit);
};

export const getTranslationsUrlsForPages = async (
  lang: LanguagesValue,
  identifier: string,
): Promise<
  {
    lang: LanguagesValue;
    url: string;
  }[]
> => {
  return getTranslationsUrls('pages', lang, identifier, getCanonicalUrlToPage);
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
        url: getAbsoluteUrl(`${lang}/${path}`),
      })),
  );
};
