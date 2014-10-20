import Ember from 'ember';
import SearchLogic from 'ember-cli-admin/dsl/search';
var searchMixin;

searchMixin = Ember.Mixin.create({

  searchLogic: new SearchLogic(),

  searchForm: function(){
    var search =  this.get('searchLogic').form(this.get('q'), function(){
      this.input('title');
      this.input('lat', {type: 'number'});
    });
    return search;
  }.property('model', 'q'),

  actions: {
    search: function(){
      var query =  this.get('searchForm').serialize();
      this.set('q', Ember.$.param(query));
    }
  }
});

export default searchMixin;