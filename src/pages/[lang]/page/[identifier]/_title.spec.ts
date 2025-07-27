import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/page/[identifier]/[title]', () => {
  test('de/page/forms/Vorlagen...', async ({ page }) => {
    await page.goto('de/page/forms/Vorlagen%20zum%20Ausdrucken');

    await expect(page.locator('body')).toMatchAriaSnapshot(`
- banner:
  - link:
    - /url: http://localhost:4321/de
    - img
  - link "Bring Back Our Neighbours":
    - /url: http://localhost:4321/de
  - img
- main:
  - navigation:
    - button "Deutsch"
  - heading "Vorlagen zum Ausdrucken"
  - paragraph:
      - text: "Deutsch – Zuletzt aktualisiert:"
      - time: /8\\.\\d+\\.\\d+/
  - button "Teilen"
  - button "Text kopieren"
`);
  });
});
