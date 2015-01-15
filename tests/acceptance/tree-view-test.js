import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server, catalogues;

module('Acceptance: Tree View Test', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/catalogues', function(request) {
        catalogues = [{id: 1, name: 'Tree #1', parent_id: null, catalogue_ids: [2,3]},
                          {id: 2, name: 'Tree #2', parent_id: 1, catalogue_ids: [4]},
                          {id: 3, name: 'Tree #3', parent_id: 1, catalogue_ids: [5]},
                          {id: 4, name: 'Tree #4', parent_id: 2, catalogue_ids: []},
                          {id: 5, name: 'Tree #5', parent_id: 3, catalogue_ids: []}];
        return [200, {"Content-Type": "application/json"}, JSON.stringify({catalogues: catalogues})];
      });
    });
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('model tree is displayed', function() {
  expect(1);

  visit('/catalogues');

  andThen(function() {
    equal(find('.sortable_tree li:first:contains("1") li:first:contains("2") li:first:contains("4")').length, 1);
  });

});

test('it goes to edit', function() {
  expect(1);

  visit('/catalogues');

  andThen(function() {
    click('button[title="Edit"]:first');
    andThen(()=>{
      equal(currentRouteName(), 'catalogues.edit');
    });
  });
});