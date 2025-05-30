import type { APIRoute } from 'astro';
import {
  getStaticPaths,
  type StandaloneCollections,
} from '../util/get-static-paths.ts';
import { getCanonicalUrlFn } from '../util/get-canonical-url.ts';
import { getTranslationsUrls } from '../util/get-translations-url.ts';

type SiteMapUrl = {
  loc: URL;
  lastMod?: Date;
  links?: {
    hreflang: string;
    href: URL;
  }[];
};

const renderSitemapUrlSet = (
  entries: SiteMapUrl[],
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (entry) => `
    <url>
      <loc>${entry.loc}</loc>
      <lastmod>${entry.lastMod?.toISOString()}</lastmod>
        ${entry.links
          ?.map(
            (link) =>
              `      <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}"/>`,
          )
          .join('')}
    
    </url>
`,
  )
  .join('')}
</urlset>
`;

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

  return new Response(renderSitemapUrlSet([...kits, ...flyers, ...pages]), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
