import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Acceptance: Admin', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('visit root', function() {
  expect(0);
  visit('/');
});