Admin.Base.Controllers.AdminTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  __perPage: (parseInt($.cookie('perPage')) || 25)

  __table: true

  __batches: []

  reloadTable: (->
    collection = @get('model.items.type').find({per_page: @get('__perPage'), page: (@get('__page') || 1)})
    @set('model.items', collection)
  ).observes('__perPage')

  formAttributes:(->
    attrs = (@get('model.formFields') || Admin.DSL.Attributes.withoutId(@get("model").constructor))
    attrs.map (attr) =>
      {name: attr}
  ).property('modelAttributes.@each')

  tableAttributes:(->
    @get('modelAttributes')
  ).property('modelAttributes.@each')

  fileuploads:(->
    if @get('model.fileuploads')
      @get('model.fileuploads').map (attr) ->
        {name: attr}
  ).property('model.fileuploads')

  __actions: (->
    [{title: "Edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "glyphicon glyphicon-pencil"},
    {title: "Show", class: "btn btn-small btn-success", action: "show", iconClass: "glyphicon glyphicon-info-sign"},
    {title: "Delete", confirm: "are you shure to delete this?", class: "btn btn-small btn-danger", action: "destroy", iconClass: "glyphicon glyphicon-trash"}
    ]
  ).property('model')

  actions:

    submit: (redirect=true)->
      unless @get('model.isDirty')
        return @_redirectToTable()
      if @get('model.id')
        @_updateModel(redirect)
      else
        @_createModel(redirect)

    cancel: ->
      @get('model').rollback() if @get('model.isDirty')
      @_redirectToTable()

    changePerPage: (perPage) ->
      $.cookie('perPage', perPage)
      @set('__perPage', perPage)

  _redirectToTable: ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@get('__controller_name'))

  _updateModel: (redirect)->
    @get('model').save()
    if redirect
      @get('model').one 'didUpdate', =>
        @_redirectToTable()

  _createModel: (redirect) ->
    @get('model').save()
    @get('model').one 'didCreate', =>
      if redirect
        @_redirectToTable()
      else
        Ember.run.next =>
          @edit(@get('model'))