import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App, users;

module('Acceptance: Sorting', {
  beforeEach: function() {
    App = startApp();

    server.createList('avatar', 5);
    users = server.createList('user', 5);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});


test('records in table are sorted by controller sortFields in ascending order', function(assert) {
  assert.expect(1);

  visit('/users');

  click('th:contains("id")');

  andThen(function() {
    assert.equal(find('tbody tr:first td[data-column="id"]:contains("1")').length, 1);
  });
});

test('records in table are sorted by controller sortFields in descending order', function(assert) {
  assert.expect(1);

  visit('/users');

  click('th:contains("id")');
  click('th:contains("id")');

  andThen(function() {
    assert.equal(find('tbody tr:first td[data-column="id"]:contains("5")').length, 1);
  });
});

test('switching from sorting by one attribute to another works as expected - records are sorted by the ' +
  'new selected attribute',
  function(assert) {
    assert.expect(1);

    let user = users[2];
    user.name = 'Aaron';

    visit('/users');

    click('th:contains("id")');
    click('th:contains("id")');
    click('th:contains("name")');

    andThen(function() {
      assert.equal(find('tbody tr:first td[data-column="id"]:contains("3")').length, 1);
    });
  });
