Feature: A wizard page

  Scenario Outline: Shows in <language>
    When i open the page "<url>"
    Then i see a title containing "<title>"
    Then i see a heading "<heading>"
    Then i see a text asking for feedback with text containing "<feedback>"

    Examples:
      | language | url | title                     | heading                                                                                                       | feedback                                                                      |
      | default  | /   | Bring Back Our Neighbours | Hier gibt es mehr Infos, was du gegen eine Abschiebung tun kannst                                             | Wir freuen uns aber über weitere Hinweise und Kritik                          |
      | de       | /de | Bring Back Our Neighbours | Hier gibt es mehr Infos, was du gegen eine Abschiebung tun kannst                                             | Wir freuen uns aber über weitere Hinweise und Kritik                          |
      | ku       | /ku | Cîranên Me Vegerînin      | Ji bo ku hûn pêşî li dêrsînorkirinê bigirin li vir hûn dikarin bêtir agahiyan bibînin ka hûn dikarin çi bikin | Lêbelê, em ê ji her bertek an rexneyeke din a ji we bi dilxweşî pêşwazî bikin |


  Scenario Outline: Shows 2nd wizard step with the same language in <language>
    When i open the page "/<language>/wizard"
    Then i see a link "<label>" to "<url>" in language "<language>"

    Examples:
      | language | label                    | url              |
      | en       | support a person         | /en/kit/support  |
      | en       | yourself                 | /en/kit/affected |
      | de       | eine Person unterstützen | /de/kit/support  |
      | de       | selber                   | /de/kit/affected |
