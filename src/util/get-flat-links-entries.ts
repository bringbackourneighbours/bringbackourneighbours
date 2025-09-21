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
}

export const getFlatLinksEntries = async (): Promise<LinkData[]> => {
  return [
    ...(await getAllExternalLinksEntries()),
    ...(await getAllFlyerLinksEntries()),
    ...(await getAllKitLinksEntries()),
    ...(await getAllPageLinksEntries()),
  ];
};

const getAllExternalLinksEntries = async (): Promise<LinkData[]> => {
  // TODO: refactor so avoid dependency to astro:content
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
    // TODO: refactor so avoid dependency to astro:content
    mapStaticPathsForStandalone(await getCollection('flyers')).map(
      async (flyer) => {
        const data = flyer.props.entry.data;
        return {
          identifier: data.identifier,
          slug: `flyer-${data.lang}-${data.identifier}`,
          title: data.title,
          type: 'FLYER',
          url: await getCanonicalUrlToFlyer(data.lang, data.identifier),
          lang: data.lang,
        };
      },
    ),
  );
};

const getAllKitLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    // TODO: refactor so avoid dependency to astro:content
    mapStaticPathsForStandalone(await getCollection('kits')).map(
      async (kit) => {
        const data = kit.props.entry.data;
        return {
          identifier: data.identifier,
          slug: `kit-${data.lang}-${data.identifier}`,
          title: data.title,
          type: 'KIT',
          url: await getCanonicalUrlToKit(data.lang, data.identifier),
          lang: data.lang,
        };
      },
    ),
  );
};

const getAllPageLinksEntries = async (): Promise<LinkData[]> => {
  return Promise.all(
    // TODO: refactor so avoid dependency to astro:content
    mapStaticPathsForStandalone(await getCollection('pages')).map(
      async (kit) => {
        const data = kit.props.entry.data;
        return {
          identifier: data.identifier,
          slug: `page-${data.lang}-${data.identifier}`,
          title: data.title,
          type: 'PAGE',
          url: await getCanonicalUrlToPage(data.lang, data.identifier),
          lang: data.lang,
        };
      },
    ),
  );
};
