import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/kit/[identifier]/[title]', () => {
  test('/de/kit/affected/Notfallkoffer...', async ({ page }) => {
    await page.goto(
      '/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene',
    );

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
  - heading "Notfallkoffer gegen Abschiebungen für Betroffene"
  - paragraph:
      - text: "Deutsch – Zuletzt aktualisiert:"
      - time: /8\\.\\d+\\.\\d+/
  - button "Teilen"
  - button "Text kopieren"
  - link "Download PDF":
    - /url: http://localhost:4321/print/kit-de-affected.pdf
`);
  });
});
