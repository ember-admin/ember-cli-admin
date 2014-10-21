// You can create your own search form with form dsl
//  var search =  this.get('searchLogic').form(this.get('q'), function(){
//    this.input('title');
//    this.input('lat', {type: 'number'});
//  });
// Or you can use by default with your model

import Ember from 'ember';
import SearchLogic from 'ember-cli-admin/dsl/search';
var searchMixin;

searchMixin = Ember.Mixin.create({

  searchLogic: new SearchLogic(),

  isShowSearchForm: true,

  searchForm: function () {
    var search = this.get('searchLogic').fromModel(this.get('q'), this.get('modelType'));
    return search;
  }.property('model', 'q'),

  actions: {
    search: function () {
      var query = this.get('searchForm').serialize();
      this.setProperties({page: 1, q: Ember.$.param(query)});
    },

    clearSearchForm: function () {
      this.setProperties({page: 1, q: ''});
    }
  }
});

export default searchMixin;