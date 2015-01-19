import Ember from 'ember';
var paginationNumberView;

paginationNumberView = Ember.Component.extend({
  attributeBindings: ["href"],
  tagName: "a",
  classNameBindings: ["isActive:active"],
  href: '#',
  isActive: (function() {
    return this.get('page') === this.get('number');
  }).property('page'),
  click: function(e) {
    e.preventDefault();
    if (this.get('number') !== '...') {
      this.sendAction('action', this.get('number'));
      return window.scrollTo(0, 0);
    }
  }
});

export default paginationNumberView;