import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Acceptance: Admin', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/users', function(request) {
        var users = [];
        for (var i = 0; i < 25; i++) {
          users.push({id: i, name: 'testuser'});
        }
        return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users, meta:{total: 40}})];
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