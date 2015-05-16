import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "input",
  type: "radio",
  attributeBindings: ["type", "checked:checked"],
  click: function() {
    this.set("selection", this.get('value'));
  },
  checked: Ember.computed('selection', {
    get: function() {
      return this.get("value") == this.get("selection");
    }
  })
});
