Admin.Base.Mixins.PaginationMixin = Ember.Mixin.create
  __perPage: (parseInt($.cookie('perPage')) || 25)

  reloadTable: (->
    collection = this.store.find(@get('__model_name'), {per_page: @get('__perPage'), page: (@get('__page') || 1)})
    @set('model.items', collection)
  ).observes('__perPage')

  actions:
    changePerPage: (perPage) ->
      $.cookie('perPage', perPage)
      @set('__perPage', perPage)