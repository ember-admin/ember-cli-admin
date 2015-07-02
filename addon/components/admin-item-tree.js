import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'admin/base/tree/collection',
  tagName: 'li',
  attributeBindings: ['liId:data-id'],
  liId: Ember.computed('item', {
    get: function() {
      return this.get('item').id;
    }
  }),

  model: Ember.computed.alias('item'),

  actions: {
    adminAction: function(adminActionName, item) {
      this.sendAction(this.get('adminAction'), adminActionName, item);
    }
  }
});
