import Ember from 'ember';
var adminInput;

adminInput = Ember.Component.extend({
  type: function(){
    return Ember.typeOf(this.get('model').get(this.get('name')));
  }.property('name', 'model'),

  isString: Ember.computed.equal('type', 'string'),

  isEmail: function(){
    if(this.get('isString') && this.get('value').match(/.+@\w+\.\w+/)){
      this.set('isString', false);
      return true;
    }
    return false;
  }.property('isString'),
  isColor: function(){
    if(this.get('isString') && this.get('value').match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){
      this.set('isString', false);
      return true;
    }
    return false;
  }.property('isString'),
  isText: function(){
    if(this.get('isString') && this.get('value').length > 50){
      this.set('isString', false);
      return true;
    }
    return false;
  }.property('isString'),

  isNumber: Ember.computed.equal('type', 'number'),
  isBoolean: Ember.computed.equal('type', 'boolean'),
  isDate: Ember.computed.equal('type', 'date'),

  value: function(key, value) {
    if (arguments.length > 1) {
      return this.get('model').set(this.get('name'), value);
    }
    return this.get('model').get(this.get('name'));
  }.property('name', 'model')
});

export default adminInput;

