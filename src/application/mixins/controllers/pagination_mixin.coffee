Admin.Base.Mixins.PaginationMixin = Ember.Mixin.create
  __perPage: (parseInt($.cookie('perPage')) || 25)

  reloadTable: (->
    options = {per_page: @get('__perPage'), page: (@get('__page') || 1)}
    @get('store').findAll(@get('__model_name'), options).then (collection) =>
      @set('model.items', collection)
  ).observes('__perPage')

  actions:
    changePerPage: (perPage) ->
      $.cookie('perPage', perPage)
      @set('__perPage', perPage)