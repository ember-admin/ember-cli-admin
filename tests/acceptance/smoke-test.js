import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Acceptance: Smoke Test', {
  beforeEach: function() {
    App = startApp();
    server = new Pretender(function() {
      this.get('/api/cars', function(request) {
        var car = {id:1, title: 'TEST CAR'};
        return [200, {"Content-Type": "application/json"}, JSON.stringify({cars: [car], meta:{total: 1}})];
      });
    });
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('root displays dashboard', function(assert) {
  assert.expect(1);
  visit('/');
  andThen(()=>{
    assert.equal(find("h1:contains('Dashboard')").length, 1);
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
  visit('/backend/cars');
  andThen(function() {
    assert.equal(find("tbody tr").length, 1);
  });
});
