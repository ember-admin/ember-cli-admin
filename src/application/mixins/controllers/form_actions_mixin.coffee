Admin.Mixins.Controllers.FormActionsMixin = Ember.Mixin.create

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
    @transitionToRoute(@get('__controller_name'))

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