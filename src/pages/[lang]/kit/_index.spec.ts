import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/kit', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/kit');

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
          - button "Deutsch":
            - img
        - heading "Alle Notfallkoffer:" [level=2]
        - link "Notfallkoffer gegen Abschiebungen für Betroffene":
          - /url: http://localhost:4321/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene
        - link "Notfallkoffer gegen Abschiebungen für Unterstützer*innen":
          - /url: http://localhost:4321/de/kit/support/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Unterst%C3%BCtzer*innen
        - heading "Weitere Informationen:" [level=2]
        - link "Alle Flyer→":
          - /url: http://localhost:4321/de/flyer
          - paragraph: Alle Flyer→
        - link "Kontakte zu Verantwortlichen & Unterstützer*innen→":
          - /url: http://localhost:4321/de/page/contacts/Kontakte%20zu%20Verantwortlichen%20und%20Unterst%C3%BCtzer*innen
          - paragraph: Kontakte zu Verantwortlichen & Unterstützer*innen→
        - link "Tipps für Öffentlichkeitsarbeit→":
          - /url: http://localhost:4321/de/page/publicity/%C3%96ffentlichkeit%20schaffen%20und%20Unterst%C3%BCtzung%20gewinnen
          - paragraph: Tipps für Öffentlichkeitsarbeit→
        - link "Hinweise für Fachkräfte der Sozialen Arbeit→":
          - /url: http://localhost:4321/de/page/professionals/Hinweise%20f%C3%BCr%20Fachkr%C3%A4fte%20der%20Sozialen%20Arbeit
          - paragraph: Hinweise für Fachkräfte der Sozialen Arbeit→
        - link "Vorlagen und Formulare zum Ausdrucken→":
          - /url: http://localhost:4321/de/page/forms/Vorlagen%20zum%20Ausdrucken
          - paragraph: Vorlagen und Formulare zum Ausdrucken→
        - link "Alle Materialien zum Ausdrucken→":
          - /url: http://localhost:4321/de/page/material/Alle%20Materialien%20zum%20Ausdrucken
          - paragraph: Alle Materialien zum Ausdrucken→
    `);
  });
  test('en', async ({ page }) => {
    await page.goto('/en/kit');

    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - banner:
        - link:
          - /url: http://localhost:4321/en
          - img
        - link "Bring Back Our Neighbours":
          - /url: http://localhost:4321/en
        - img
      - main:
        - navigation:
          - button "english":
            - img
        - heading "All emergency kits:" [level=2]
        - link "Emergency Kit against deportations for people threatened with deportation":
          - /url: http://localhost:4321/en/kit/affected/Emergency%20Kit%20against%20deportations%20for%20people%20threatened%20with%20deportation
        - link "Emergency Kit against deportations for supporters":
          - /url: http://localhost:4321/en/kit/support/Emergency%20Kit%20against%20deportations%20for%20supporters
        - heading "More Information:" [level=2]
        - link "All flyers→":
          - /url: http://localhost:4321/en/flyer
          - paragraph: All flyers→
        - link "Contacts to responsible persons & supporters→":
          - /url: http://localhost:4321/en/page/contacts/Contacts%20to%20responsible%20persons%20%26%20supporters
          - paragraph: Contacts to responsible persons & supporters→
        - link "Tips for public relations work→":
          - /url: http://localhost:4321/en/page/publicity/Creating%20publicity%20and%20gaining%20support
          - paragraph: Tips for public relations work→
        - link "Notes for social work professionals→":
          - /url: http://localhost:4321/en/page/professionals/Notes%20for%20social%20work%20professionals
          - paragraph: Notes for social work professionals→
        - link "Templates and forms to print out→":
          - /url: http://localhost:4321/en/page/forms/Templates%20for%20printing
          - paragraph: Templates and forms to print out→
        - link "All materials for printing→":
          - /url: http://localhost:4321/en/page/material/All%20materials%20for%20printing
          - paragraph: All materials for printing→
    `);
  });
});
