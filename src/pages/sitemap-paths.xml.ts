import type { APIRoute } from 'astro';
import { getStaticPathsForPaths } from '../util/get-static-paths-for-standalone.ts';
import { getTranslationsUrlsForPath } from '../util/get-translations-url.ts';
import { renderSitemapUrlset, type SiteMapUrl } from '../util/sitemap.ts';
import { getCanonicalUrlForPath } from '../util/get-canonical-url.ts';

async function getSiteMapUrls(path: string): Promise<SiteMapUrl[]> {
  const pages = await getStaticPathsForPaths();
  return await Promise.all(
    pages.map(async (entry): Promise<SiteMapUrl> => {
      const lang = entry.params.lang;

      const url = getCanonicalUrlForPath(lang, path);
      const translations = await getTranslationsUrlsForPath(lang, path);

      return {
        loc: new URL(url),
        links: [
          {
            href: new URL(url),
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
  const homePaths = await getSiteMapUrls('');
  const wizardPaths = await getSiteMapUrls('wizard');
  const flyerPaths = await getSiteMapUrls('flyer');
  const kitPaths = await getSiteMapUrls('kit');

  return new Response(
    renderSitemapUrlset([
      ...homePaths,
      ...wizardPaths,
      ...flyerPaths,
      ...kitPaths,
    ]),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
