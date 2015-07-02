import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, users;

module('Acceptance: Search', {
  beforeEach: function() {
    App = startApp();

    server.createList('avatar', 25);
    users = server.createList('user', 25);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('search panel contains model search fields', function(assert) {
  assert.expect(2);
  visit('/users');

  andThen(function() {
    assert.equal(find('form.search .controls').length, 5);
    assert.equal(find('form.search input[name="email"]').length, 1);
  });
});

test('search results are shown in table', function(assert) {
  assert.expect(1);
  visit('/users');
  fillIn('input[name="email"]', 'test@example.com');
  click('button[type="submit"]');

  andThen(function() {
    assert.equal(find("tbody tr").length, 1);
  });
});

test('search input can be selectable', function(assert) {
  assert.expect(3);
  visit('/users');

  andThen(function() {
    assert.equal(find(".controls select").length, 2);
    assert.equal(find('.controls select:last option:first').text(), "Select Name");
    assert.equal(Ember.$.trim(find('.controls select:last option:last').text()), "Bar");
  });
});

test('autocomplete search', function(assert) {
  visit('/users');
  Ember.$('.typeahead').typeahead('val', '12');
  click('button[type="submit"]');
  andThen(function(){
    assert.equal(find('form.search .controls').length, 5);
  });
});
