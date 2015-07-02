import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, users, windowHistoryBack;

module('Acceptance: Resource Actions', {
  beforeEach: function() {
    App = startApp();
    windowHistoryBack = window.history.back;

    server.createList('avatar', 25);
    users = server.createList('user', 25);
  },
  afterEach: function() {
    window.history.back = windowHistoryBack;
    Ember.run(App, 'destroy');
  }
});

test('resource table is displayed', function(assert) {
  assert.expect(1);
  visit('/users');
  andThen(function() {
    assert.equal(find("tbody tr").length, 25);
  });
});

test('breadcrumbs contains "New" action button', function(assert) {
  assert.expect(1);
  visit('/users');

  andThen(function() {
    assert.equal(find(".breadcrumb-action button").length, 1);
  });
});

test('resource index page contains link to resource edit page', function(assert) {
  assert.expect(1);
  visit('/users');

  click('tbody tr:first button[title="Edit"]');

  andThen(function() {
    assert.equal(find(".panel-heading:contains('Edit')").length, 1);
  });
});

test('resource index page contains link to resource show page', function(assert) {
  assert.expect(1);
  visit('/users');

  click('tbody tr:first button[title="Show"]');

  andThen(function() {
    assert.equal(find(".panel-heading:contains('Show')").length, 1);
  });
});

test('resource index page contains link to resource delete action', function(assert) {
  assert.expect(1);
  visit('/users');

  andThen(function() {
    assert.equal(find('tbody tr:first button[title="Delete"]').length, 1);
  });
});

test('model gets deleted via modal that we open by clicking on the table delete button', function(assert) {
  assert.expect(1);

  visit('/users');

  click('tbody tr:first button[title="Delete"]');
  click('button:contains("Confirm")');
  andThen(function() {
    assert.equal(find("tbody tr").length, 24);
  });
});

test('model formFields are shown on resource show page', function(assert) {
  assert.expect(3);

  let firstUser = users[0];

  visit('/users/1/show');

  andThen(function() {
    assert.equal(find('tbody td').length, 2);
    assert.equal(find("td[data-column='email']").text().trim(), users[0].email);
    assert.equal(find("td[data-column='name']").text().trim(), users[0].name);
  });
});

test('model properties are saved and the previous visited route is transitioned to when we click "Submit" on the edit page', function(assert) {
  window.history.back = function() {
    assert.ok(true, "it goes back based on browser history");
  };
  visit('/users/1/show');
  click('button[title="Edit"]');
  fillIn('input:first', "test@ex.co");
  click('button:contains("Submit")');
});
