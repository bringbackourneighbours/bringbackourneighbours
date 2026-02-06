import { describe, expect, it, vi } from 'vitest';
import { Languages } from '../model/languages.ts';
import type { Render } from 'astro:content';
import {
  getCanonicalUrlFn,
  getCanonicalUrlForPath,
} from './get-canonical-url.ts';
import { getAbsoluteUrl } from './get-absolute-url.ts';

vi.mock('./get-absolute-url', () => ({
  getAbsoluteUrl: vi.fn((path) => `https://example.com/${path}`),
}));

describe('getCanonicalUrlForPath', async () => {
  it('returns canonical url when entry exists', async () => {
    const result = getCanonicalUrlForPath('de', 'abc');
    expect(result).toBe('https://example.com/de/abc');
    expect(getAbsoluteUrl).toHaveBeenCalledWith('de/abc');
  });
});

describe('getCanonicalUrl', async () => {
  it('should just return fallback when no collection set', async () => {
    const result = await getCanonicalUrlFn('kits')(
      {
        id: 'kit1',
        filePath: 'kitPath.mdx',
        collection: 'kits',
        data: {
          identifier: 'kit1',
          lang: Languages.GERMAN,
          title: 'kit',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
        body: '',
      },
      Languages.KURDISH,
    );
    expect(result).toEqual('https://example.com/ku/kit/kit1/kit');
  });

  it('should calculate url of kits', async () => {
    const result = await getCanonicalUrlFn('kits')(
      {
        id: 'kit1',
        filePath: 'kitPath.mdx',
        collection: 'kits',
        data: {
          identifier: 'kit1',
          lang: Languages.GERMAN,
          title: 'kit',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
        body: '',
      },
      Languages.KURDISH,
    );
    expect(result).toEqual('https://example.com/ku/kit/kit1/kit');
  });

  it('should calculate url of flyers', async () => {
    const result = await getCanonicalUrlFn('flyers')(
      {
        id: 'flyer1',
        filePath: 'flyerPath.mdx',
        collection: 'flyers',
        data: {
          identifier: 'flyer1',
          lang: Languages.FRENCH,
          title: 'flyer',
          lastChecked: new Date('2012-12-12'),
          seo: '',
        },
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
        body: '',
      },
      Languages.TURKISH,
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
        body: '',
      },
      Languages.ENGLISH,
    );
    expect(result).toEqual('https://example.com/en/page/page1/page');
  });
});
