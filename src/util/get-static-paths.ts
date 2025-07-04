import { type CollectionEntry, getCollection } from 'astro:content';
import { type LanguagesValue, SupportedLanguages } from './languages.ts';

export type StandaloneCollections = 'kits' | 'flyers' | 'pages';

export interface StandaloneContentProps<T extends StandaloneCollections> {
  params: {
    lang: LanguagesValue;
    identifier: string;
    title: string;
  };
  props: {
    entry: CollectionEntry<T>;
  };
}

export async function getStaticPaths<T extends StandaloneCollections>(
  collection: T,
): Promise<StandaloneContentProps<T>[]> {
  const entries = await getCollection(collection);
  return entries.map((entry: CollectionEntry<T>) => {
    return {
      params: {
        lang: entry.data.lang,
        identifier: entry.data.identifier,
        title: entry.data.title,
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

export async function getStaticPathsForPaths() {
  return Object.values(SupportedLanguages).map((lang) => {
    return {
      params: { lang },
      props: { lang },
    };
  });
}
