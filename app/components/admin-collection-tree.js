import Ember from 'ember';
var view;

view = Ember.CollectionView.extend({
  classNames: ['sortable_tree', 'nested_set', 'ui-sortable'],
  tagName: 'ol',
  itemViewClass: Ember.View.extend({
    templateName: 'admin/base/tree/collection',
    tagName: 'li',
    attributeBindings: ['liId:data-id'],
    liId: Ember.computed('content', {
      get() {
        return this.get('content').id;
      }
    }),
    item: Ember.computed.alias('content')
  }),
  children: Ember.computed('content', {
    get() {
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
    return Ember.on('sortupdate', (function(_this) {
      return function(event, ui) {
        return self.rebuild.call(self, event, ui);
      };
    })(this), this.$());
  }),
  rebuild: function(event, ui) {
    var item, itemId, itemObject, nextId, parentId, prevId;
    item = ui.item;
    itemId = item.data('id');
    prevId = item.prev().data('id');
    nextId = item.next().data('id');
    parentId = item.parent().parent().data('id');
    itemObject = this.get('controller.model.items').find((function(_this) {
      return function(item) {
        return item.id.toString() === itemId.toString();
      };
    })(this));
    return this.get('controller').send('rebuild', itemObject, prevId, nextId, parentId);
  }
});

export default view;
