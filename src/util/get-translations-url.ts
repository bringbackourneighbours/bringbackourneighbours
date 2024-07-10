import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
import { Languages } from './languages.enum.ts';
import { getAbsoluteUrl } from './get-absolute-url.ts';

export async function getTranslationsUrls<
  T extends 'kits' | 'flyers' | 'pages',
>(
  collection: T,
  lang: string,
  identifier: string,
  getCanonicalUrlFn: (
    lang: string,
    identifier: string,
  ) => Promise<string | undefined>,
): Promise<
  {
    lang: string;
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
    lang: string;
    url: string;
  }[];
}

export const getTranslationsUrlsForFlyer = async (
  lang: string,
  identifier: string,
): Promise<
  {
    lang: string;
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
  lang: string,
  identifier: string,
): Promise<
  {
    lang: string;
    url: string;
  }[]
> => {
  return getTranslationsUrls('kits', lang, identifier, getCanonicalUrlToKit);
};

export const getTranslationsUrlsForPages = async (
  lang: string,
  identifier: string,
): Promise<
  {
    lang: string;
    url: string;
  }[]
> => {
  return getTranslationsUrls('pages', lang, identifier, getCanonicalUrlToPage);
};

export const getTranslationsUrlsForPath = (
  lang: string,
  path: string,
): Promise<
  {
    lang: string;
    url: string;
  }[]
> => {
  const allLanguages = Object.values(Languages);

  return Promise.resolve(
    allLanguages
      .filter((possibleLang) => possibleLang !== lang)
      .map((lang) => ({
        lang,
        url: getAbsoluteUrl(`${lang}/${path}`),
      })),
  );
};
