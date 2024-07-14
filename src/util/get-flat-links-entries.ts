import { getCollection, type CollectionEntry } from 'astro:content';
import {
  getStaticPathsForFlyers,
  getStaticPathsForKits,
} from './get-static-paths.ts';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
} from './get-canonical-url.ts';

export interface LinkData {
  slug: string;
  title?: string;
  url?: string;
  type?: string;
}

export const getFlatLinksEntries = async (): Promise<LinkData[]> => {
  return [
    ...(await getAllExternalLinksEntries()),
    ...(await getAllFlyerLinksEntries()),
    ...(await getAllKitLinksEntries()),
  ];
};

const getAllExternalLinksEntries = async (): Promise<LinkData[]> => {
  const linkEntries: CollectionEntry<'links'>[] = await getCollection('links');
  return linkEntries.reduce((accumulator, currentValue) => {
    return [
      ...accumulator,
      ...(Object.values(currentValue.data)
        .filter((value) => value.slug && value.url)
        .flat() as LinkData[]),
    ];
  }, [] as LinkData[]);
};

const getAllFlyerLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    (await getStaticPathsForFlyers()).map(async (flyer) => {
      const data = flyer.props.entry.data;
      return {
        slug: `flyer-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'FLYER',
        url: await getCanonicalUrlToFlyer(data.lang, data.identifier),
      };
    }),
  );
};

const getAllKitLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    (await getStaticPathsForKits()).map(async (kit) => {
      const data = kit.props.entry.data;
      return {
        slug: `kit-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'KIT',
        url: await getCanonicalUrlToKit(data.lang, data.identifier),
      };
    }),
  );
};
