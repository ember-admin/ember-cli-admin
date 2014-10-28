import Ember from 'ember';
import BaseControllerMixin from 'ember-cli-admin/mixins/controllers/base';
var treeViewMixin;

treeViewMixin = Ember.Mixin.create({
  __table: false,
  __tree: true,
  perPage: 100000,

  roots: function(){
    if(!this.get('model.items')){
      return [];
    }
    return this.get('model.items').filter(function(item){
      return Ember.isEmpty(item.get('parent'));
    });
  }.property('model.items.[]'),

  actions: {
    rebuild: function(itemObject, prevId, nextId, parentObject){
      Ember.$('.sortable_tree i.handle').hide();
      itemObject.setProperties({
        parent: parentObject,
        prevId: prevId,
        nextId: nextId
      });
      itemObject.save().then(function(){
        Ember.$('.sortable_tree i.handle').show();
      });
    }
  }
});

treeViewMixin.reopen(BaseControllerMixin);

export default treeViewMixin;
