import Ember from 'ember';
var adminInput;

adminInput = Ember.Component.extend({
  value: (function(key, value) {
    if (arguments.length > 1) {
      return this.get('model').set(this.get('name'), value);
    }
    return this.get('model').get(this.get('name'));
  }).property('name', 'model')
});

export default adminInput;

