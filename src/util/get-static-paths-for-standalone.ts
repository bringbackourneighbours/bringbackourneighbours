import { type CollectionEntry } from 'astro:content';
import { SupportedLanguages } from '../model/languages.ts';
import type {
  StandaloneCollectionEntry,
  StandaloneCollections,
  StandaloneContentProps,
} from '../model/standalone-collections.ts';

export function getStaticPathsForStandalone<T extends StandaloneCollections>(
  entries: StandaloneCollectionEntry<T>[],
): StandaloneContentProps<T>[] {
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

export async function getStaticPathsForPaths() {
  return Object.values(SupportedLanguages).map((lang) => {
    return {
      params: { lang },
      props: { lang },
    };
  });
}
