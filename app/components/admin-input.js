import Ember from 'ember';
var adminInput;

adminInput = Ember.Component.extend({
    type: function(){
        var transformedAttributes = Ember.get(this.get('model.constructor'), 'transformedAttributes')
        if(Ember.isEmpty(this.get('value'))){
            return transformedAttributes.get(this.get('name'));
        }

        return Ember.typeOf(this.get('model').get(this.get('name')));
    }.property('name', 'model'),

    isString: Ember.computed.equal('type', 'string'),

    isEmail: function(){
        if(this.get('isString') && this.get('value') && this.get('value').match(/.+@\w+\.\w+/)){
            this.set('isString', false);
            return true;
        }
        return false;
    }.property('isString'),
    isColor: function(){
        if(this.get('isString') && this.get('value') && this.get('value').match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)){
            this.set('isString', false);
            return true;
        }
        return false;
    }.property('isString'),
    isText: function(){
        if(this.get('isString') && this.get('value') && this.get('value').length > 50){
            this.set('isString', false);
            return true;
        }
        return false;
    }.property('isString'),

    isNumber: Ember.computed.equal('type', 'number'),
    isBoolean: Ember.computed.equal('type', 'boolean'),
    isDate: Ember.computed.equal('type', 'date'),

    value: function() {
        return this.get('model').get(this.get('name'));
    }.property('name', 'model'),

    valueObserver: function(){
        this.get('model').set(this.get('name'), this.get('value'));
    }.observes('value')
});

export default adminInput;

