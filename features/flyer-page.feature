@broken
Feature: A Flyer page

  Scenario: Url without seo will redirect to canonical
    When i open the page "/es/flyer/dublin"
    Then i see a url containing "/es/flyer/dublin/Dublin"
    Then i see a title containing "Dublin"

  Scenario: Language Switcher
    When i open the page "/de/flyer/decision"
    Then i the language-Switcher labeled "Sprache wechseln" with a language "deutsch" selected

  Scenario: Content Meta fr
    When i open the page "/fr/flyer/dublin"
    Then i see a role "button" with name "share"
    Then i see a role "button" with name "copier le texte"
    Then i see a role "link" with name "télécharger en PDF"
    Then i see a role "link" with name "Tous les documents à imprimer"
    Then i see a role "link" with name "Tous les documents à imprimer"
    Then i see a timestamp with value "08/07/2025"

  Scenario: Content Meta de
    When i open the page "/de/flyer/dublin"
    Then i see a timestamp with value "8.7.2025"
