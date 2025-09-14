import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';
import { Languages } from '../../util/languages.ts';

import '../../testing/with-mocked-translation.ts';

import PrintCover from './PrintCover.astro';

describe('PrintCover', () => {
  it('should show all the data', async () => {
    const { getByRole, getByText, getAllByText } = await render(PrintCover, {
      props: {
        entry: {
          data: {
            identifier: 'mock',
            lang: Languages.ENGLISH,
            lastChecked: new Date('2024-03-30'),
            title: 'mockTitle',
            seo: 'mockSeo',
            machineTranslation: true,
          },
        } as CollectionEntry<'flyers'>,
        germanTitle: 'germanTitle',
        pagewidth: '105mm',
        pagemargin: '10mm',
      },
    });

    expect(getByRole('heading', { name: 'mockTitle' })).toBeInTheDocument();
    expect(getByRole('heading', { name: 'germanTitle' })).toBeInTheDocument();
    expect(getByRole('heading', { name: 'en-title' })).toBeInTheDocument();
    expect(getAllByText('en-subtitle')).toBeTruthy();

    expect(getByText('en-en')).toBeInTheDocument();
    expect(getByText('de-en')).toBeInTheDocument();

    expect(getByText('en-machineTranslation')).toBeInTheDocument();
  });

  it('should show not show everything in german', async () => {
    const { getByRole, getByText, queryByRole, queryByText, getAllByText } =
      await render(PrintCover, {
        props: {
          entry: {
            data: {
              identifier: 'mock',
              lang: Languages.GERMAN,
              lastChecked: new Date('2024-03-30'),
              title: 'mockTitle',
              seo: 'mockSeo',
              machineTranslation: false,
            },
          } as CollectionEntry<'kits'>,
          germanTitle: 'germanTitle',
        },
      });

    expect(getByRole('heading', { name: 'mockTitle' })).toBeInTheDocument();
    expect(getByRole('heading', { name: 'de-title' })).toBeInTheDocument();
    expect(getAllByText('de-subtitle')).toBeTruthy();

    expect(
      queryByRole('heading', { name: 'germanTitle' }),
    ).not.toBeInTheDocument();

    expect(getByText('de-de')).toBeInTheDocument();

    expect(queryByText(/en-machineTranslatino/)).not.toBeInTheDocument();
  });
});
