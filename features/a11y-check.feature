Feature: All pages dont have a11y issues

  Scenario Outline: No new violations on <page>
    When i open the page "<page>"
    Then there are no accessibility violations except "<violations>"

    Examples:
      | page                          | violations                                  |
      | /en/                          | link-name, role-img-alt                     |
      | /404                          | link-name, role-img-alt                     |
      | /en/wizard                    | link-name, role-img-alt                     |
      | /en/kit                       | link-name, role-img-alt                     |
      | /en/kit/affected              | link-name, role-img-alt                     |
      | /en/kit/support               | link-name, role-img-alt, heading-order      |
      | /en/flyer                     | link-name, role-img-alt                     |
      | /en/flyer/decision            | link-name, role-img-alt, nested-interactive |
      | /en/flyer/detention           | link-name, role-img-alt, nested-interactive |
      | /en/flyer/dublin              | link-name, role-img-alt, nested-interactive |
      | /en/flyer/duldung             | link-name, role-img-alt, nested-interactive |
      | /en/flyer/ongoing-deportation | link-name, role-img-alt, nested-interactive |
      | /en/flyer/police              | link-name, role-img-alt                     |
      | /en/flyer/prepare-deportation | link-name, role-img-alt                     |
      | /en/flyer/prevent-deportation | link-name, role-img-alt, nested-interactive |
      | /en/flyer/procedure           | link-name, role-img-alt, nested-interactive |
      | /en/flyer/residence           | link-name, role-img-alt, nested-interactive |
      | /en/flyer/stress              | link-name, role-img-alt, nested-interactive |
      | /en/pages/about               | link-name, role-img-alt                     |
      | /en/pages/contacts            | link-name, role-img-alt                     |
      | /en/pages/countries           | link-name, role-img-alt                     |
      | /en/pages/forms               | link-name, role-img-alt                     |
      | /en/pages/imprint             | link-name, role-img-alt                     |
      | /en/pages/material            | link-name, role-img-alt                     |
      | /en/pages/professionals       | link-name, role-img-alt                     |
      | /en/pages/publicity           | link-name, role-img-alt                     |
