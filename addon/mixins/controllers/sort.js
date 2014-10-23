import Ember from 'ember';

var sortMixin;

sortMixin = Ember.Mixin.create({
  sortFields: ['title', 'name'],

  actions: {
    sort: function(fieldName){
      this.set('sort', fieldName);
    }
  }
});

export default sortMixin;