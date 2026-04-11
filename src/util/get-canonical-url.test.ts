import { describe, expect, it, vi } from 'vitest';
import { Languages } from '../model/languages.ts';
import type { CollectionEntry, Render } from 'astro:content';
import {
  getCanonicalUrlFn,
  getCanonicalUrlForPath,
} from './get-canonical-url.ts';
import type { StandaloneCollections } from '../model/standalone-collections.ts';

vi.mock('../../astro.config.mjs', () => ({
  default: {
    site: 'https://example.com/',
  },
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
    expect(() =>
      getCanonicalUrlFn('mock' as StandaloneCollections),
    ).toThrowError();
  });

  it('should throw when no entry', async () => {
    await expect(() =>
      getCanonicalUrlFn('kits')(
        undefined as unknown as CollectionEntry<'kits'>,
        'fa',
        true,
      ),
    ).rejects.toThrowError();
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
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
        render: function (): Render['.md'] {
          throw new Error('Function not implemented.');
        },
        slug: '',
        body: '',
      },
      Languages.ENGLISH,
      true,
    );
    expect(result).toEqual('https://example.com/en/page/page1/page');
  });
});

// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { Languages } from '../model/languages';
// import type { Render } from 'astro:content';
// import {
//   getCanonicalUrl,
//   getCanonicalUrlFn,
//   getCanonicalUrlForPath,
// } from './get-canonical-url';
//
// vi.mock('../../astro.config.mjs', () => ({
//   default: {
//     site: 'https://example.com/',
//   },
// }));
//
// describe('get-canonical-url', async () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//
//   describe('getCanonicalUrl', async () => {
//     it('returns canonical url when entry exists', async () => {
//       const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
//       expect(result).toBe('/de/flyer/abc/Test%20Title');
//     });
//
//     it('returns absolute canonical url when entry exists', async () => {
//       const result = await getCanonicalUrl(
//         'flyers',
//         'flyer',
//         'de',
//         'abc',
//         true,
//       );
//       expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
//       expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
//     });
//
//     it('returns undefined when entry does not exist', async () => {
//       vi.mocked(getEntry).mockResolvedValueOnce(undefined);
//       const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
//       expect(result).toBeUndefined();
//     });
//   });
//
//   describe('getCanonicalUrlToFlyer', async () => {
//     it('returns absolute canonical url when entry exists', async () => {
//       const result = await getCanonicalUrlToFlyer('de', 'abc', true);
//       expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
//       expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
//     });
//
//     it('returns undefined when entry does not exist', async () => {
//       vi.mocked(getEntry).mockResolvedValueOnce(undefined);
//       const result = await getCanonicalUrlToFlyer('de', 'abc');
//       expect(result).toBeUndefined();
//     });
//   });
//
//   describe('getCanonicalUrlToKit', async () => {
//     it('returns absolute canonical url when entry exists', async () => {
//       const result = await getCanonicalUrlToKit('de', 'abc', true);
//       expect(result).toBe('https://example.com/de/kit/abc/Test%20Title');
//       expect(getEntry).toHaveBeenCalledWith('kits', 'abc/de');
//     });
//
//     it('returns undefined when entry does not exist', async () => {
//       vi.mocked(getEntry).mockResolvedValueOnce(undefined);
//       const result = await getCanonicalUrlToKit('de', 'abc');
//       expect(result).toBeUndefined();
//     });
//   });
//
//   describe('getCanonicalUrlToPage', async () => {
//     it('returns  absolute canonical url when entry exists', async () => {
//       const result = await getCanonicalUrlToPage('de', 'abc', true);
//       expect(result).toBe('https://example.com/de/page/abc/Test%20Title');
//       expect(getEntry).toHaveBeenCalledWith('pages', 'abc/de');
//     });
//
//     it('returns undefined when entry does not exist', async () => {
//       vi.mocked(getEntry).mockResolvedValueOnce(undefined);
//       const result = await getCanonicalUrlToPage('de', 'abc');
//       expect(result).toBeUndefined();
//     });
//   });
//
//   describe('getCanonicalUrlForPath', async () => {
//     it('returns absolute canonical url when entry exists', async () => {
//       const result = getCanonicalUrlForPath('de', 'abc', true);
//       expect(result).toBe('https://example.com/de/abc');
//     });
//     it('returns canonical url when entry exists', async () => {
//       const result = getCanonicalUrlForPath('de', 'abc');
//       expect(result).toBe('/de/abc');
//     });
//   });
//
//   it('should calculate url of kits', async () => {
//     const result = await getCanonicalUrlFn('kits')(
//       {
//         id: 'kit1',
//         filePath: 'kitPath.mdx',
//         collection: 'kits',
//         data: {
//           identifier: 'kit1',
//           lang: Languages.GERMAN,
//           title: 'kit',
//           lastChecked: new Date('2012-12-12'),
//           seo: '',
//         },
//         render: function (): Render['.md'] {
//           throw new Error('Function not implemented.');
//         },
//         slug: '',
//         body: '',
//       },
//       Languages.KURDISH,
//     );
//     expect(result).toEqual('https://example.com/ku/kit/kit1/kit');
//   });
//
// });
