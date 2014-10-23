import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, users;

module('Acceptance: Admin', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/users', function(request) {
        if (request.queryParams.q) {
          users = [{id: 1, name: 'testuser'}];
          return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
        }
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
        users = [];
        for (var i = 0; i < 25; i++) {
          users.push({id: i, name: 'testuser'});
        }
        users[0].email = 'test@example.com';
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 40}})];
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

test('root displays dashboard', function() {
  expect(1);
  visit('/');
  equal(find("h1:contains('Dashboard')").length, 1);
});


test('navbar contains links to dashboard and resources', function() {
  expect(2);
  visit('/');
  equal(find("a:contains('Users')").length, 1);
  equal(find("a:contains('Dashboard')").length, 1);
});

test('resource table is displayed', function() {
  expect(1);
  visit('/users');
  andThen(function() {
    equal(find("tbody tr").length, 25);
  });
});

test('search panel contains model search fields', function() {
  expect(3);
  visit('/users');

  andThen(function() {
    equal(find('form.search .controls').length, 2);
    equal(find('form.search input[name="email"]').length, 1);
    equal(find('form.search input[name="name"]').length, 1);
  });
});

test('search results are shown in table', function() {
  expect(1);
  visit('/users');
  fillIn('input[name="email"]', 'test@example.com');
  click('button[type="submit"]');

  andThen(function() {
    equal(find("tbody tr").length, 1);
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
  expect(3);

  visit('/users/1/show');
  andThen(function() {
    equal(find('tbody td').length, 2);
    equal(find("td:contains('test@example.com')").length, 1);
    equal(find("td:contains('Test User')").length, 1);
  });
});

asyncTest('model properties are saved and the previous visited route is transitioned to ' +
     'when we click "Submit" on the edit page', function() {
  expect(1);

  visit('/users/1/show');
  click('button[title="Edit"]');

  fillIn('input:first', "test@ex.co");
  click('button:contains("Submit")');


  Ember.run.later(function() {
    start();
    equal(find(".panel-heading:contains('Show')").length, 1);
  }, 300);

});

test('records in table are sorted by controller sortFields in ascending order', function() {
  expect(1);

  visit('/users');
  click('th:contains("id")');
  andThen(function() {
    equal(find('tr:eq(1) td:eq(1):contains("0")').length, 1);
  });

});

test('records in table are sorted by controller sortFields in descending order', function() {
  expect(1);

  visit('/users');
  click('th:contains("id")');
  click('th:contains("id")');
  andThen(function() {
    equal(find('tr:eq(1) td:eq(1):contains("10")').length, 1);
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
    equal(find('tr:eq(1) td:eq(1):contains("3")').length, 1);
  });
});