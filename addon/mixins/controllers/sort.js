import Ember from 'ember';

var sortMixin;

sortMixin = Ember.Mixin.create({
  sortFields: ['title', 'name'],

  actions: {
    sort: function(fieldName){
      if (this.get('sort') == fieldName) {
        this.toggleProperty('orderAscending');
      } else {
        this.setProperties({sort: fieldName, orderAscending: true});
      }
    }
  }
});

export default sortMixin;