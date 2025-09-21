import type { LanguagesValue } from './languages.ts';
import type { CollectionEntry } from 'astro:content';

export type StandaloneCollections = 'kits' | 'flyers' | 'pages';

export type StandaloneCollectionEntry<T extends StandaloneCollections> =
  CollectionEntry<T>;

export interface StandaloneContentProps<T extends StandaloneCollections> {
  params: {
    lang: LanguagesValue;
    identifier: string;
    title: string;
  };
  props: {
    entry: StandaloneCollectionEntry<T>;
  };
}
