Feature: A kit page

  Scenario: Url without seo will redirect to canonical
    When i open the page "/de/kit/affected"
    Then i see a url containing "de/kit/affected/Notfallkoffer%20gegen%20Abschiebungen%20f%C3%BCr%20Betroffene"
    Then i see a title containing "Notfallkoffer gegen Abschiebungen für Betroffene"
