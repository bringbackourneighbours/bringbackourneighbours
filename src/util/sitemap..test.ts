import { describe, expect, it } from 'vitest';
import { renderSitemapUrlset } from './sitemap.ts';

describe('renderSitemapUrlset', () => {
  it('return xml without entries', () => {
    const xml = renderSitemapUrlset([]);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    );
  });

  it('return xml with entries', () => {
    const xml = renderSitemapUrlset([
      {
        loc: new URL(
          'http://localhost:4321/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene',
        ),
        lastMod: new Date('2025-07-08T00:00:00.000Z'),
        links: [
          {
            href: new URL(
              'http://localhost:4321/en/kit/affected/Emergency%20Kit%20against%20deportations%20for%20people%20threatened%20with%20deportation',
            ),
            hreflang: 'en',
          },
          {
            href: new URL(
              'http://localhost:4321/ku/kit/affected/K%C3%AEta%20awarte%20li%20dij%C3%AE%20ders%C3%AEnorkirin%C3%AA%20ji%20bo%20kes%C3%AAn%20bandordar',
            ),
            hreflang: 'ku',
          },
        ],
      },
    ]);
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<url>');
    expect(xml).toContain(
      '<loc>http://localhost:4321/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene</loc>',
    );
    expect(xml).toContain(' <lastmod>2025-07-08T00:00:00.000Z</lastmod>\n');
    expect(xml).toContain(
      '<xhtml:link rel="alternate" hreflang="en" href="http://localhost:4321/en/kit/affected/Emergency%20Kit%20against%20deportations%20for%20people%20threatened%20with%20deportation"/>',
    );
    expect(xml).toContain(
      '<xhtml:link rel="alternate" hreflang="ku" href="http://localhost:4321/ku/kit/affected/K%C3%AEta%20awarte%20li%20dij%C3%AE%20ders%C3%AEnorkirin%C3%AA%20ji%20bo%20kes%C3%AAn%20bandordar"/>',
    );
    expect(xml).toContain('</url>');
  });
});
