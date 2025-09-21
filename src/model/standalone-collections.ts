import type { LanguagesValue } from '../util/languages.ts';
import type { CollectionEntry } from 'astro:content';

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
