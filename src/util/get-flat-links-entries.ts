import { type CollectionEntry, getCollection } from 'astro:content';
import {
  getStaticPathsForFlyers,
  getStaticPathsForKits,
  getStaticPathsForPages,
} from './get-static-paths.ts';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
import type { LinkTypes } from './link-icon-type.ts';

export interface LinkData {
  slug: string;
  title?: string;
  url?: string;
  type?: LinkTypes;
  identifier?: string;
  lang?: string;
  filePath?: string;
}

export const getFlatLinksEntries = async (): Promise<LinkData[]> => {
  return [
    ...(await getAllExternalLinksEntries()),
    ...(await getAllFlyerLinksEntries()),
    ...(await getAllKitLinksEntries()),
    ...(await getAllPageLinksEntries()),
  ];
};

export const getAllExternalLinksEntries = async (): Promise<LinkData[]> => {
  const linkEntries: CollectionEntry<'links'>[] = await getCollection('links');
  return linkEntries.reduce((accumulator, currentValue) => {
    // console.log('reduce', currentValue);
    return [
      ...accumulator,
      ...(Object.values(currentValue.data)
        .filter((value) => value.slug && value.url)
        .map((value) => ({
          ...value,
          filePath: currentValue.filePath,
        }))
        .flat() as LinkData[]),
    ];
  }, [] as LinkData[]);
};

const getAllFlyerLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    (await getStaticPathsForFlyers()).map(async (flyer) => {
      const data = flyer.props.entry.data;
      return {
        identifier: data.identifier,
        slug: `flyer-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'FLYER',
        url: await getCanonicalUrlToFlyer(data.lang, data.identifier),
        lang: data.lang,
      };
    }),
  );
};

const getAllKitLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    (await getStaticPathsForKits()).map(async (kit) => {
      const data = kit.props.entry.data;
      return {
        identifier: data.identifier,
        slug: `kit-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'KIT',
        url: await getCanonicalUrlToKit(data.lang, data.identifier),
        lang: data.lang,
      };
    }),
  );
};

const getAllPageLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    (await getStaticPathsForPages()).map(async (kit) => {
      const data = kit.props.entry.data;
      return {
        identifier: data.identifier,
        slug: `page-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'PAGE',
        url: await getCanonicalUrlToPage(data.lang, data.identifier),
        lang: data.lang,
      };
    }),
  );
};
