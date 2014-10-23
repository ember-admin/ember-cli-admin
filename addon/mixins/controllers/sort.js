import Ember from 'ember';

var sortMixin;

sortMixin = Ember.Mixin.create({
  sortFields: ['title', 'name'],
  orderAscending: false,

  actions: {
    sort: function(fieldName){
      if (this.get('sort') == fieldName) {
        this.toggleProperty('orderAscending');
      } else {
        this.setProperties({sort: fieldName, orderAscending: true});
      }
      console.log(this.get('sort'), this.get('orderAscending'));
    }
  }
});

export default sortMixin;