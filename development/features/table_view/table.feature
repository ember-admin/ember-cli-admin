Feature: Table View in page
  Background:
    Given some users 5 in db
    Given I go to '/#/users'

  @javascript
  Scenario: Table view with 25 items
    Then I should see table view
    And I should see "Actions"
    And I should see "email"
    And I should see "id"
    And I should see 5 items in table

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
    And I click Delete link in item "1"
    Then I should see confirm popup with "delete"
    And  I press "Confirm"
    Then I should not see "delete"
    And I should see 4 items in table

  @javascript
  Scenario: Tries to delete item
    And I click Delete link in item "1"
    Then I should see confirm popup with "delete"
    And  I press "Close"
    Then I should not see "delete"
    And I should see 5 items in table

  @javascript
  Scenario: Tries to delete items in batch actions
    And I check 1 and 2 items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should see confirm popup with "delete"
    And  I press "Close"
    And I should see 5 items in table

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
    And I should see 3 items in table

  @javascript
  Scenario: Batch actions delete all
    When I check all items
    Then I click link "batch actions"
    And  I click link "delete"
    Then I should see confirm popup with "delete"
    And  I press "Confirm"
    And I should see 0 items in table

  @javascript
  Scenario: Transition to show page
    When I click Show link in item "1"
    Then I should see "Show"
    And I should see "email"
    And I should see "name"

  @javascript
  Scenario: Transition to edit page
    When I click Edit link in item "1"
    Then I should see "Edit"

  @javascript
  Scenario: Edit item
    And I click Edit link in item "1"
    When I fill in "Email" with "foo@bar.com"
    And I fill in "Name" with "Foo Bar"
    And I press "Submit"
    Then I should see table view
    And I should see "foo@bar.com"
    And I should see "Foo Bar"

  @javascript
  Scenario: Cancel editing item
    And I click Edit link in item "1"
    When I fill in "Email" with "foo@bar.com"
    And I fill in "Name" with "Foo Bar"
    And I press "Cancel"
    Then I should see table view
    And I should not see "foo@bar.com"
    And I should not see "Foo Bar"

  @javascript
  Scenario: Transition to new page
    When I press "New"
    Then I should see "New"

  @javascript
  Scenario: Create new item
    And I press "New"
    When I fill in "Email" with "foo@bar.com"
    And I fill in "Name" with "Foo Bar"
    And I press "Submit"
    Then I should see table view
    And I should see "foo@bar.com"
    And I should see "Foo Bar"
