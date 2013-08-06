Feature: Table View in page
  Background:
    Given I go to '/#/users'

  @javascript
  Scenario: Table view with 10 items
    Then I should see table view
    And I should see "Actions"
    And I should see "email"
    And I should see "id"
    And I should see 10 items in table