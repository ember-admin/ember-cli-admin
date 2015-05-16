import Ember from 'ember';
var textInputView;

textInputView = Ember.TextField.extend({
  classNames: ["form-control"],
  attributeBindings: ["value", "readonly"],
  readonly: Ember.computed({
    get() {
      return this.get('attributeName') === 'id';
    }
  }),
  value: Ember.computed('context', 'attributeName', {
    get() {
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

export default textInputView;
