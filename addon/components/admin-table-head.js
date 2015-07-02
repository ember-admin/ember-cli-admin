import Ember from 'ember';
import layout from '../templates/components/admin-table-head';

export default Ember.Component.extend({
  layout: layout,

  tagName: "thead",
  actions: {
    sort: function(attributeName){
      this.sendAction('action', attributeName);
    }
  }
});
