/* global chance*/

import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Acceptance: Form', {
  beforeEach: function() {
    App = startApp();
    server = new Pretender(function() {
    var user_category = {id: 1, name: 'test', expired_at: new Date(), zip_code: '123456', description: chance.paragraph({sentences: 10}), is_created: true, email: 'foo@bar.com', color: '#AFAFAF' };

      this.get('/api/user_categories', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({user_categories: [user_category], meta:{total: 1}})];
      });
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('edit page contains inputs for different field types', function(assert) {
  assert.expect(7);
  visit('/backend/user-categories');

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
  visit('/backend/user-categories');

  andThen(()=>{
    click('button[title="New"]');
    andThen(()=>{
      assert.equal(find('input[type="text"]').length, 5);
      assert.equal(find('#pickdate').length, 1);
      assert.equal(find('input[type="radio"]').length, 2);
    });
  });

});
