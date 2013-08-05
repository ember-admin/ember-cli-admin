Admin.Base.Views.BatchActionView = Admin.Base.Views.BaseActionView.extend
  tagName: "li"

  click: ->
    event.preventDefault()
    return if @get('controller.batches.length') < 1
    if @get('context.confirm')
      @_showConfirmation()
    else
      @_batchAction()

  confirm: ->
    @_batchAction()
    @_super()

  _batchAction: ->
    @get('controller.batches').forEach (model) =>
      @get('controller').send(@get('context.action'), @get('model'))
    @set('controller.batches', [])
    Ember.View.views["select-all-batches"].set('checked', false)