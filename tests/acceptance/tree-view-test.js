import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App, catalogues;

module('Acceptance: Tree View Test', {
  beforeEach: function() {
    App = startApp();

    catalogues = server.createList('catalogue', 5);
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('model tree is displayed', function(assert) {
  assert.expect(1);

  visit('/catalogues');

  andThen(function() {
    assert.equal(find('.sortable_tree li:first:contains("1") li:first:contains("2") li:first:contains("4")').length, 1);
  });

});

test('it goes to edit', function(assert) {
  assert.expect(1);

  visit('/catalogues');

  andThen(function() {
    click('button[title="Edit"]:first');
    andThen(()=>{
      assert.equal(currentRouteName(), 'catalogues.edit');
    });
  });
});
