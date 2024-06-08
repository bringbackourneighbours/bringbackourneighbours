import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
} from './get-canonical-url.ts';

export async function getTranslationsUrls<T extends 'kits' | 'flyers'>(
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
