Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend
  selectAll: false

  pushItem:(->
    return @_selectAllAction() if @get('selectAll')
    if @get('checked')
      @_addItem(@get('context'))
    else
      @get('controller.__batches').removeObject(@get('context'))
  ).observes('checked')

  _selectAllAction: ->
    @set('controller.__batches', [])
    return unless @get('checked')
    @get('controller.model.items').forEach (item) =>
      @_addItem(item)

  _addItem: (item) ->
    @get('controller.__batches').pushObject(item) unless @get('controller.__batches').indexOf(item) >= 0

  changeBatchList:( ->
    return if @get('selectAll')
    @get('controller.__batches').indexOf(@get('context')) >= 0
  ).property('controller.__batches.@each')

  createObserverOnBatch:(->
    @get('changeBatchList')
    @addObserver("changeBatchList", @, ->
      return if @get('selectAll')
      if @get('changeBatchList')
        @set('checked', true)
      else
        @set('checked', false)
    )
  ).on('didInsertElement')