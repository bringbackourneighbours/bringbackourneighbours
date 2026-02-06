import type { CollectionEntry } from 'astro:content';
import type { LinkTypes } from '../model/link-types.ts';

export interface LinkData {
  slug: string;
  title?: string;
  url?: string;
  type?: LinkTypes;
  identifier?: string;
  lang?: string;
  filePath?: string;
  lastChecked?: Date;
  noCheckUntil?: Date;
}

export const getAllExternalLinksEntries = async (
  linkEntries: CollectionEntry<'links'>[],
): Promise<LinkData[]> => {
  return linkEntries.reduce((accumulator, currentValue) => {
    return [
      ...accumulator,
      ...(Object.values(currentValue.data)
        .filter((value) => value.slug && value.url)
        .map((value) => ({
          ...value,
          lastChecked:
            value.lastChecked || currentValue.data['all']?.lastChecked,
          noCheckUntil:
            value.noCheckUntil || currentValue.data['all']?.noCheckUntil,
          filePath: currentValue.filePath,
        }))
        .flat() as LinkData[]),
    ];
  }, [] as LinkData[]);
};
