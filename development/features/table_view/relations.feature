Feature: Edit Relations
  Background:
    Given some users 5 in db
    Given I go to '/#/users'

  @javascript
  Scenario: Edit belongsTo relation
    When  I click Edit link in item "1"
    Then I fill in "Email" with "foo@bar.com"
    And I fill in "Name" with "Foo Bar"
    And I select "test_address"
    And I press "Submit"
    Then I should see table view
    And I should see "foo@bar.com"
    And I should see "Foo Bar"
    And I should see "test_address"