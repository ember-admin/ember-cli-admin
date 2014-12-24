import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "tr",
  classNames: "",
  actions: {
    adminAction: function(adminActionName, model) {
      console.log('admin-tr.adminAction: ', adminActionName, model);
      this.sendAction('adminAction', adminActionName, model);
    }
  }
});