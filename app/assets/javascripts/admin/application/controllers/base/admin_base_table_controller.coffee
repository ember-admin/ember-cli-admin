Admin.Base.Controllers.AdminBaseTableController = Ember.Controller.extend Admin.Base.Mixins.BaseActionsMixin,
  perPage: 25
  table: true

  changePerPage: (perPage) ->
    @set('perPage', perPage)

  reloadTable: (->
    collection = @get('model.type').find({per_page: @get('perPage')})
    @set('model', collection)
  ).observes('perPage')