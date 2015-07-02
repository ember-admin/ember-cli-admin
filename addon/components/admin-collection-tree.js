import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sortable_tree', 'nested_set', 'ui-sortable'],
  tagName: 'ol',
  children: Ember.computed('content', {
    get: function() {
      return this.get('content');
    }
  }),
  initSortable: Ember.on('didInsertElement', function() {
    var self;
    this.$().nestedSortable({
      handle: 'div',
      listType: 'ol',
      items: 'li',
      toleranceElement: '.tree-item_wrap',
      placeholder: 'placeholder'
    });
    self = this;
    return this.$().on('sortupdate', function(event, ui) {
      return self.rebuild.call(self, event, ui);
    });
  }),
  rebuild: function(event, ui) {
    var item, itemId, itemObject, nextId, parentId, prevId;
    item = ui.item;
    itemId = item.data('id');
    prevId = item.prev().data('id');
    nextId = item.next().data('id');
    parentId = item.parent().parent().data('id');
    itemObject = this.get('items').find(function(item) {
      return item.id.toString() === itemId.toString();
    });
    this.sendAction(this.get('rebuildAction'), itemObject, prevId, nextId, parentId);
  },

  actions:{
    adminAction: function(adminActionName, item){
      this.sendAction(this.get('adminAction'), adminActionName, item);
    }
  }

});
