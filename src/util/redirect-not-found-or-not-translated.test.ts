import { describe, expect, it } from 'vitest';
import {
  redirectNotTranslatedForFlyer,
  redirectNotTranslatedForKit,
} from './redirect-not-found-or-not-translated.ts';
import { Languages } from '../model/languages.ts';
import type { Render } from 'astro:content';

describe('redirectNotTranslated', () => {
  it('return false when no fallback ', async () => {
    const result = await redirectNotTranslatedForFlyer({
      data: {
        identifier: 'test',
        fallback: undefined,
        lastChecked: new Date(),
        lang: Languages.ARABIC,
        title: '',
        seo: '',
      },
      id: '',
      render: function (): Render['.md'] {
        throw new Error('Function not implemented.');
      },
      slug: '',
      body: '',
      collection: 'flyers',
    });

    expect(result).toBe(false);
  });

  it('return data when fallback ', async () => {
    const result = await redirectNotTranslatedForKit({
      data: {
        identifier: 'test',
        fallback: Languages.KURDISH,
        lastChecked: new Date(),
        lang: Languages.ARABIC,
        title: '',
        seo: '',
      },
      id: '',
      render: function (): Render['.md'] {
        throw new Error('Function not implemented.');
      },
      slug: '',
      body: '',
      collection: 'kits',
    });

    expect(result).toEqual({
      status: 302,
      url: 'http://localhost:4321/ar/kit/test/',
    });
  });
});
