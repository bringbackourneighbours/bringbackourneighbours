import { expect, test } from '@playwright/test';

test.describe('pages/sitemap-pdfs.xml', () => {
  test('default', async ({ page }) => {
    const response = await page.request.get('/sitemap-pdfs.xml');

    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toBe('application/xml');
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-ar-affected.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-de-affected.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-en-affected.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-fr-affected.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-es-affected.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-ar-support.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-de-support.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-en-support.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-fr-support.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/kit-es-support.pdf',
    );

    expect(await response.text()).toContain(
      'http://localhost:4321/print/flyer-ar-decision.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/flyer-de-detention.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/flyer-en-dublin.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/flyer-es-ongoing-deportation.pdf',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/print/flyer-fr-prepare-deportation.pdf',
    );
  });
});
