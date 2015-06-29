import Ember from 'ember';
import BaseControllerMixin from 'ember-cli-admin/mixins/controllers/base';
var treeViewMixin;

treeViewMixin = Ember.Mixin.create({
  __table: false,
  __tree: true,
  perPage: 100000,

  catalogues: Ember.computed({
    get: function() {
      return this.get('store').find('catalogue', {});
    }
  }),

  roots: Ember.computed('model.items.[]', {
    get: function() {
      if (!this.get('model.items')) {
        return [];
      }
      return this.get('model.items').filter(function(item) {
        return Ember.isEmpty(item.get('parent_id'));
      });
    }
  }),


  actions: {

    rebuildAction: function(itemObject, prevId, nextId, parentId) {
      var properties = {
        parent_id: parentId,
        prev_id: prevId,
        next_id: nextId,
        id: itemObject.get('id')
      };

      var data = {
        type: 'POST',
        dataType: 'json',
        url: itemObject.get('rebuildUrl'),
        data: properties,
        beforeSend: function() {
          Ember.$('.sortable_tree i.handle').hide();
        },
        success: function() {
          Ember.$('.sortable_tree i.handle').show();
        }
      };

      Ember.$.ajax(data);
    }
  }
});

treeViewMixin.reopen(BaseControllerMixin);

export default treeViewMixin;
