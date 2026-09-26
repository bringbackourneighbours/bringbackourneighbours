import { getCollection, getEntry, type InferEntrySchema } from 'astro:content';

import { Languages, type LanguagesValue } from '../model/languages';

import type { MarkdownCollections } from '../model/standalone-collections';

export const useContentData = async <T extends MarkdownCollections>(
  collection: T,
  identifier: string,
  language: LanguagesValue | Languages,
  suppressWarning = false,
): Promise<InferEntrySchema<T> | undefined> => {
  if (suppressWarning) {
    const foundEntries = await getCollection(collection, (item) => {
      return item.id === `${identifier}/${language}`;
    });
    return foundEntries[0]?.data as InferEntrySchema<T> | undefined;
  } else {
    const foundEntry = await getEntry(collection, `${identifier}/${language}`);
    return foundEntry?.data as InferEntrySchema<T> | undefined;
  }
};
