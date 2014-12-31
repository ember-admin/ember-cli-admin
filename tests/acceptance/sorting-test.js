import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, users;

module('Acceptance: Sorting', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/users', function(request) {
        if (request.queryParams.sort === "id" && request.queryParams.orderAscending === "true") {
          users = [{id: 0, name: 'testuser'}];
          return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
        }
        if (request.queryParams.sort === "id" && request.queryParams.orderAscending !== "true") {
          users = [{id: 10, name: 'testuser'}];
          return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
        }
        if (request.queryParams.sort === "name") {
          users = [{id: 3, name: 'testuser'}];
          return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
        }
        users = [{id: 1, name: 'testuser'}];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('records in table are sorted by controller sortFields in ascending order', function() {
  expect(1);

  visit('/users');
  click('th:contains("id")');
  andThen(function() {
    equal(find('tbody tr:first td[data-column="id"]:contains("0")').length, 1);
  });

});

test('records in table are sorted by controller sortFields in descending order', function() {
  expect(1);

  visit('/users');
  click('th:contains("id")');
  click('th:contains("id")');
  andThen(function() {
    equal(find('tbody tr:first td[data-column="id"]:contains("10")').length, 1);
  });

});

test('switching from sorting by one attribute to another works as expected - records are sorted by the ' +
     'new selected attribute', function() {
  expect(1);

  visit('/users');
  click('th:contains("id")');
  click('th:contains("id")');
  click('th:contains("name")');
  andThen(function() {
    equal(find('tbody tr:first td[data-column="id"]:contains("3")').length, 1);
  });
});