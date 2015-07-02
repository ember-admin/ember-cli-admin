import Ember from 'ember';
import layout from '../templates/components/admin-table-body';

export default Ember.Component.extend({
  layout: layout,

  tagName: "tbody",
  actions: {
    adminAction: function(adminActionName, model) {
      this.sendAction('adminAction', adminActionName, model);
    }
  }
});
