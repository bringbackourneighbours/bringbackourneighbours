import { getAbsoluteUrl } from './get-absolute-url.ts';
import { getEntry } from 'astro:content';

async function getCanonicalUrl<T extends 'kits' | 'flyers'>(
  collection: T,
  collectionSlug: string,
  lang: string,
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
  lang: string,
  identifier: string,
): Promise<string | undefined> => {
  return getCanonicalUrl('flyers', 'flyer', lang, identifier);
};

export const getCanonicalUrlToKit = async (
  lang: string,
  identifier: string,
): Promise<string | undefined> => {
  return getCanonicalUrl('kits', 'kit', lang, identifier);
};
