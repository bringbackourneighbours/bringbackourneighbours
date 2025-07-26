import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/page', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/page');

    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - banner:
        - link:
          - /url: http://localhost:4321/de
          - img
        - link "Bring Back Our Neighbours":
          - /url: http://localhost:4321/de
        - img
      - main:
        - heading "غير موجود" [level=1]
        - paragraph: تعذر العثور على المحتوى. من المحتمل أن يكون الرابط قديم أو به خطأ مطبعي.
        - heading "Not found" [level=1]
        - paragraph: The content could not be found. The link is probably out of date or had a typo.
        - heading "Nicht gefunden" [level=1]
        - paragraph: Der Inhalt konnte nicht gefunden werden. Vermutlich ist der Link veraltet oder hatte einen Tippfehler.
        - heading "Non trouvé" [level=1]
        - paragraph: Le contenu n'a pas pu être trouvé. Le lien est probablement obsolète ou comportait une faute de frappe
        - heading "No encontrado" [level=1]
        - paragraph: No se ha podido encontrar el contenido. Es probable que el enlace no esté actualizado o contenga un error tipográfico
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
    `);
  });
  test('en', async ({ page }) => {
    await page.goto('/en/page');

    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - banner:
        - link:
          - /url: http://localhost:4321/de
          - img
        - link "Bring Back Our Neighbours":
          - /url: http://localhost:4321/de
        - img
      - main:
        - heading "غير موجود" [level=1]
        - paragraph: تعذر العثور على المحتوى. من المحتمل أن يكون الرابط قديم أو به خطأ مطبعي.
        - heading "Not found" [level=1]
        - paragraph: The content could not be found. The link is probably out of date or had a typo.
        - heading "Nicht gefunden" [level=1]
        - paragraph: Der Inhalt konnte nicht gefunden werden. Vermutlich ist der Link veraltet oder hatte einen Tippfehler.
        - heading "Non trouvé" [level=1]
        - paragraph: Le contenu n'a pas pu être trouvé. Le lien est probablement obsolète ou comportait une faute de frappe
        - heading "No encontrado" [level=1]
        - paragraph: No se ha podido encontrar el contenido. Es probable que el enlace no esté actualizado o contenga un error tipográfico
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
    `);
  });
});
