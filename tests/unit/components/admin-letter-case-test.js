import Ember from  'ember';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('admin-letter-case');

test('change case', function(){
  expect(1);

  var component = this.subject();

  Ember.run(function(){
    component.set('content','user-categories');
    component.set('caseType','title');
  });

  equal(this.$().text(), 'User Categories');
});