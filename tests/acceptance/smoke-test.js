import Ember from 'ember';
import startApp from '../helpers/start-app';

var App, users;

module('Acceptance: Smoke Test', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
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
  equal(find(".navbar a:contains('Users')").length, 1);
  equal(find(".navbar a:contains('Dashboard')").length, 1);
});