import { getEntry, type InferEntrySchema } from 'astro:content';

import { Languages, type LanguagesValue } from './languages.ts';
import type { StandaloneCollections } from './get-static-paths.ts';

export const useContentData = async (
  collection: StandaloneCollections,
  identifier: string,
  language: LanguagesValue | Languages,
): Promise<InferEntrySchema<StandaloneCollections> | undefined> => {
  const foundEntry = await getEntry(collection, `${identifier}/${language}`);

  return foundEntry?.data;
};
