import Ember from 'ember';
var paginationPerPageView;

paginationPerPageView = Ember.Component.extend({
  tagName: "button",
  classNames: ["btn btn-default"],
  attributeBindings: ["type"],
  classNameBindings: ["isActive:active"],
  click: function() {
    return this.sendAction('action', this.get('count'));
  },
  isActive: (function() {
    return this.get('perPage') === this.get('count');
  }).property('perPage')
});

export default paginationPerPageView;
