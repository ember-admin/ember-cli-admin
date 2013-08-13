Admin.Base.Controllers.AdminBaseTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  __perPage: (parseInt($.cookie('perPage')) || 25)
  table: true

  changePerPage: (perPage) ->
    $.cookie('perPage', perPage)
    @set('__perPage', perPage)

  reloadTable: (->
    collection = @get('model.items.type').find({per_page: @get('__perPage'), page: (@get('__page') || 1)})
    @set('model.items', collection)
  ).observes('__perPage')

  formAttributes:(->
    Admin.DSL.Attributes.withoutId(@get("model._reference").type).map (attr) =>
      {name: attr}
  ).property('modelAttributes.@each')

  submit: ->
    if @get('model.id')
      @_updateModel()
    else
      @_createModel()


  _redirectToTable: ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@get('__controller_name'))

  _updateModel: ->
    @get('model').save()
    @get('model').one 'didUpdate', =>
      @_redirectToTable()

  _createModel: ->
    @get('model').save()
    @get('model').one 'didCreate', =>
      @_redirectToTable()