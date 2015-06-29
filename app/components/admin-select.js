import Ember from "ember";

export default Ember.Component.extend({
  content: [],
  selectedValue: null,

  actions: {
    change() {
      const changeAction = this.get('action');
      const selectedEl = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const content = this.get('content');
      const selectedValue = content[selectedIndex];
      this.set('selectedValue', selectedValue);
      if (changeAction){
        changeAction(selectedValue);
      }
    }
  }
});
