Feature: Table View in page
  Background:
    Given I go to '/#/users'

  @javascript
  Scenario: Table view with 25 items
    Then I should see table view
    And I should see "Actions"
    And I should see "email"
    And I should see "id"
    And I should see 25 items in table

  @javascript
  Scenario: Base Actions in table view
    Then I should see base actions links

  @javascript
  Scenario: Additions Actions in table view
    Then I should see additions actions links

  @javascript
  Scenario: Batch Actions in general
    Then I should see "batch actions"

  @javascript
  Scenario: Delete action with confirm window
    And I click delete link in item "1"
    Then I should see confirm popup with "delete"
    And  I press "Confirm"
    Then I should not see "delete"
    And I should see 24 items in table

  @javascript
  Scenario: Tries to delete item
    And I click delete link in item "1"
    Then I should see confirm popup with "delete"
    And  I press "Close"
    Then I should not see "delete"
    And I should see 25 items in table

  @javascript
  Scenario: Tries to delete items in batch actions
    And I check 1 and 2 items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should see confirm popup with "delete"
    And  I press "Close"
    And I should see 25 items in table

  @javascript
  Scenario: Popup don't show when items doesn't check for batch actions
    When I click link "batch actions"
    And  I click link "delete"
    Then I should not see "delete"

  @javascript
  Scenario: Popup don't show when check all items and then unchecked
    When I check all items
    Then I uncheck all items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should not see "delete"

  @javascript
  Scenario: Batch actions delete items
    And I check 1 and 2 items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should see confirm popup with "delete"
    And  I press "Confirm" and wait
    And I should see 23 items in table

  @javascript
  Scenario: Batch actions delete all
    When I check all items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should see confirm popup with "delete"
    And  I press "Confirm"
    And I should see empty view with spinner

