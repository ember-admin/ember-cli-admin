import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Smoke Test', {
  beforeEach: function() {
    App = startApp();

    server.createList('car', 1);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('root displays dashboard', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(()=>{
    assert.equal(currentRouteName(), "index");
  });
});

test('navbar contains links to dashboard and resources', function(assert) {
  assert.expect(2);
  visit('/');
  andThen(()=>{
    assert.equal(find(".navbar a:contains('Users')").length, 1);
    assert.equal(find(".navbar a:contains('Dashboard')").length, 1);
  });
});

test('pods can be resolved', function(assert) {
  assert.expect(1);
  visit('/cars');
  andThen(function() {
    assert.equal(find("tbody tr").length, 1);
  });
});
