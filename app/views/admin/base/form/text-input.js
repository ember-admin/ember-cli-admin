import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ["form-control"],
  attributeBindings: ["value", "readonly"],
  readonly: Ember.computed({
    get: function() {
      return this.get('attributeName') === 'id';
    }
  }),
  value: Ember.computed('context', 'attributeName', {
    get: function() {
      return this.get(this.path());
    }
  }),
  path: function() {
    return "context.%@".fmt(this.get('attributeName'));
  },
  focusOut: function(event) {
    return this.get('context').set(this.get('attributeName'), this.get('value'));
  }
});
