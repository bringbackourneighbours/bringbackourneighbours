import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/kit/[identifier]', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/kit/affected', { waitUntil: 'commit' });

    await expect(page).toHaveURL(
      '/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene',
    );
  });
});
