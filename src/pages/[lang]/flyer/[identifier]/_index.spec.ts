import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/flyer/[identifier]', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/flyer/dublin', { waitUntil: 'commit' });

    await expect(page).toHaveURL('/de/flyer/dublin/Dublin');
  });
});
