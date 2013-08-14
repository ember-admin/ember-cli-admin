Feature: Change per page in view
  Background:
    Given some users 50 in db
    Given I go to '/#/users'

  @javascript
  Scenario: Default per page in page is 25
    Then I should see table view
    And I should see 25 items in table

  @javascript
  Scenario: Change per page to 50
    When I change per page to 50
    Then I should see 50 items in table
    And I change per page to 25
    Then I should see 25 items in table