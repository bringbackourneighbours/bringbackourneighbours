import type { CollectionEntry } from 'astro:content';

import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render';
import { Languages } from '../../model/languages';

import '../../testing/with-mocked-translation';

import ContentMeta from './ContentMeta.astro';

describe('ContentMeta', () => {
  it('should show language and date in matching lang and defaultlang', async () => {
    const { getByText } = await render(ContentMeta, {
      props: {
        entry: {
          data: {
            lang: Languages.ENGLISH,
            lastChecked: new Date('2024-03-30'),
          },
        } as CollectionEntry<'flyers'>,
      },
      locals: {
        lang: 'en',
        isPrint: false,
        isKit: false,
        isFlyer: true,
        isZine: false,
      },
    });

    expect(getByText('en-en')).toBeInTheDocument();
    expect(getByText('de-en')).toBeInTheDocument();

    expect(getByText('3/30/2024')).toBeInTheDocument();
  });

  it('should show language and date in other lang and default lang', async () => {
    const { getByText } = await render(ContentMeta, {
      props: {
        entry: {
          data: {
            lang: Languages.FRENCH,
            lastChecked: new Date('2024-03-30'),
          },
        } as CollectionEntry<'kits'>,
      },
      locals: {
        lang: 'ku',
        isPrint: false,
        isKit: true,
        isFlyer: false,
        isZine: false,
      },
    });

    expect(getByText('fr-fr')).toBeInTheDocument();
    expect(getByText('de-fr')).toBeInTheDocument();

    expect(getByText('30/03/2024')).toBeInTheDocument();
  });

  it('should show language and date in current lang and default lang when no fallback', async () => {
    const { getByText } = await render(ContentMeta, {
      props: {
        entry: {
          data: {
            lang: Languages.SPANISH,
            lastChecked: new Date('2024-03-30'),
          },
        } as CollectionEntry<'pages'>,
        lang: 'ka',
      },
      locals: {
        lang: 'ka',
        isPrint: false,
        isKit: true,
        isFlyer: false,
        isZine: false,
      },
    });

    expect(getByText('es-es')).toBeInTheDocument();
    expect(getByText('de-es')).toBeInTheDocument();

    expect(getByText('30.3.2024')).toBeInTheDocument();
  });

  it('should show language and date in current lang when fallback', async () => {
    const { getByText } = await render(ContentMeta, {
      props: {
        entry: {
          data: {
            lang: Languages.TURKISH,
            lastChecked: new Date('2024-03-30'),
          },
        } as CollectionEntry<'pages'>,
        lang: 'ku',
        isFallback: true,
      },
      locals: {
        lang: 'ku',
        isPrint: false,
        isKit: true,
        isFlyer: false,
        isZine: false,
      },
    });

    expect(getByText('tr-tr')).toBeInTheDocument();
    expect(getByText('ku-tr')).toBeInTheDocument();

    expect(getByText('30.03.2024')).toBeInTheDocument();
  });
});
