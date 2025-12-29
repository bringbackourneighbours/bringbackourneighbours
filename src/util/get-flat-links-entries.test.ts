import { describe, expect, it } from 'vitest';
import { getFlatLinksEntries } from './get-flat-links-entries.ts';
import { Languages } from '../model/languages.ts';
import type { Render } from 'astro:content';

describe('getFlatLinksEntries', async () => {
  it('return on empty', async () => {
    const result = await getFlatLinksEntries([], [], [], []);
    expect(result).toEqual([]);
  });

  it('should reduce the entries', async () => {
    const result = await getFlatLinksEntries(
      [
        {
          id: 'id1',
          filePath: 'filePath1.yml',
          collection: 'links',
          data: {
            all: {
              type: 'AUDIO',
            },
            de: {
              slug: 'slugde',
              url: 'example.de',
            },
            en: {
              slug: 'slugen',
              url: 'example.com',
            },
          },
        },
      ],
      [
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
      ],
      [
        {
          id: 'kit1',
          filePath: 'kitPath.mdx',
          collection: 'kits',
          data: {
            identifier: 'kit1',
            lang: Languages.KURDISH,
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
      ],
      [
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
      ],
    );
    expect(result).toEqual([
      {
        filePath: 'filePath1.yml',
        lastChecked: undefined,
        noCheckUntil: undefined,
        slug: 'slugde',
        url: 'example.de',
      },
      {
        filePath: 'filePath1.yml',
        lastChecked: undefined,
        noCheckUntil: undefined,
        slug: 'slugen',
        url: 'example.com',
      },
      {
        identifier: 'flyer1',
        lang: 'fr',
        slug: 'flyer-fr-flyer1',
        title: 'flyer',
        type: 'FLYER',
        url: 'http://localhost:4321/fr/flyer/flyer1/flyer',
      },
      {
        identifier: 'kit1',
        lang: 'ku',
        slug: 'kit-ku-kit1',
        title: 'kit',
        type: 'KIT',
        url: 'http://localhost:4321/ku/kit/kit1/kit',
      },
      {
        identifier: 'page1',
        lang: 'en',
        slug: 'page-en-page1',
        title: 'page',
        type: 'PAGE',
        url: 'http://localhost:4321/en/page/page1/page',
      },
    ]);
  });
});
