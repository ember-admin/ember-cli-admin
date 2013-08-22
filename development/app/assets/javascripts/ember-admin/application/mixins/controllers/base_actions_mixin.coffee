###
  This is base controller for use in all views
  If you wont add you action please override this actions
  Or you can use additionalActions property!
  for example:
   In your controller
    additionalActions:(->
      [{title: "my action", class: "btn my-action-css", action: "my"}]
    ).property()

  use @@confirm property for show text in confirmation modal
  @@action - is an action in your controller which pass model param

  #for batch actions you don't need save model, because save call automatic when all objects

  # for custom breadcrumbs actions you need override
   breadcrumbsActions property and add action title, then add this action into additionalActions property
###

Admin.Base.Mixins.BaseActionsMixin = Ember.Mixin.create

  batches: []

  actions: (->
    [
      {title: "Edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "glyphicon glyphicon-pencil"},
      {title: "Show", class: "btn btn-small btn-success", action: "show", iconClass: "glyphicon glyphicon-info-sign"},
      {title: "Delete", confirm: "are you shure to delete this?", class: "btn btn-small btn-danger", action: "destroy", iconClass: "glyphicon glyphicon-trash"}
    ]
  ).property('model')

  actionNew:(->
    {title: "New", class: "btn btn-primary", action: "new", iconClass: "glyphicon glyphicon-plus"}
  ).property('model')

  breadcrumbsActions: (->
    @get('__breadcrumbsActionsArray')
  ).property('__breadcrumbsActionsArray')

  batchActions: (->
    [{title: "delete", confirm: "Are you sure to delete this?", action: "destroy"}]
  ).property('model')

  new: () ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@_path("new"))

  edit: (model) ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@_path(model, "edit"))

  update: (model)->
    model.get('store').commit()

  destroy: (model, save=true) ->
    if @get('model.__list')
      model.deleteRecord()
      @get('model.items').removeReference(model.get('_reference'))
      if save
        @get('batches').removeObject(model)
        model.get('store').commit()
    else
      @_destroyItem(model)

  show: (model) ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@_path(model, "show"))

  baseBatchAction: (action) ->
    store = @get('batches.firstObject').get('store')
    @get('batches').forEach (model) =>
      @send(action, model, false)
    store.commit()
    @set('batches', [])

  _destroyItem: (model)->
    model.deleteRecord()
    model.get('store').commit()
    model.on 'didDelete', =>
      locationObject = Ember.Location.create({implementation: 'hash'})
      locationObject.setURL(@get('__controller_name'))

  _path: (model, type)->
    if type
      "/%@/%@/%@".fmt(@get('__controller_name'), model.id, type)
    else
      "/%@/%@".fmt(@get('__controller_name'), model)

