import type { APIRoute } from 'astro';
import {
  getStaticPaths,
  type StandaloneCollections,
} from '../util/get-static-paths.ts';
import { getCanonicalUrlFn } from '../util/get-canonical-url.ts';
import { getTranslationsUrls } from '../util/get-translations-url.ts';
import { renderSitemapUrlset, type SiteMapUrl } from '../util/sitemap.ts';
import { getPrintUrl } from '../util/get-absolute-url.ts';
import { getCollection } from 'astro:content';

async function getSiteMapUrls(
  collection: StandaloneCollections,
): Promise<SiteMapUrl[]> {
  const pages = await getStaticPaths(collection);
  return await Promise.all(
    pages.map(async (entry): Promise<SiteMapUrl> => {
      const lang = entry.params.lang;
      const identifier = entry.params.identifier;
      const translations = await getTranslationsUrls(
        await getCollection(collection),
        lang,
        identifier,
        getCanonicalUrlFn(collection),
      );
      const url = getPrintUrl(collection, lang, identifier);

      return {
        loc: new URL(url),
        lastMod: entry.props.entry.data.lastChecked,
        links: [
          {
            href: new URL(url!),
            hreflang: lang,
          },
          ...translations.map((translation) => ({
            hreflang: translation.lang as string,
            href: new URL(
              getPrintUrl(collection, translation.lang, identifier),
            ),
          })),
        ],
      };
    }),
  );
}

export const GET: APIRoute = async () => {
  const kits: SiteMapUrl[] = await getSiteMapUrls('kits');
  const flyers: SiteMapUrl[] = await getSiteMapUrls('flyers');

  return new Response(renderSitemapUrlset([...kits, ...flyers]), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
