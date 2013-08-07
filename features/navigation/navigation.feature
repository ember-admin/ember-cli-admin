Feature: Top navigation menu
  Background:
    Given I go to '/'

  @javascript
  Scenario: Follow "Dashboard" link
    When I go to '/#/users'
    And I follow "Dashboard" within ".navbar-fixed-top"
    Then I should see "Dashboard" within "h1"

  @javascript
  Scenario: Go to resource through "System" link
    When I follow "System" within ".navbar-fixed-top"
    And I click link "Users"
    Then I should see table view
