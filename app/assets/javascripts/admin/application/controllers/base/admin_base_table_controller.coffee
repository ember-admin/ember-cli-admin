Admin.Base.Controllers.AdminBaseTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  perPage: (parseInt($.cookie('perPage')) || 25)
  table: true

  changePerPage: (perPage) ->
    $.cookie('perPage', perPage)
    @set('perPage', perPage)

  reloadTable: (->
    collection = @get('model.items.type').find({per_page: @get('perPage'), page: (@get('page') || 1)})
    @set('model.items', collection)
  ).observes('perPage')

  formAttributes:(->
    Admin.DSL.Attributes.withoutId(@get("model._reference").type).map (attr) =>
      {name: attr}
  ).property('modelAttributes.@each')

  submit: ->
    @get('model').save()
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@get('__controller_name'))