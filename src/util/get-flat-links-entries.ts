import { type CollectionEntry, getCollection } from 'astro:content';
import { mapStaticPathsForStandalone } from './map-static-paths-for-standalone.ts';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
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

export const getFlatLinksEntries = async (): Promise<LinkData[]> => {
  return [
    // TODO: refactor so avoid dependency to astro:content
    ...(await getAllExternalLinksEntries(await getCollection('links'))),
    ...(await getAllFlyerLinksEntries(await getCollection('flyers'))),
    ...(await getAllKitLinksEntries(await getCollection('kits'))),
    ...(await getAllPageLinksEntries(await getCollection('pages'))),
  ];
};

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

const getAllFlyerLinksEntries = async (
  entries: CollectionEntry<'flyers'>[],
): Promise<LinkData[]> => {
  return Promise.all(
    mapStaticPathsForStandalone(entries).map(async (flyer) => {
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

const getAllKitLinksEntries = async (
  entries: CollectionEntry<'kits'>[],
): Promise<LinkData[]> => {
  return Promise.all(
    mapStaticPathsForStandalone(entries).map(async (kit) => {
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

const getAllPageLinksEntries = async (
  entries: CollectionEntry<'pages'>[],
): Promise<LinkData[]> => {
  return Promise.all(
    mapStaticPathsForStandalone(entries).map(async (kit) => {
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
