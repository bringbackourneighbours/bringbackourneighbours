import { describe, expect, it } from 'vitest';
import { getTranslationsUrls } from './get-translations-url.ts';
import type { CollectionEntry } from 'astro:content';
import { Languages, type LanguagesValue } from '../model/languages.ts';

describe('getTranslationsUrls', () => {
  const mockEntriesData: CollectionEntry<'flyers'>['data'][] = [
    {
      identifier: 'aaa',
      lang: 'de',
    },
    {
      identifier: 'bbb',
      lang: 'de',
    },
    {
      identifier: 'ccc',
      lang: 'de',
    },
    {
      identifier: 'aaa',
      lang: 'en',
    },
    {
      identifier: 'bbb',
      lang: 'en',
    },
    {
      identifier: 'ccc',
      lang: 'en',
    },
    {
      identifier: 'xxx',
      lang: 'fr',
    },
    {
      identifier: 'yyy',
      lang: 'fr',
    },
    {
      identifier: 'zzz',
      lang: 'fr',
    },
    {
      identifier: 'aaa',
      lang: 'ti',
    },
    {
      identifier: 'bbb',
      lang: 'ti',
    },
  ] as CollectionEntry<'flyers'>['data'][];

  it('return all other supported langs and urls', async () => {
    expect(
      await getTranslationsUrls(
        mockEntriesData.map((data) => ({ data }) as CollectionEntry<'flyers'>),
        Languages.GERMAN,
        'aaa',
        (lang: LanguagesValue, identifier: string) =>
          Promise.resolve(`${lang}-${identifier}`),
      ),
    ).toEqual([{ lang: 'en', url: 'en-aaa' }]);
  });

  it('return nothing', async () => {
    expect(
      await getTranslationsUrls(
        mockEntriesData.map((data) => ({ data }) as CollectionEntry<'flyers'>),
        Languages.GERMAN,
        'nono',
        (lang: LanguagesValue, identifier: string) =>
          Promise.resolve(`${lang}-${identifier}`),
      ),
    ).toEqual([]);
  });
});
