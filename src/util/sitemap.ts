export type SiteMapUrl = {
  loc: URL;
  lastMod?: Date;
  links?: {
    hreflang: string;
    href: URL;
  }[];
};

export const renderSitemapUrlset = (
  entries: SiteMapUrl[],
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (entry) => `
    <url>
      <loc>${entry.loc}</loc>
      ${entry.lastMod ? `<lastmod>${entry.lastMod?.toISOString()}</lastmod>` : ''}
        ${
          entry.links
            ? entry.links
                ?.map(
                  (link) =>
                    `      <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}"/>`,
                )
                .join('\n')
            : ''
        }
    
    </url>
`,
  )
  .join('')}
</urlset>
`;
