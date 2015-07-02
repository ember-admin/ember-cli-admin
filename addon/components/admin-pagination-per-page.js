import Ember from 'ember';
import layout from '../templates/components/admin-pagination-per-page';

export default Ember.Component.extend({
  layout: layout,

  tagName: "button",

  classNames: ["btn btn-default"],
  attributeBindings: ["type"],
  classNameBindings: ["isActive:active"],

  click: function() {
    return this.sendAction('action', this.get('count'));
  },
  isActive: Ember.computed('perPage', {
    get: function() {
      return this.get('perPage') === this.get('count');
    }
  })
});
