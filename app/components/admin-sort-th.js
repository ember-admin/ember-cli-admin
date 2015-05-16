import Ember from 'ember';
var adminSortThView;

adminSortThView = Ember.Component.extend({
  tagName: "th",
  isOrderAscending: Ember.computed.bool('orderAscending'),
  isCurrentSortAttribute: Ember.computed('sort', 'attributeName', {
    get() {
      return this.get('sort') === this.get('attributeName') && this.get('isInSortFields');
    }
  }),
  isInSortFields: Ember.computed('sortFields', 'attributeName', {
    get() {
      return this.get('sortFields').contains(this.get('attributeName'));
    }
  }),
  click: function() {
    return this.sendAction('action', this.get('attributeName'));
  }
});

export default adminSortThView;
