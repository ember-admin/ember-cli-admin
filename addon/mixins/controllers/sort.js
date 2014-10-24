import Ember from 'ember';
import Attributes from 'ember-cli-admin/dsl/attributes';

var sortMixin;

sortMixin = Ember.Mixin.create({

  sortFields: function(){
    return Attributes.forSort(this.get('modelType'));
  }.property(),

  actions: {
    sort: function(fieldName){
      if (!this.get('sortFields').contains(fieldName)) { return void 0; }
      if (this.get('sort') === fieldName) {
        this.toggleProperty('orderAscending');
      } else {
        this.setProperties({sort: fieldName, orderAscending: true});
      }
    }
  }
});

export default sortMixin;