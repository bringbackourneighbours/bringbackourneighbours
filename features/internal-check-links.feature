Feature: A internal check links page

  Scenario: List of links
    When i open the page "internal-check-links"
    Then i see a role "cell" with name "w2eufa"
    Then i see a role "cell" with name "https://w2eu.info/fa/countries/germany/contacts"
    Then i see a role "cell" with name "link in file: src/content/links/w2eu_contacts.yml; slug: w2eufa"

  Scenario: List of addresses
    When i open the page "internal-check-links"
    Then i see a role "cell" with name "rlc_leipzig"
    Then i see a role "cell" with name "https://rlcl.de/"
    Then i see a role "cell" with name "address in file: src/content/addresses/rlc_leipzig.yml; identifier: rlc_leipzig"
