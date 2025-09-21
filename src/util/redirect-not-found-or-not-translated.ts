import type { CollectionEntry } from 'astro:content';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
import type { LanguagesValue } from '../model/languages.ts';

import type { StandaloneCollections } from '../model/standalone-collections.ts';

async function redirectNotTranslated<T extends StandaloneCollections>(
  getCanonicalUrlFn: (
    lang: LanguagesValue,
    identifier: string,
  ) => Promise<string | undefined>,
  entry?: CollectionEntry<T>,
): Promise<
  | {
      url: string;
      status: number;
    }
  | false
> {
  if (entry?.data?.fallback) {
    const fallbackUrl = await getCanonicalUrlFn(
      entry.data.fallback,
      entry.data.identifier,
    );

    if (fallbackUrl) {
      return {
        url: fallbackUrl,
        status: 302, // this in only temporary as we are waiting for translation
      };
    }
  }
  return false;
}

export const redirectNotTranslatedForFlyer = async (
  entry?: CollectionEntry<'flyers'>,
) => redirectNotTranslated(getCanonicalUrlToFlyer, entry);

export const redirectNotTranslatedForKit = async (
  entry?: CollectionEntry<'kits'>,
) => redirectNotTranslated(getCanonicalUrlToKit, entry);

export const redirectNotTranslatedForPage = async (
  entry?: CollectionEntry<'pages'>,
) => redirectNotTranslated(getCanonicalUrlToPage, entry);
