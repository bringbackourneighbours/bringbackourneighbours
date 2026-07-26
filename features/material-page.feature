Feature: The Material page

  Scenario: Url without seo will redirect to canonical
    When i open the page "/en/page/material"
    Then i see a url containing "en/page/material/All%20materials%20for%20printing"
    Then i see a title containing "All materials for printing"

  Scenario:
    When i open the page "de/page/material/Alle%20Materialien%20zum%20Ausdrucken"
    Then i see a table of contents labeled "Inhaltverzeichnis" with 6 items
