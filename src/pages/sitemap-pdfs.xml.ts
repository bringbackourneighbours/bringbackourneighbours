import type { APIRoute } from 'astro';
import { mapStaticPathsForStandalone } from '../util/map-static-paths-for-standalone.ts';
import { getCanonicalUrlFn } from '../util/get-canonical-url.ts';
import { getTranslationsUrls } from '../util/get-translations-url.ts';
import { renderSitemapUrlset, type SiteMapUrl } from '../util/sitemap.ts';
import { getPrintUrl } from '../util/get-based-url.ts';
import { getCollection } from 'astro:content';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

async function getSiteMapUrls(
  collection: StandaloneCollections,
): Promise<SiteMapUrl[]> {
  const entries = await getCollection(collection);
  const pages = mapStaticPathsForStandalone(entries);
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
      const url = getPrintUrl(collection, lang, identifier, true);

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
              getPrintUrl(collection, translation.lang, identifier, true),
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
