import { describe, expect, it } from 'vitest';
import { render } from '../testing/render.ts';

import '../testing/with-mocked-translation.ts';

import ContentHeading from './ContentHeading.astro';
import { Languages } from '../model/languages.ts';
import type { CollectionEntry } from 'astro:content';

describe('ContentHeading', () => {
  it('should show heading for english flyer', async () => {
    const { getByRole, getByText } = await render(ContentHeading, {
      props: {
        collection: 'flyers',
        entry: {
          data: {
            identifier: 'mock',
            lang: Languages.ENGLISH,
            lastChecked: new Date('2024-03-30'),
            title: 'mockTitle',
            seo: 'mockSeo',
            machineTranslation: true,
          },
        } as CollectionEntry<'kits'>,
        germanTitle: 'germanTitle',
      },
      locals: {
        lang: 'en',
        isPrint: false,
        isKit: false,
        isFlyer: true,
      },
    });

    expect(getByRole('heading', { name: 'mockTitle' })).toBeInTheDocument();
    expect(getByText('germanTitle')).toBeInTheDocument();

    expect(getByText('en-en')).toBeInTheDocument();
    expect(getByText('de-en')).toBeInTheDocument();

    expect(getByText('3/30/2024')).toBeInTheDocument();

    expect(getByRole('button', { name: 'en-share' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'en-copy' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'en-downloadPdf' })).toHaveAttribute(
      'href',
      'http://localhost:4321/print/flyer-en-mock.pdf',
    );
  });

  it('should show heading for german kit', async () => {
    const { getByRole, getByText, queryByRole } = await render(ContentHeading, {
      props: {
        collection: 'kits',
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
        germanTitle: ' germanTitle',
      },
      locals: {
        lang: 'de',
        isPrint: false,
        isKit: true,
        isFlyer: false,
      },
    });

    expect(getByRole('heading', { name: 'mockTitle' })).toBeInTheDocument();

    expect(
      queryByRole('heading', { name: 'germanTitle' }),
    ).not.toBeInTheDocument();

    expect(getByText('de-de')).toBeInTheDocument();

    expect(getByRole('button', { name: 'de-share' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'de-copy' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'de-downloadPdf' })).toHaveAttribute(
      'href',
      'http://localhost:4321/print/kit-de-mock.pdf',
    );
  });

  it('should show heading for arabic page', async () => {
    const { getByRole, getByText, queryByRole } = await render(ContentHeading, {
      props: {
        collection: 'pages',
        entry: {
          data: {
            identifier: 'mock',
            lang: Languages.ARABIC,
            lastChecked: new Date('2024-03-30'),
            title: 'mockTitle',
            seo: 'mockSeo',
            machineTranslation: true,
          },
        } as CollectionEntry<'pages'>,
        germanTitle: 'germanTitle',
      },
      locals: {
        lang: 'ar',
        isPrint: false,
        isKit: false,
        isFlyer: false,
      },
    });

    expect(getByRole('heading', { name: 'mockTitle' })).toBeInTheDocument();
    expect(getByText('germanTitle')).toBeInTheDocument();

    expect(getByText('ar-ar')).toBeInTheDocument();
    expect(getByText('de-ar')).toBeInTheDocument();

    expect(getByText('30‏/3‏/2024')).toBeInTheDocument();

    expect(getByRole('button', { name: 'ar-share' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'ar-copy' })).toBeInTheDocument();
    expect(
      queryByRole('link', { name: 'as-downloadPdf' }),
    ).not.toBeInTheDocument();
  });
});
