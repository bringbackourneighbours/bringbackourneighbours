import { expect, test } from '@playwright/test';

test.describe('pages/link/[slug]', () => {
  test('airplane', async ({ page }) => {
    await page.goto('/link/airplane', { waitUntil: 'commit' });

    await expect(page).toHaveURL('https://m.youtube.com/watch?v=g2Umb7MyDhw');
  });

  test('abgeordnetenwatch', async ({ page }) => {
    await page.goto('/link/abgeordnetenwatch', { waitUntil: 'commit' });

    await expect(page).toHaveURL('https://www.abgeordnetenwatch.de');
  });

  test('videoanhoerung', async ({ page }) => {
    await page.goto('/link/videoanhoerung', { waitUntil: 'commit' });

    await expect(page).toHaveURL('https://www.asylindeutschland.de/de/film-2/');

    await expect(page).toHaveTitle('Asyl in Deutschland – Die Anhörung');
  });

  test('videohearingbs', async ({ page }) => {
    await page.goto('/link/videohearingbs', { waitUntil: 'commit' });

    await expect(page).toHaveURL('https://www.asylindeutschland.de/bs/film-5/');

    await expect(page).toHaveTitle('Azil u Njemačkoj – Saslušanje');
  });
});
