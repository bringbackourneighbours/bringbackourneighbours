Feature: A kit page

  Scenario: Url without seo will redirect to canonical
    When i open the page "/de/kit/affected"
    Then i see a url containing "de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene"
    Then i see a title containing "Notfallkoffer gegen Abschiebungen für Betroffene"

  Scenario: Fallback page
    When i open the page "/en/kit/affected/Emergency%20Kit%20against%20deportations%20for%20people%20threatened%20with%20deportation/"
    Then i see a heading "Notes for social work professionals"
    And i see an article "Notes for social work professionals" with a link "Hinweise für Fachkräfte der Sozialen Arbeit" to "/de/page/professionals/Hinweise%20f%C3%BCr%20Fachkr%C3%A4fte%20der%20Sozialen%20Arbeit"
