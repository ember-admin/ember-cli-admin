import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "thead",
  actions: {
    sort: function(attributeName){
      this.sendAction('action', attributeName);
    }
  }
});