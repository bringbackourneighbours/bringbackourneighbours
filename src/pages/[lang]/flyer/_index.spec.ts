import { expect, test } from '@playwright/test';

test.describe('pages/[lang]/flyer', () => {
  test('de', async ({ page }) => {
    await page.goto('/de/flyer');

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
        - heading "Alle Flyer:" [level=2]
        - link "Negative Entscheidungen im Asylverfahren":
          - /url: http://localhost:4321/de/flyer/decision/Negative%20Entscheidungen%20im%20Asylverfahren
        - link "Abschiebehaft":
          - /url: http://localhost:4321/de/flyer/detention/Abschiebehaft
        - link "Dublin":
          - /url: http://localhost:4321/de/flyer/dublin/Dublin
        - link "Laufende Abschiebung":
          - /url: http://localhost:4321/de/flyer/ongoing-deportation/Laufende%20Abschiebung
        - link "Vorbereitung auf eine Abschiebung":
          - /url: http://localhost:4321/de/flyer/prepare-deportation/Vorbereitung%20auf%20eine%20Abschiebung
        - link "Polizei und Abschiebungen":
          - /url: http://localhost:4321/de/flyer/police/Polizei%20und%20Abschiebungen
        - link "Abschiebung verhindern":
          - /url: http://localhost:4321/de/flyer/prevent-deportation/Abschiebung%20verhindern
        - link "Duldung":
          - /url: http://localhost:4321/de/flyer/duldung/Duldung
        - link "Asylverfahren":
          - /url: http://localhost:4321/de/flyer/procedure/Asylverfahren
        - link "Abschiebegefahr - Tipps bei Stress und Angst":
          - /url: http://localhost:4321/de/flyer/stress/Abschiebegefahr%20-%20Tipps%20bei%20Stress%20und%20Angst
        - link "Chancen auf Bleiberecht":
          - /url: http://localhost:4321/de/flyer/residence/Chancen%20auf%20Bleiberecht
        - heading "Weitere Informationen:" [level=2]
        - link "Notfallkoffer gegen Abschiebungen→":
          - /url: http://localhost:4321/de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene
          - paragraph: Notfallkoffer gegen Abschiebungen→
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
    await page.goto('/en/flyer');

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
        - heading "All flyers:" [level=2]
        - link "Negative decision in the asylum procedure":
          - /url: http://localhost:4321/en/flyer/decision/Negative%20decision%20in%20the%20asylum%20procedure
        - link "Deportation custody":
          - /url: http://localhost:4321/en/flyer/detention/Deportation%20custody
        - link "Dublin":
          - /url: http://localhost:4321/en/flyer/dublin/Dublin
        - link "Ongoing deportation":
          - /url: http://localhost:4321/en/flyer/ongoing-deportation/Ongoing%20deportation
        - link "Preparing for deportation":
          - /url: http://localhost:4321/en/flyer/prepare-deportation/Preparing%20for%20deportation
        - link "police and deportation":
          - /url: http://localhost:4321/en/flyer/police/police%20and%20deportation
        - link "Preventing Deportation":
          - /url: http://localhost:4321/en/flyer/prevent-deportation/Preventing%20Deportation
        - link "Duldung (tolerated stay permit)":
          - /url: http://localhost:4321/en/flyer/duldung/Duldung%20(tolerated%20stay%20permit)
        - link "Asylum Procedure":
          - /url: http://localhost:4321/en/flyer/procedure/Asylum%20Procedure
        - link "Tips for stress and anxiety":
          - /url: http://localhost:4321/en/flyer/stress/Tips%20for%20stress%20and%20anxiety
        - link "Chances of a right to stay":
          - /url: http://localhost:4321/en/flyer/residence/Chances%20of%20a%20right%20to%20stay
        - heading "More Information:" [level=2]
        - link "Emergency Kit against deportations→":
          - /url: http://localhost:4321/en/kit/affected/Emergency%20Kit%20against%20deportations%20for%20people%20threatened%20with%20deportation
          - paragraph: Emergency Kit against deportations→
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
