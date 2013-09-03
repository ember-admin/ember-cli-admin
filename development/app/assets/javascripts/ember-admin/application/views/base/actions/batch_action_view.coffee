Admin.Base.Views.BatchActionView = Admin.Base.Views.BaseActionView.extend
  tagName: "li"

  click: ->
    event.preventDefault()
    return if @get('controller.__batches.length') < 1
    if @get('context.confirm')
      @_showConfirmation()
    else
      @_batchAction()

  actions:
    confirm: ->
      @_batchAction()
      @_super()

  _batchAction: ->
    @get('controller').send("baseBatchAction", @get('context.action'))
    Ember.View.views["select-all-batches"].set('checked', false)