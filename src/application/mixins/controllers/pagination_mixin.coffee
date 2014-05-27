Admin.Mixins.Controllers.PaginationMixin = Ember.Mixin.create
  queryParams: ['page', 'perPage']
  page: 1
  perPage:25

  numberOfPages:->
    Math.ceil(@get('total') / @get('perPage'))

  actions:

    nextPage:->
      @incrementProperty('page')

    prevPage:->
      @decrementProperty('page') if @get('page') > 1

    changePerPage: (perPage) ->
      @set('perPage', perPage)

    changePage: (page) ->
      @set('page', page)