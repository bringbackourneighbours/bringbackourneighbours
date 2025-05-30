import type { APIRoute } from 'astro';

const renderSitemapIndex = (
  sitemapURLs: URL[],
) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapURLs
  .map(
    (url) => `
   <sitemap>
     <loc>${url}</loc>
   </sitemap>
`,
  )
  .join('')}
</sitemapindex>
`;

export const GET: APIRoute = ({ site }) => {
  return new Response(
    renderSitemapIndex([
      new URL('sitemap-collections.xml', site),
      new URL('sitemap-paths.xml', site),
      new URL('sitemap-pdfs.xml', site),
    ]),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
