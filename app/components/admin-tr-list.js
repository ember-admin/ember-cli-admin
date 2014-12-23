import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",
  classNames: "",
  actions: {
    openImagePreview: function(imageUrl) {
      this.sendAction('action', imageUrl);
    }
  }
});