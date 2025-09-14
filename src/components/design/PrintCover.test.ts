import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import PrintCover from './PrintCover.astro';
import { Languages } from '../../util/languages.ts';
import type { CollectionEntry } from 'astro:content';

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
    expect(
      getByRole('heading', { name: 'Bring Back Our Neighbours' }),
    ).toBeInTheDocument();
    expect(
      getAllByText('Against the Saxonian deportation policy'),
    ).toBeTruthy();

    expect(getByText('english')).toBeInTheDocument();
    expect(getByText('Englisch')).toBeInTheDocument();

    expect(getByText(/translated using AI/)).toBeInTheDocument();
    expect(getByText(/info@bringbackourneighbours.de/)).toBeInTheDocument();
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
    expect(
      getByRole('heading', { name: 'Bring Back Our Neighbours' }),
    ).toBeInTheDocument();
    expect(
      getAllByText(
        'Gemeinsam solidarisch gegen die sächsische Abschiebepolitik',
      ),
    ).toBeTruthy();

    expect(
      queryByRole('heading', { name: 'germanTitle' }),
    ).not.toBeInTheDocument();

    expect(getByText('Deutsch')).toBeInTheDocument();

    expect(queryByText(/mit KI übersetzt/)).not.toBeInTheDocument();
    expect(
      queryByText(/info@bringbackourneighbours.de/),
    ).not.toBeInTheDocument();
  });
});
