Feature: All pages dont have a11y issues

  Scenario Outline: No new violations on <page>
    When i open the page "<page>"
    Then there are no accessibility violations except "<violations>"

    Examples:
      | page                          | violations                                  |
      | /en/                          | role-img-alt                                |
      | /404                          |                                             |
      | /en/wizard                    | role-img-alt                                |
      | /en/kit                       | role-img-alt                                |
      | /en/kit/affected              | role-img-alt                                |
      | /en/kit/support               | role-img-alt, heading-order                 |
      | /en/flyer                     | role-img-alt                                |
      | /en/flyer/decision            | link-name, role-img-alt, nested-interactive |
      | /en/flyer/detention           | link-name, role-img-alt, nested-interactive |
      | /en/flyer/dublin              | role-img-alt, nested-interactive            |
      | /en/flyer/duldung             | role-img-alt, nested-interactive            |
      | /en/flyer/ongoing-deportation | role-img-alt, nested-interactive            |
      | /en/flyer/police              | role-img-alt                                |
      | /en/flyer/prepare-deportation | role-img-alt                                |
      | /en/flyer/prevent-deportation | role-img-alt, nested-interactive            |
      | /en/flyer/procedure           | role-img-alt, nested-interactive            |
      | /en/flyer/residence           | role-img-alt, nested-interactive            |
      | /en/flyer/stress              | role-img-alt, nested-interactive            |
      | /en/page/about                | role-img-alt                                |
      | /en/page/countries            | role-img-alt, nested-interactive            |
      | /en/page/forms                | role-img-alt                                |
      | /en/page/publicity            | role-img-alt                                |
      | /de/page/imprint              | role-img-alt, heading-order                 |
      | /en/page/material             | role-img-alt                                |
      | /de/page/professionals        | link-name, role-img-alt, nested-interactive |
      | /de/page/contacts             | link-name, role-img-alt, nested-interactive |
