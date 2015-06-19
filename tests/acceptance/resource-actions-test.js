import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, users, windowHistoryBack;

module('Acceptance: Resource Actions', {
  beforeEach: function() {
    App = startApp();
    windowHistoryBack = window.history.back;
    server = new Pretender(function() {
      this.put('/api/users/:id', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify({user: {id: request.params.id, email: 'test@example.com', name: 'Test User'}}    )];
      });
      this.get('/api/users', function(request) {
        users = [];
        for (var i = 0; i < 25; i++) {
          users.push({id: i, name: 'testuser'});
        }
        users[0].email = 'test@example.com';
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 40}})];
      });
      this.delete('/api/users/:id', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({})];
      });
      this.get('/api/users/:id', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify({user: {id: request.params.id, email: 'test@example.com', name: 'Test User'}})];
      });
    });
  },
  afterEach: function() {
    window.history.back = windowHistoryBack;
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('resource table is displayed', function(assert) {
  assert.expect(1);
  visit('/backend/users');
  andThen(function() {
    assert.equal(find("tbody tr").length, 25);
  });
});

test('breadcrumbs contains "New" action button', function(assert) {
  assert.expect(1);
  visit('/backend/users');

  andThen(function() {
    assert.equal(find(".breadcrumb-action button").length, 1);
  });
});

test('resource index page contains link to resource edit page', function(assert) {
  assert.expect(1);
  visit('/backend/users');

  click('tbody tr:first button[title="Edit"]');

  andThen(function() {
    assert.equal(find(".panel-heading:contains('Edit')").length, 1);
  });
});

test('resource index page contains link to resource show page', function(assert) {
  assert.expect(1);
  visit('/backend/users');

  click('tbody tr:first button[title="Show"]');

  andThen(function() {
    assert.equal(find(".panel-heading:contains('Show')").length, 1);
  });
});

test('resource index page contains link to resource delete action', function(assert) {
  assert.expect(1);
  visit('/backend/users');

  andThen(function() {
    assert.equal(find('tbody tr:first button[title="Delete"]').length, 1);
  });
});

test('model gets deleted via modal that we open by clicking on the table delete button', function(assert) {
  assert.expect(1);

  visit('/backend/users');

  click('tbody tr:first button[title="Delete"]');
  click('button:contains("Confirm")');
  andThen(function() {
    assert.equal(find("tbody tr").length, 24);
  });
});

test('model formFields are shown on resource show page', function(assert) {
  visit('/backend/users/1/show');
  andThen(function() {
    assert.equal(find('tbody td').length, 2);
    assert.equal(find("td:contains('test@example.com')").length, 1);
    assert.equal(find("td:contains('Test User')").length, 1);
  });
});

test('model properties are saved and the previous visited route is transitioned to when we click "Submit" on the edit page', function(assert) {
  window.history.back = function() {
    assert.ok(true, "it goes back based on browser history");
  };
  visit('/backend/users/1/show');
  click('button[title="Edit"]');
  fillIn('input:first', "test@ex.co");
  click('button:contains("Submit")');
});
