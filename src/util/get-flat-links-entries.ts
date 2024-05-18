import { getCollection, type CollectionEntry } from 'astro:content';

export interface LinkData {
  slug: string;
  title: string;
  url: string;
  type: string;
}

export const getFlatLinksEntries = async (): Promise<LinkData[]> => {
  const linkEntries: CollectionEntry<'links'>[] = await getCollection('links');
  return linkEntries.reduce((accumulator, currentValue) => {
    return [...accumulator, ...Object.values(currentValue.data).flat()];
  }, [] as LinkData[]);
};
