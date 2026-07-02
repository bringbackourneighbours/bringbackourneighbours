import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render';

import '../../testing/with-mocked-translation';

import PdfLinks from './PdfLinks.astro';
import { SupportedLanguages } from '../../model/languages';

describe('PdfLinks', () => {
  it('should show links to flyers', async () => {
    const { getAllByRole, getByRole } = await render(PdfLinks, {
      props: {
        collection: 'flyers',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(getAllByRole('link').length).toBe(SupportedLanguages.length + 1);
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-ar)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-en)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-es)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-de)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-fr)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'de-downloadAllFlyerPdf (de-ku)' }),
    ).toBeInTheDocument();
  });

  it('should show links to kit', async () => {
    const { getAllByRole, getByRole } = await render(PdfLinks, {
      props: {
        collection: 'kits',
        identifier: 'suppors',
      },
      locals: {
        lang: 'en',
      } as App.Locals,
    });

    expect(getAllByRole('link').length).toBe(SupportedLanguages.length + 1);
    expect(getByRole('link', { name: 'en-downloadPdf' })).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-ar)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-en)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-es)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-de)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-fr)' }),
    ).toBeInTheDocument();
    expect(
      getByRole('link', { name: 'en-downloadPdf (en-ku)' }),
    ).toBeInTheDocument();
  });
});
