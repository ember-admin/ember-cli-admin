import Ember from 'ember';
import SearchLogic from 'ember-cli-admin/dsl/search';

export default Ember.Mixin.create({
  pagination: function(modelName, params){
    var json = {};
    json = this._queryElasticsearch(json, new SearchLogic().deserializer(params.q));
    json = this._paginationParams(json, params);
    json = this._sort(json, params);
    return this.store.find(modelName, json);
  },

  // json - {}
  // params - query params
  _queryElasticsearch: function(){

  },

  _paginationParams: function(query, params){
    return Ember.$.extend({size: params.perPage, from: (params.page - 1)*params.perPage}, query);
  },

  _sort: function(query, params){
    if(!params.sort){
      return query;
    }
    var sort = {};
    var order = params.orderAscending ? 'asc' : 'desc';
    sort[params.sort] = {order: order};
    query.sort = [sort];
    return query;
  }
});
