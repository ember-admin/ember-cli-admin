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

`import Ember from 'ember';`

baseActionsMixin = Ember.Mixin.create


  collectionActions: [{title: "Edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "glyphicon glyphicon-pencil"},
                      {title: "Show", class: "btn btn-small btn-success", action: "show",
                      iconClass: "glyphicon glyphicon-info-sign"},
                      {title: "Delete", confirm: "Are you sure you want to delete this?", class: "btn btn-small btn-danger",
                      action: "destroy", iconClass: "glyphicon glyphicon-trash"}]

  actionNew:(->
    {title: "New", class: "btn btn-primary", action: "new", iconClass: "glyphicon glyphicon-plus"}
  ).property('model')

  breadcrumbsActions: (->
    @get('__breadcrumbsActionsArray')
  ).property('__breadcrumbsActionsArray')

  actions:
    new: () ->
      @transitionToRoute(@_path("new"))

    edit: (model) ->
      @transitionToRoute(@_path(model, "edit"))

    update: (model)->
      model.save()

    destroy: (model, batch=false) ->
      if @get('model.__list')
        model.deleteRecord()
        @get('model.items').removeObject(model)
        @get('__batches').removeObject(model) unless batch
        model.save()
      else
        @_destroyItem(model)

    show: (model) ->
      @transitionToRoute(@_path(model, "show"))

  _destroyItem: (model)->
    model.deleteRecord()
    model.save().then =>
      @transitionToRoute(@get('_name'))

  _path: (model, type)->
    if type
      "/%@/%@/%@".fmt(@get('_name'), model.get('id'), type)
    else
      "/%@/%@".fmt(@get('_name'), model)

`export default baseActionsMixin;`