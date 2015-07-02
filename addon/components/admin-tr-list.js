import Ember from 'ember';
import layout from '../templates/components/admin-tr-list';

export default Ember.Component.extend({
  layout: layout,

  tagName: "tr",

  actions: {
    adminAction: function(adminActionName, model) {
      this.sendAction('adminAction', adminActionName, model);
    }
  }
});
