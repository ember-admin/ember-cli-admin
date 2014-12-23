import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tbody",
  actions: {
    openImagePreview: function(imageUrl) {
      this.sendAction('openImagePreview', imageUrl);
    }
  }
});