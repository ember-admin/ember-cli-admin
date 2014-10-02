`import Ember from 'ember';`

paginationMixin =  Ember.Mixin.create
  queryParams: {
    page: {
      refreshModel: true
    },
    perPage: {
      refreshModel: true
    }
  },

  pagination: (modelName, params) ->
    this.store.find(modelName, params)

`export default paginationMixin;`