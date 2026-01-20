import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import PdfLink from './PdfLink.astro';

describe('PdfLink', () => {
  it('should show link to flyer with label set via slot', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'en',
        collection: 'flyers',
        identifier: 'test-flyer',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
      slots: { default: 'my flyer' },
    });

    expect(getByRole('link', { name: 'my flyer (de-en)' })).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/flyer-en-test-flyer.pdf',
    );
    expect(getByRole('link')).toHaveAttribute('hreflang', 'en');
  });

  it('should show link to flyer in local lang', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'en',
        collection: 'flyers',
        identifier: 'test-flyer',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(
      getByRole('link', { name: 'de-downloadPdf (de-en)' }),
    ).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/flyer-en-test-flyer.pdf',
    );
    expect(getByRole('link')).toHaveAttribute('hreflang', 'en');
  });

  it('should show link to kit in local lang', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'fr',
        collection: 'kits',
        identifier: 'test-kit',
      },
      locals: {
        lang: 'ar',
      } as App.Locals,
    });

    expect(
      getByRole('link', { name: 'ar-downloadPdf (ar-fr)' }),
    ).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/kit-fr-test-kit.pdf',
    );
    expect(getByRole('link')).toHaveAttribute('hreflang', 'fr');
  });
  it('should show link to page in local lang', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'fa',
        collection: 'pages',
        identifier: 'test-page',
      },
      locals: {
        lang: 'ku',
      } as App.Locals,
    });

    expect(
      getByRole('link', { name: 'ku-downloadPdf (ku-fa)' }),
    ).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/page-fa-test-page.pdf',
    );
    expect(getByRole('link')).toHaveAttribute('hreflang', 'fa');
  });

  it('should show link to all flyers in lang', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'es',
        collection: 'flyers',
        identifier: 'all',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(
      getByRole('link', { name: 'de-downloadAllPdf (de-es)' }),
    ).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/all-flyer-es.pdf',
    );
    expect(getByRole('link')).toHaveAttribute('hreflang', 'es');
  });

  it('should show link to all flyers in all langs', async () => {
    const { getByRole } = await render(PdfLink, {
      props: {
        lang: 'all',
        collection: 'flyers',
        identifier: 'all',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(
      getByRole('link', { name: 'de-downloadAllPdf' }),
    ).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute(
      'href',
      'http://localhost:4321/print/all-flyer-all.pdf',
    );
  });
});
