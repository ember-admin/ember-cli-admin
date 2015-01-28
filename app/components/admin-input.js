import Ember from 'ember';
var adminInput;

adminInput = Ember.Component.extend({
  type: function(){
    return Ember.typeOf(this.get('model').get(this.get('name')));
  }.property('name', 'model'),

  isString: Ember.computed.equal('type', 'string'),
  _stringType: function(predicat){
    if(this.get('isString') && predicat.bind(this)()){
      this.set('isString', false);
      return true;
    }
    return false;
  },
  isEmail: function(){
    var predicat = function(){return this.get('value').match(/.+@\w+\.\w+/);};
    return this._stringType(predicat);
  }.property('isString'),
  isColor: function(){
    var predicat = function(){return this.get('value').match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);};
    return this._stringType(predicat);
  }.property('isString'),
  isText: function(){
    var predicat = function(){return this.get('value').length > 50};
    return this._stringType(predicat);
  }.property('isString'),
  isNumber: Ember.computed.equal('type', 'number'),
  isBoolean: Ember.computed.equal('type', 'boolean'),
  isDate: Ember.computed.equal('type', 'date'),

  isPlainObject: Ember.computed.equal('type', 'object'),
  isEmberObject: Ember.computed.equal('type', 'instance'),
  isObject: function(){
    return this.get('isPlainObject') || this.get('isEmberObject');
  }.property('isPlainObject', 'isEmberObject'),

  value: function(key, value) {
    if (arguments.length > 1) {
      return this.get('model').set(this.get('name'), value);
    }
    return this.get('model').get(this.get('name'));
  }.property('name', 'model')
});

export default adminInput;

