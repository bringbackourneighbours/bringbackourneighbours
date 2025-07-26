import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/flyer/[identifier]/[title]', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/flyer/dublin/Dublin');

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
  - heading "Dublin"
  - paragraph:
      - text: "Deutsch – Zuletzt aktualisiert:"
      - time: /8\\.\\d+\\.\\d+/
  - button "Teilen"
  - button "Text kopieren"
  - link "Download PDF":
    - /url: http://localhost:4321/print/flyer-de-dublin.pdf
  - strong: "Welcome to Europe!"
  - link "w2eu.info":
    - /url: https://w2eu.info
`);
  });
});
