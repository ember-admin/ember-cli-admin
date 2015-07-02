import Ember from 'ember';
import layout from '../templates/components/admin-radio-button';

export default Ember.Component.extend({
  layout: layout,

  tagName: "input",
  type: "radio",

  attributeBindings: ["type", "checked:checked"],

  click: function() {
    this.set("selection", this.get('value'));
  },
  checked: Ember.computed('selection', {
    get: function() {
      return this.get("value") === this.get("selection");
    }
  })
});
