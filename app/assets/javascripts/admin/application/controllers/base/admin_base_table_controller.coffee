Admin.Base.Controllers.AdminBaseTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  perPage: (parseInt($.cookie('perPage')) || 25)
  table: true

  changePerPage: (perPage) ->
    $.cookie('perPage', perPage)
    @set('perPage', perPage)

  reloadTable: (->
    collection = @get('model.type').find({per_page: @get('perPage'), page: (@get('page') || 1)})
    @set('model', collection)
  ).observes('perPage')

  formAttributes:(->
    @get('modelAttributes').map (item) =>
      {name: item}
  ).property('modelAttributes.@each')