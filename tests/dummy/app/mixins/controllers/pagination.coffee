`import Ember from 'ember';`

paginationMixin = Ember.Mixin.create
  page: 1
  perPage:25

  numberOfPages:(->
    Math.ceil(@get('total') / @get('perPage'))
  ).property('perPage')

  actions:

    nextPage:->
      @incrementProperty('page') if @get('page') < @get('numberOfPages')

    prevPage:->
      @decrementProperty('page') if @get('page') > 1

    changePerPage: (perPage) ->
      @set('perPage', perPage)

    changePage: (page) ->
      @set('page', Number(page))

`export default paginationMixin;`
