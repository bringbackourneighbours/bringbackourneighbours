import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/page/[identifier]', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/page/contacts', { waitUntil: 'commit' });

    await expect(page).toHaveURL(
      '/de/page/contacts/Kontakte%20zu%20Verantwortlichen%20und%20Unterst%C3%BCtzer*innen',
    );
  });
});
