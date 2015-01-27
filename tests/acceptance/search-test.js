import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, users;

module('Acceptance: Search', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/users', function(request) {
        if (request.queryParams.q) {
          users = [{id: 1, name: 'testuser'}];
          return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 1}})];
        }
        users = [];
        for (var i = 0; i < 25; i++) {
          users.push({id: i, name: 'testuser'});
        }
        users[0].email = 'test@example.com';
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 40}})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('search panel contains model search fields', function() {
  expect(2);
  visit('/users');

  andThen(function() {
    equal(find('form.search .controls').length, 4);
    equal(find('form.search input[name="email"]').length, 1);
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

test('search input can be selectable', function() {
  expect(3);
  visit('/users');

  andThen(function() {
    equal(find(".controls select").length, 1);
    equal(find('.controls select option:first').text(), "Select Name");
    equal(find('.controls select option:last').text(), "Bar");
  });
});

test('autocomplete search', function(){
  server.get('api/users/autocomplete', function(request){
    users = [{id: 1, name: 'testuser'}];
    return [200, {"Content-Type": "application/json"}, JSON.stringify(users)];
  });
  visit('/users');
  Ember.$('.typeahead').typeahead('val', '12');
  click('button[type="submit"]');
  andThen(function(){
    equal(find('form.search .controls').length, 4);
  });
});