import Ember from "ember";
import layout from '../templates/components/admin-select';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'select',

  content: [],
  selectedValue: null,

  change() {
    this._change();
  },

  _change() {
    const selectedEl = this.$()[0];
    let selectedIndex = selectedEl.selectedIndex;
    if (this.get('prompt')) {
      selectedIndex = selectedIndex - 1;
    }
    const content = this.get('content');
    const selectedValue = content.toArray()[selectedIndex];
    if (selectedValue) {
      if (this.get('action')) {
        this.sendAction('action', selectedValue);
      } else {
        this.set('selectedValue', selectedValue);
      }
    }
  }
});
