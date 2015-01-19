import Ember from 'ember';
var adminSortThView;

adminSortThView = Ember.Component.extend({
  tagName: "th",
  isOrderAscending: Ember.computed.bool('orderAscending'),
  isCurrentSortAttribute: (function() {
    return this.get('sort') === this.get('attributeName') && this.get('isInSortFields');
  }).property('sort', 'attributeName'),
  isInSortFields: (function() {
    return this.get('sortFields').contains(this.get('attributeName'));
  }).property('sortFields', 'attributeName'),
  click: function() {
    return this.sendAction('action', this.get('attributeName'));
  }
});

export default adminSortThView;