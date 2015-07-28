import Ember from 'ember';
var paginationMixin;

paginationMixin = Ember.Mixin.create({
  pagination: function(modelName, params) {
    return this.store.query(modelName, params);
  }
});

export default paginationMixin;
