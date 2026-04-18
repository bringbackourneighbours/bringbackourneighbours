Feature: cucumber with playwright and astro feature
  # this is only for testing the setup of cucumber with playwright and astro

  Scenario: cucumber works
    When a step is passing

  Scenario: playwright works
    When i open the page "https://playwright.dev"
    Then i see a title containing "Playwright"

  Scenario: astro dev works
    When i open the page "http://127.0.0.1:4321/"
    Then i see a title containing "Bring Back Our Neighbours"
