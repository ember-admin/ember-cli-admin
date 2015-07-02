import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Form', {
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('edit page contains inputs for different field types', function(assert) {
  assert.expect(7);

  server.createList('avatar', 2);
  server.createList('user_category', 1);

  visit('/user-categories');

  andThen(()=>{
    click('button[title="Edit"]:first');
    andThen(()=>{
      assert.equal(find('textarea').length, 1);
      assert.equal(find('input[type="text"]').length, 2);
      assert.equal(find('input[type="email"]').length, 1);
      assert.equal(find('input[type="color"]').length, 1);
      assert.equal(find('input[type="number"]').length, 1);
      assert.equal(find('input[type="radio"]').length, 2);
      assert.equal(find('#pickdate').length, 1);
    });
  });

});

test('new page contains inputs for different field types', function(assert) {
  assert.expect(3);
  visit('/user-categories');

  andThen(()=>{
    click('button[title="New"]');
    andThen(()=>{
      assert.equal(find('input[type="text"]').length, 5);
      assert.equal(find('#pickdate').length, 1);
      assert.equal(find('input[type="radio"]').length, 2);
    });
  });

});
