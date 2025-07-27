import { expect, test } from '@playwright/test';

test.describe('pages/sitemap-paths.xml', () => {
  test('default', async ({ page }) => {
    const response = await page.request.get('/sitemap-paths.xml');

    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toBe('application/xml');

    expect(await response.text()).toContain('http://localhost:4321/ar');
    expect(await response.text()).toContain('http://localhost:4321/ar/flyer');
    expect(await response.text()).toContain('http://localhost:4321/ar/kit');
    expect(await response.text()).toContain('http://localhost:4321/ar/wizard');
    expect(await response.text()).toContain('http://localhost:4321/de');
    expect(await response.text()).toContain('http://localhost:4321/de/flyer');
    expect(await response.text()).toContain('http://localhost:4321/de/kit');
    expect(await response.text()).toContain('http://localhost:4321/de/wizard');
    expect(await response.text()).toContain('http://localhost:4321/en');
    expect(await response.text()).toContain('http://localhost:4321/en/flyer');
    expect(await response.text()).toContain('http://localhost:4321/en/kit');
    expect(await response.text()).toContain('http://localhost:4321/en/wizard');
    expect(await response.text()).toContain('http://localhost:4321/es');
    expect(await response.text()).toContain('http://localhost:4321/es/flyer');
    expect(await response.text()).toContain('http://localhost:4321/es/kit');
    expect(await response.text()).toContain('http://localhost:4321/es/wizard');
    expect(await response.text()).toContain('http://localhost:4321/fr');
    expect(await response.text()).toContain('http://localhost:4321/fr/flyer');
    expect(await response.text()).toContain('http://localhost:4321/fr/kit');
    expect(await response.text()).toContain('http://localhost:4321/fr/wizard');
  });
});
