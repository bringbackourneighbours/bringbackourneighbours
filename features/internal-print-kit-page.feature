@broken
Feature: A internal print kit page

  Scenario: Cover page
    When i open the page "internal-print/kit-en-affected"
    Then i see a heading "Notfallkoffer gegen Abschiebungen für Betroffene"
    Then i see a heading "Emergency Kit against deportations for people threatened with deportation"
    Then i see a heading "Bring Back Our Neighbours"
    Then i see a language tag "english | Englisch"

  Scenario: footer template
    When i open the page "internal-print/kit-de-affected"
    Then there is a hidden footer template

  Scenario: Structure
    When i open the page "internal-print/kit-en-affected"
    Then i see a heading "home"
    Then i see a heading "Asylum procedure and Dublin"
    Then i see a heading "What is a deportation?"
    Then i see a heading "Appendix"
    Then i see a heading "Current information on countries of origin"
    Then i see a heading "Creating publicity and gaining support"
    Then i see a heading "Contacts to responsible persons & supporters"
    Then i see a heading "Templates for printing"
    Then i see a heading "Notes for social work professionals"
    Then i see a heading "Appendix"
