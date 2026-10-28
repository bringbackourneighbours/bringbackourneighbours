import type { CollectionEntry } from 'astro:content';
import type { LinkTypes } from '../model/link-types';

export interface LinkData {
  slug: string;
  id: string;
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
      ...(Object.entries(currentValue.data)
        .map((entry) => {
          return { value: entry[1], lang: entry[0] };
        })
        .filter(({ value }) => value.slug && value.url)
        .map(({ value, lang }) => ({
          ...value,
          lang,
          lastChecked: value.lastChecked || currentValue.data.all?.lastChecked,
          noCheckUntil:
            value.noCheckUntil || currentValue.data.all?.noCheckUntil,
          type: value.type || currentValue.data.all?.type,
          id: currentValue.id,
          filePath: currentValue.filePath,
        }))
        .flat() as LinkData[]),
    ];
  }, [] as LinkData[]);
};
