import type { CollectionEntry } from 'astro:content';
import type { LinkTypes } from '../model/link-types.ts';
import { mapStaticPathsForStandalone } from './map-static-paths-for-standalone.ts';
import {
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url.ts';
import { getAllExternalLinksEntries } from './get-all-external-links-entries.ts';
import type { StandaloneContentProps } from '../model/standalone-collections.ts';

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

export const getFlatLinksEntries = async (
  linksEntries: CollectionEntry<'links'>[],
  flyersEntries: CollectionEntry<'flyers'>[],
  kitsEntries: CollectionEntry<'kits'>[],
  pagesEntries: CollectionEntry<'pages'>[],
): Promise<LinkData[]> => {
  return [
    ...(await getAllExternalLinksEntries(linksEntries)),
    ...(await getAllFlyerLinksEntries(flyersEntries)),
    ...(await getAllKitLinksEntries(kitsEntries)),
    ...(await getAllPageLinksEntries(pagesEntries)),
  ];
};

const getAllFlyerLinksEntries = async (
  entries: CollectionEntry<'flyers'>[],
): Promise<LinkData[]> => {
  return Promise.all(
    mapStaticPathsForStandalone(entries).map(
      async (flyer: StandaloneContentProps<'flyers'>) => {
        const data = flyer.props.entry.data;
        return {
          identifier: data.identifier,
          slug: `flyer-${data.lang}-${data.identifier}`,
          title: data.title,
          type: 'FLYER',
          url: await getCanonicalUrlToFlyer(flyer.props.entry, data.lang),
          lang: data.lang,
        };
      },
    ),
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
        url: await getCanonicalUrlToKit(
          kit.props.entry as CollectionEntry<'kits'>,
          data.lang,
        ),
        lang: data.lang,
      };
    }),
  );
};

const getAllPageLinksEntries = async (
  entries: CollectionEntry<'pages'>[],
): Promise<LinkData[]> => {
  return Promise.all(
    mapStaticPathsForStandalone(entries).map(async (page) => {
      const data = page.props.entry.data;
      return {
        identifier: data.identifier,
        slug: `page-${data.lang}-${data.identifier}`,
        title: data.title,
        type: 'PAGE',
        url: await getCanonicalUrlToPage(
          page.props.entry as CollectionEntry<'pages'>,
          data.lang,
        ),
        lang: data.lang,
      };
    }),
  );
};
