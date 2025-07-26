import { expect, test } from '@playwright/test';

test.describe('pages/index', () => {
  test('default', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('body')).toMatchAriaSnapshot(`
- banner:
  - link "Bring Back Our Neighbours":
    - /url: http://localhost:4321/de
- main:
  - navigation:
    - button "Deutsch"
  - link "هل أنت أو أي شخص آخر معرض لخطر الترحيل؟":
    - /url: http://localhost:4321/ar/wizard
  - link "Are you or someone else at risk of deportation?":
    - /url: http://localhost:4321/en/wizard
  - link "Bist du oder wer anders von einer Abschiebung bedroht?":
    - /url: http://localhost:4321/de/wizard
  - link "Êtes-vous ou quelqu'un d'autre menacé d'expulsion?":
    - /url: http://localhost:4321/fr/wizard
  - link "¿Está usted o alguien más en riesgo de deportación?":
    - /url: http://localhost:4321/es/wizard
  - link "Alle Flyer→":
    - /url: http://localhost:4321/de/flyer
  - link "Kontakte zu Verantwortlichen & Unterstützer*innen→":
    - /url: http://localhost:4321/de/page/contacts/Kontakte%20zu%20Verantwortlichen%20und%20Unterst%C3%BCtzer*innen
  - link "Tipps für Öffentlichkeitsarbeit→":
    - /url: http://localhost:4321/de/page/publicity/%C3%96ffentlichkeit%20schaffen%20und%20Unterst%C3%BCtzung%20gewinnen
  - link "Hinweise für Fachkräfte der Sozialen Arbeit→":
    - /url: http://localhost:4321/de/page/professionals/Hinweise%20f%C3%BCr%20Fachkr%C3%A4fte%20der%20Sozialen%20Arbeit
  - link "Vorlagen und Formulare zum Ausdrucken→":
    - /url: http://localhost:4321/de/page/forms/Vorlagen%20zum%20Ausdrucken
  - link "Alle Materialien zum Ausdrucken→":
    - /url: http://localhost:4321/de/page/material/Alle%20Materialien%20zum%20Ausdrucken
`);
  });
});
