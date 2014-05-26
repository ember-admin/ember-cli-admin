#Admin.Mixins.Controllers.PaginationMixin = Ember.Mixin.create
#  __perPage: (parseInt($.cookie('perPage')) || 25)
#
#  reloadTable: (->
#    options = {per_page: @get('__perPage'), page: (@get('__page') || 1)}
#    @get('store').find(@get('__model_name'), options).then (collection) =>
#      @set('model.items', collection)
#  ).observes('__perPage')
#
#  actions:
#    changePerPage: (perPage) ->
#      $.cookie('perPage', perPage)
#      @set('__perPage', perPage)

Admin.Mixins.Controllers.PaginationMixin = Ember.Mixin.create
  queryParams: ['page', 'perPage']
  page: 1
#  perPage: (parseInt($.cookie('perPage')) || 25)
  perPage:25

#  reloadTableOnPageChanged: (->
##    alert(@get('perPage'))
#    options = {per_page: @get('perPage'), page: (@get('page'))}
#    @get('store').find(@get('__model_name'), options).then (collection) =>
#      @set('model.items', collection)
#  ).observes('page')
#
#  reloadTableOnPerPageChanged: (->
#    options = {per_page: @get('perPage'), page: (@get('page'))}
#    @get('store').find(@get('__model_name'), options).then (collection) =>
#      @set('model.items', collection)
#  ).observes('perPage')

#  nextPage: Ember.computed "page", ->
#    @incrementProperty('page')
#
#  prevPage: Ember.computed "page", ->
#    @decrementProperty('page')


#  prevPage:(->
#    @decrementProperty('page') if @get('page') >= 1
#  ).property('page')

  actions:
#
#    nextPage:->
#      @incrementProperty('page')
#
#    prevPage:->
#      @decrementProperty('page') if @get('page') >= 1

    changePerPage: (perPage) ->
      $.cookie('perPage', perPage)
      @set('perPage', perPage)

    changePage: (page) ->
      @set('page', page)