import { describe, expect, it, vi } from 'vitest';
import { Languages } from '../model/languages';
import type { CollectionEntry } from 'astro:content';
import { getCanonicalUrlFn, getCanonicalUrlForPath } from './get-canonical-url';
import type { StandaloneCollections } from '../model/standalone-collections';

vi.mock('astro:config/server', () => ({
  site: 'https://example.com',
  base: '/',
}));

describe('getCanonicalUrlForPath', () => {
  it('returns based canonical url', () => {
    const result = getCanonicalUrlForPath('de', 'abc');
    expect(result).toBe('/de/abc');
  });
  it('returns on trails slash', () => {
    const result = getCanonicalUrlForPath('de', '');
    expect(result).toBe('/de');
  });
  it('returns absolute canonical url', () => {
    const result = getCanonicalUrlForPath('de', 'abc', true);
    expect(result).toBe('https://example.com/de/abc');
  });
});

describe('getCanonicalUrlFn', () => {
  it('should throw when not existing collection', () => {
    expect(() => getCanonicalUrlFn('mock' as StandaloneCollections)).toThrow();
  });

  it('should throw when no entry', async () => {
    await expect(() =>
      getCanonicalUrlFn('kits')(
        undefined as unknown as CollectionEntry<'kits'>,
        'fa',
        true,
      ),
    ).rejects.toThrow();
  });

  it('should calculate absolute url of kits', async () => {
    const result = await getCanonicalUrlFn('kits')(
      {
        id: 'kit1',
        filePath: 'kitPath.mdx',
        collection: 'kits',
        data: {
          identifier: 'kit1',
          lang: Languages.KURDISH,
          title: 'kitTitle',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        body: '',
      },
      Languages.KURDISH,
      true,
    );
    expect(result).toEqual('https://example.com/ku/kit/kit1/kitTitle');
  });

  it('should calculate based url of kits', async () => {
    const result = await getCanonicalUrlFn('kits')(
      {
        id: 'kit1',
        filePath: 'kitPath.mdx',
        collection: 'kits',
        data: {
          identifier: 'kit1',
          lang: Languages.GEORGIAN,
          title: 'kitTitle',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        body: '',
      },
      Languages.GEORGIAN,
    );
    expect(result).toEqual('/ka/kit/kit1/kitTitle');
  });

  it('should calculate the short url of kits when langs mismatch', async () => {
    const result = await getCanonicalUrlFn('kits')(
      {
        id: 'kit1',
        filePath: 'kitPath.mdx',
        collection: 'kits',
        data: {
          identifier: 'kit1',
          lang: Languages.FRENCH,
          title: 'kitTitle',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        body: '',
      },
      Languages.SPANISH,
    );
    expect(result).toEqual('/es/kit/kit1');
  });

  it('should calculate url of flyers', async () => {
    const result = await getCanonicalUrlFn('flyers')(
      {
        id: 'flyer1',
        filePath: 'flyerPath.mdx',
        collection: 'flyers',
        data: {
          identifier: 'flyer1',
          lang: Languages.TURKISH,
          title: 'flyer',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        body: '',
      },
      Languages.TURKISH,
      true,
    );
    expect(result).toEqual('https://example.com/tr/flyer/flyer1/flyer');
  });

  it('should calculate url of pages', async () => {
    const result = await getCanonicalUrlFn('pages')(
      {
        id: 'page1',
        filePath: 'patePath.mdx',
        collection: 'pages',
        data: {
          identifier: 'page1',
          lang: Languages.ENGLISH,
          title: 'page',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        body: '',
      },
      Languages.ENGLISH,
      true,
    );
    expect(result).toEqual('https://example.com/en/page/page1/page');
  });
});
