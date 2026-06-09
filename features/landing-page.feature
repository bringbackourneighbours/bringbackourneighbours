Feature: A landing page

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

  Scenario Outline: Shows wizard with entries for all languages
    When i open the page "/"
    Then i see a link "<label>" to "<url>" in language "<language>"

    Examples:
      | language | label                                                       | url        |
      | de       | Bist du oder wer anders von einer Abschiebung bedroht?      | /de/wizard |
      | en       | Are you or someone else at risk of deportation?             | /en/wizard |
      | fr       | Êtes-vous ou quelqu'un d'autre menacé d'expulsion?          | /fr/wizard |
      | ku       | Hûn an jî kesekî din bi dersînorkirinê re tên tehdît kirin? | /ku/wizard |
      | ka       | გემუქრება შენ ან ემუქრება სხვას დეპორტაცია?                | /ka/wizard |
      | ar       | هل أنت أو أي شخص آخر معرض لخطر الترحيل؟                    | /ar/wizard |
      #| tr       | TODO | /tr/wizard |
      #| fa       | TODO | /fa/wizard |
