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

###

Admin.Base.Mixins.BaseActionsMixin = Ember.Mixin.create

  batches: []

  actions: (->
    [ {title: "edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "icon-pencil icon-white"},
    {title: "show", class: "btn btn-small btn-success", action: "show", iconClass: "icon-info-sign icon-white"},
    {title: "delete", confirm: "are you shure to delete this?", class: "btn btn-small btn-danger", action: "destroy", iconClass: "icon-trash icon-white"}
    ]
  ).property('')

  batchActions: (->
    [{title: "delete", confirm: "Are you sure to delete this?", action: "destroy"}]
  ).property('')

  new: () ->
    console.log "new"

  edit: (model) ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL("/#{@get('name')}/#{model.id}/edit")

  update: (model)->
    model.get('store').commit()

  destroy: (model, save=true) ->
    model.deleteRecord()
    @get('model.items').removeReference(model.get('_reference'))
    model.get('store').commit() if save

  show: (model) ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL("/#{@get('name')}/#{model.id}/show")

  baseBatchAction: (action) ->
    store = @get('batches.firstObject').get('store')
    @get('batches').forEach (model) =>
      @send(action, model)
    store.commit()
    @set('batches', [])
