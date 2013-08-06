Feature: Table View in page
  Background: I go to "/#/users"

  Scenario: Table view with 10 items
    Then I should see table view
    And I should see "Actions"
    And I should see "email"
    And I should see "id"