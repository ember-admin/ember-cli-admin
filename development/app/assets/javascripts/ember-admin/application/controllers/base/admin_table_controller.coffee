Admin.Base.Controllers.AdminTableController = Ember.ObjectController.extend Admin.Base.Mixins.BaseActionsMixin,
  Admin.Base.Mixins.FileUploadMixin,
  Admin.Base.Mixins.AttributesMixin,
  Admin.Base.Mixins.PaginationMixin,
  Admin.Base.Mixins.BatchActionsMixin,

  __table: true

  actions:

    submit: (redirect=true)->
      if @get('model.id')
        @_updateModel(redirect)
      else
        @_createModel(redirect)

    cancel: ->
      @get('model').rollback() if @get('model.isDirty')
      @_redirectToTable()

  _redirectToTable: ->
    locationObject = Ember.Location.create({implementation: 'hash'})
    locationObject.setURL(@get('__controller_name'))

  _updateModel: (redirect) ->
    @get('model').save().then =>
      if redirect
        @_redirectToTable()

  _createModel: (redirect) ->
    @get('model').save().then =>
      if redirect
        @_redirectToTable()
      else
        @send('edit', @get('model'))