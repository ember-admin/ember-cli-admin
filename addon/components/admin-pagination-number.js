import Ember from 'ember';
import layout from '../templates/components/admin-pagination-number';

export default Ember.Component.extend({
  layout: layout,

  attributeBindings: ["href"],
  tagName: "a",
  classNameBindings: ["isActive:active"],
  href: '#',
  isActive: Ember.computed('page', {
    get: function () {
      return this.get('page') === this.get('number');
    }
  }),
  click: function(e) {
    e.preventDefault();
    if (this.get('number') !== '...') {
      this.sendAction('action', this.get('number'));
      return window.scrollTo(0, 0);
    }
  }
});
