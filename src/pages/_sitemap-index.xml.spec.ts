import { expect, test } from '@playwright/test';

test.describe('pages/sitemap-index.xml', () => {
  test('default', async ({ page }) => {
    await page.goto('/sitemap-index.xml');

    await expect(page.locator('body')).toContainText('sitemap-collections.xml');
    await expect(page.locator('body')).toContainText('sitemap-paths.xml');
    await expect(page.locator('body')).toContainText('sitemap-paths.xml');
    await expect(page.locator('body')).toContainText('sitemap-pdfs.xml');
  });
});
