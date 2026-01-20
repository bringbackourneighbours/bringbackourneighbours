import { expect, test } from '@playwright/test';

test('pages/404', async ({ page }) => {
  await page.goto('/404');

  await expect(page.locator('body')).toMatchAriaSnapshot(`
- banner:
  - /children: contain
  - link "Bring Back Our Neighbours":
    - /url: http://localhost:4321/de
- main:
  - heading "غير موجود" [level=1]
  - heading "Not found" [level=1]
  - heading "Nicht gefunden" [level=1]
  - heading "Non trouvé" [level=1]
  - heading "No encontrado" [level=1]
  - link:
    - /url: http://localhost:4321/ar/wizard
  - link:
    - /url: http://localhost:4321/en/wizard
  - link:
    - /url: http://localhost:4321/de/wizard
  - link:
    - /url: http://localhost:4321/fr/wizard
  - link:
    - /url: http://localhost:4321/es/wizard
  `);
});
