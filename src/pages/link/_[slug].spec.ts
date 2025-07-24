import { expect, test } from '@playwright/test';

test.describe('pages/link/[slug]', () => {
  test('airplane', async ({ page }) => {
    await page.goto('/link/airplane');

    await expect(page).toHaveURL('https://www.youtube.com/watch?v=g2Umb7MyDhw');
    // loading youtube is quite expensive

    await expect(
      page.getByRole('heading', {
        name: 'How to Stop a Deportation كيفية إيقاف الترحيل داخل الطائرة',
      }),
    ).toBeVisible();
  });

  test('abgeordnetenwatch', async ({ page }) => {
    await page.goto('/link/abgeordnetenwatch');

    await expect(page).toHaveURL('https://www.abgeordnetenwatch.de');
  });

  test('videoanhoerung', async ({ page }) => {
    await page.goto('/link/videoanhoerung');

    await expect(page).toHaveURL('https://www.asylindeutschland.de/de/film-2/');

    await expect(page).toHaveTitle('Asyl in Deutschland – Die Anhörung');
  });

  test('videohearingbs', async ({ page }) => {
    await page.goto('/link/videohearingbs');

    await expect(page).toHaveURL('https://www.asylindeutschland.de/bs/film-5/');

    await expect(page).toHaveTitle('Azil u Njemačkoj – Saslušanje');
  });
});
