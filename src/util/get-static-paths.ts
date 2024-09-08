import { type CollectionEntry, getCollection } from 'astro:content';
import type { LanguagesValue } from './languages.ts';

export interface StandaloneContentProps<T extends 'kits' | 'flyers' | 'pages'> {
  params: {
    lang: LanguagesValue;
    identifier: string;
    seo: string;
  };
  props: {
    entry: CollectionEntry<T>;
  };
}

async function getStaticPaths<T extends 'kits' | 'flyers' | 'pages'>(
  collection: T,
): Promise<StandaloneContentProps<T>[]> {
  const flyerEntries = await getCollection(collection);
  return flyerEntries.map((entry: CollectionEntry<T>) => {
    return {
      params: {
        lang: entry.data.lang,
        identifier: entry.data.identifier,
        seo: entry.data.seo,
      },
      props: { entry },
    };
  });
}

export async function getStaticPathsForFlyers() {
  return getStaticPaths('flyers');
}

export async function getStaticPathsForKits() {
  return getStaticPaths('kits');
}

export async function getStaticPathsForPages() {
  return getStaticPaths('pages');
}
