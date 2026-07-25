Feature: A internal print kit page

  Scenario: Cover page
    When i open the page "internal-print/kit-en-affected"
    Then i see a heading "Notfallkoffer gegen Abschiebungen für Betroffene"
    Then i see a heading "Emergency Kit against deportations for people threatened with deportation"
    Then i see a heading "Bring Back Our Neighbours"
    Then i see a language tag "english | Englisch"

  Scenario: footer template
    When i open the page "internal-print/kit-en-affected"
    Then there is a hidden footer template

  Scenario: Structure
    When i open the page "internal-print/kit-en-affected"
    Then i see a heading "Asylum procedure and Dublin"
    Then i see an article "Asylum procedure" with a link "/flyer-en-procedure" to "/en/flyer/procedure/Asylum%20Procedure"
