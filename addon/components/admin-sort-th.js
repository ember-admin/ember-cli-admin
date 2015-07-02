import Ember from 'ember';
import layout from '../templates/components/admin-sort-th';

export default Ember.Component.extend({
  layout: layout,

  tagName: "th",

  isOrderAscending: Ember.computed.bool('orderAscending'),
  isCurrentSortAttribute: Ember.computed('sort', 'attributeName', {
    get: function() {
      return this.get('sort') === this.get('attributeName') && this.get('isInSortFields');
    }
  }),
  isInSortFields: Ember.computed('sortFields', 'attributeName', {
    get: function() {
      return this.get('sortFields').contains(this.get('attributeName'));
    }
  }),
  click: function() {
    return this.sendAction('action', this.get('attributeName'));
  }
});
