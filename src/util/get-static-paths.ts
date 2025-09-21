import { type CollectionEntry, getCollection } from 'astro:content';
import { SupportedLanguages } from '../model/languages.ts';
import type {
  StandaloneCollections,
  StandaloneContentProps,
} from '../model/standalone-collections.ts';

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
