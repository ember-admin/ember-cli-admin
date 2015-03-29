import Ember from 'ember';
var textInputView;

textInputView = Ember.TextField.extend({
  classNames: ["form-control"],
  attributeBindings: ["value", "readonly"],
  readonly: (function() {
    return this.get('attributeName') === 'id';
  }).property(),
  value: (function() {
    return this.get(this.path());
  }).property('context', 'attributeName'),
  path: function() {
    return "context.%@".fmt(this.get('attributeName'));
  },
  focusOut: function(event) {
    return this.get('context').set(this.get('attributeName'), this.get('value'));
  }
});

export default textInputView;
