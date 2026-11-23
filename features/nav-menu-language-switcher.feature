Feature: The nav menu and the language switcher

  Scenario: Shows the nav links of the German start page
    When i open the page "/de"
    Then i see a navigation labeled "Sprache wechseln"
    When i open the navigation menu labeled "Hauptnavigation"
    Then i see an open navigation menu labeled "Hauptnavigation"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Bring Back Our Neighbours – Übersicht" to "/de" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Alle Flyer" to "/de/flyer" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Notfallkoffer gegen Abschiebungen für Unterstützer*innen" to "/de/kit/support/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Aktuelle Informationen zu GEAS und einzelnen Ländern" to "/de/page/countries/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Kontakte zu Verantwortlichen und Unterstützer*innen" to "/de/page/contacts/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Öffentlichkeit schaffen und Unterstützung gewinnen" to "/de/page/publicity/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Hinweise für Fachkräfte der Sozialen Arbeit" to "/de/page/professionals/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Alle Materialien zum Ausdrucken" to "/de/page/material/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Über Bring Back Our Neighbours" to "/de/page/about/" in language "de"
    Then i see a navigation menu labeled "Hauptnavigation" with link "Impressum und Datenschutz" to "/de/page/imprint/" in language "de"

  Scenario Outline: Finds the German nav link "<german nav link>" again in "<lang>"
    When i open the page "/de"
    When i open the navigation menu labeled "Hauptnavigation"
    And i see a navigation menu labeled "Hauptnavigation" with link "<german nav link>" to "<german nav href>" in language "de"
    And i switch to the language "<switch chip>" with the language switcher labeled "Sprache wechseln"
    And i see a navigation labeled "<switcher nav>"
    When i open the navigation menu labeled "<translated nav label>"
    Then i see an open navigation menu labeled "<translated nav label>"
    Then i see a navigation menu labeled "<translated nav label>" with link "<translated nav link>" to "<translated nav href>" in language "<lang>"

    Examples:
      | lang | switch chip | switcher nav      | german nav link                                      | german nav href     | translated nav link                                                       | translated nav href | translated nav label  |
      | en   | Englisch    | Change language   | Bring Back Our Neighbours – Übersicht                | /de                 | Bring Back Our Neighbours – home                                          | /en                 | Main navigation       |
      | en   | Englisch    | Change language   | Alle Flyer                                           | /de/flyer           | All flyers                                                                | /en/flyer           | Main navigation       |
      | en   | Englisch    | Change language   | Notfallkoffer gegen Abschiebungen für Betroffene     | /de/kit/affected/   | Emergency Kit against deportations for people threatened with deportation | /en/kit/affected/   | Main navigation       |
      | en   | Englisch    | Change language   | Aktuelle Informationen zu GEAS und einzelnen Ländern | /de/page/countries/ | Current information on GEAS and individual countries                      | /en/page/countries/ | Main navigation       |
      | en   | Englisch    | Change language   | Impressum und Datenschutz                            | /de/page/imprint/   | Imprint and Data Privacy                                                  | /en/page/imprint/   | Main navigation       |
      | ku   | Kurdisch    | Ziman biguherîne  | Alle Flyer                                           | /de/flyer           | Hemû belavok                                                              | /ku/flyer           | Navîgasyona sereke    |
      | ku   | Kurdisch    | Ziman biguherîne  | Kontakte zu Verantwortlichen und Unterstützer*innen  | /de/page/contacts/  | Têkelî û alîkarîyên girîng                                                | /ku/page/contacts/  | Navîgasyona sereke    |
      | fr   | Französisch | Changer de langue | Vorlagen zum Ausdrucken                              | /de/page/forms/     | Modèles à imprimer                                                        | /fr/page/forms/     | Navigation principale |
      | fr   | Französisch | Changer de langue | Über Bring Back Our Neighbours                       | /de/page/about/     | À propos de « Bring Back Our Neighbours »                                 | /fr/page/about/     | Navigation principale |
      | ar   | Arabisch    | تغيير اللغة       | Alle Flyer                                           | /de/flyer           | جميع النشرات الإعلانية                                                    | /ar/flyer           | التنقل الرئيسي        |
      | ar   | Arabisch    | تغيير اللغة       | Kontakte zu Verantwortlichen und Unterstützer*innen  | /de/page/contacts/  | جهات الاتصال بالمسؤولين والداعمين                                         | /ar/page/contacts/  | التنقل الرئيسي        |
      | ka   | Georgisch   | ენების შეცვლა     | Vorlagen zum Ausdrucken                              | /de/page/forms/     | ნიმუშები ამოსაბეჭდად                                                      | /ka/page/forms/     | მთავარი ნავიგაცია     |
      | tr   | Türkisch    | Dili değiştir     | Alle Materialien zum Ausdrucken                      | /de/page/material/  | Yazdırılabilir tüm materyaller                                            | /tr/page/material/  | Ana menü              |
