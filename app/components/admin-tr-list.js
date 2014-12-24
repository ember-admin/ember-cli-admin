import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",
  actions: {
    adminAction: function(adminActionName, model) {
      this.sendAction('adminAction', adminActionName, model);
    }
  }
});