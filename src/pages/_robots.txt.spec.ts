import { expect, test } from '@playwright/test';

test.describe('pages/robots.txt', () => {
  test('default', async ({ page }) => {
    await page.goto('/robots.txt');

    await expect(page.locator('body')).toContainText('User-agent: *');
    await expect(page.locator('body')).toContainText('Allow: /');
    await expect(page.locator('body')).toContainText(
      ' Sitemap: http://localhost:4321/sitemap-index.xml',
    );
  });
});
