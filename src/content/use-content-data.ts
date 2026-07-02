import { getEntry, type InferEntrySchema } from 'astro:content';

import { Languages, type LanguagesValue } from '../model/languages';

import type { MarkdownCollections } from '../model/standalone-collections';

export const useContentData = async <T extends MarkdownCollections>(
  collection: T,
  identifier: string,
  language: LanguagesValue | Languages,
): Promise<InferEntrySchema<T> | undefined> => {
  const foundEntry = await getEntry(collection, `${identifier}/${language}`);

  return foundEntry?.data as InferEntrySchema<T> | undefined;
};
