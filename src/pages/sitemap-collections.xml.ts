import type { APIRoute } from 'astro';
import {
  getStaticPaths,
  type StandaloneCollections,
} from '../util/get-static-paths.ts';
import { getCanonicalUrlFn } from '../util/get-canonical-url.ts';
import { getTranslationsUrls } from '../util/get-translations-url.ts';
import { renderSitemapUrlset, type SiteMapUrl } from '../util/sitemap.ts';

async function getSiteMapUrls(
  collection: StandaloneCollections,
): Promise<SiteMapUrl[]> {
  const pages = await getStaticPaths(collection);
  return await Promise.all(
    pages.map(async (entry): Promise<SiteMapUrl> => {
      const lang = entry.params.lang;
      const identifier = entry.params.identifier;
      const translations = await getTranslationsUrls(
        collection,
        lang,
        identifier,
        getCanonicalUrlFn(collection),
      );
      const url = await getCanonicalUrlFn(collection)(lang, identifier);

      return {
        loc: new URL(url!),
        lastMod: entry.props.entry.data.lastChecked,
        links: [
          {
            href: new URL(url!),
            hreflang: lang,
          },
          ...translations.map((translation) => ({
            hreflang: translation.lang as string,
            href: new URL(translation.url),
          })),
        ],
      };
    }),
  );
}

export const GET: APIRoute = async () => {
  const kits: SiteMapUrl[] = await getSiteMapUrls('kits');
  const flyers: SiteMapUrl[] = await getSiteMapUrls('flyers');
  const pages: SiteMapUrl[] = await getSiteMapUrls('pages');

  return new Response(renderSitemapUrlset([...kits, ...flyers, ...pages]), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
