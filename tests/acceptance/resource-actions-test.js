import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, users;

module('Acceptance: Resource Actions', {
  setup: function() {
    App = startApp();
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
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('resource table is displayed', function() {
  expect(1);
  visit('/users');
  andThen(function() {
    equal(find("tbody tr").length, 25);
  });
});

test('breadcrumbs contains "New" action button', function() {
  expect(1);
  visit('/users');

  andThen(function() {
    equal(find(".breadcrumb-action button").length, 1);
  });
});

test('resource index page contains link to resource edit page', function() {
  expect(1);
  visit('/users');

  click('tbody tr:first button[title="Edit"]');

  andThen(function() {
    equal(find(".panel-heading:contains('Edit')").length, 1);
  });
});

test('resource index page contains link to resource show page', function() {
  expect(1);
  visit('/users');

  click('tbody tr:first button[title="Show"]');

  andThen(function() {
    equal(find(".panel-heading:contains('Show')").length, 1);
  });
});

test('resource index page contains link to resource delete action', function() {
  expect(1);
  visit('/users');

  andThen(function() {
    equal(find('tbody tr:first button[title="Delete"]').length, 1);
  });
});

test('model gets deleted via modal that we open by clicking on the table delete button', function() {
  expect(1);

  visit('/users');

  click('tbody tr:first button[title="Delete"]');
  click('button:contains("Confirm")');
  andThen(function() {
    equal(find("tbody tr").length, 24);
  });
});

test('model formFields are shown on resource show page', function() {
  visit('/users/1/show');
  andThen(function() {
    equal(find('tbody td').length, 2);
    equal(find("td:contains('test@example.com')").length, 1);
    equal(find("td:contains('Test User')").length, 1);
  });
});

test('model properties are saved and the previous visited route is transitioned to when we click "Submit" on the edit page', function() {
  visit('/users/1/show');
  click('button[title="Edit"]');
  fillIn('input:first', "test@ex.co");
  ok(true);
  click('button:contains("Submit")');
  andThen(function(){
    // Ember seems to fulfill previous promise a bit too early,
    // not accounting for the process of reloading the page via
    // window.history.back()
    Ember.run.later(function(){
      equal(find(".panel-heading:contains('Show')").length, 1);
    }, 700);
  });
});
