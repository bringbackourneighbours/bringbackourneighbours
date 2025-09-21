import { type CollectionEntry } from 'astro:content';
import type {
  StandaloneCollectionEntry,
  StandaloneCollections,
  StandaloneContentProps,
} from '../model/standalone-collections.ts';

export function mapStaticPathsForStandalone<T extends StandaloneCollections>(
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
