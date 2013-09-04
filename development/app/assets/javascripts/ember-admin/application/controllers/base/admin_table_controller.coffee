Admin.Base.Controllers.AdminTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  Admin.Base.Mixins.FileUploadMixin, Admin.Base.Mixins.AttributesMixin,
  __perPage: (parseInt($.cookie('perPage')) || 25)

  __table: true

  __batches: []

  reloadTable: (->
    collection = this.store.find(@get('__model_name'), {per_page: @get('__perPage'), page: (@get('__page') || 1)})
    @set('model.items', collection)
  ).observes('__perPage')

  __actions: (->
    [{title: "Edit", class: "btn btn-small btn-primary", action: "edit", iconClass: "glyphicon glyphicon-pencil"},
    {title: "Show", class: "btn btn-small btn-success", action: "show", iconClass: "glyphicon glyphicon-info-sign"},
    {title: "Delete", confirm: "are you shure to delete this?", class: "btn btn-small btn-danger", action: "destroy", iconClass: "glyphicon glyphicon-trash"}
    ]
  ).property('model')

  actions:

    submit: (redirect=true)->
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

  _updateModel: (redirect) ->
    @get('model').save().then =>
      if redirect
        @_redirectToTable()

  _createModel: (redirect) ->
    @get('model').save().then =>

      #fix for belongsTo relation
      @get('model').reload().then =>
        if redirect
          @_redirectToTable()
        else
          @send('edit', @get('model'))