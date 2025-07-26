import { expect, test } from '@playwright/test';

test.describe('pages/sitemap-collections.xml', () => {
  test('default', async ({ page }) => {
    const response = await page.request.get('/sitemap-collections.xml');

    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toBe('application/xml');

    expect(await response.text()).toContain(
      'http://localhost:4321/ar/kit/affected',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/de/kit/affected',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/en/kit/affected',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/fr/kit/affected',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/es/kit/affected',
    );

    expect(await response.text()).toContain(
      'http://localhost:4321/ar/flyer/detention',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/en/flyer/dublin',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/de/flyer/decision',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/fr/flyer/ongoing-deportation',
    );
    expect(await response.text()).toContain(
      'http://localhost:4321/es/flyer/prepare-deportation',
    );
  });
});
