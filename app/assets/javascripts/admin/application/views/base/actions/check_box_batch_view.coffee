Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend
  selectAll: false

  pushItem:(->
    return @_selectAllAction() if @get('selectAll')
    if @get('checked')
      @_addItem(@get('context'))
    else
      @get('controller.batches').removeObject(@get('context'))
  ).observes('checked')

  checkedObserve:(->
    return if @get('selectAll')
    if @get('controller.batches').indexOf(@get('context')) >= 0
      @set('checked', true)
    else
      @set('checked', false)
  ).observes('controller.batches.length')

  _selectAllAction: ->
    @set('controller.batches', [])
    if @get('checked')
      @get('controller.model').forEach (item) =>
        @_addItem(item)

  _addItem: (item) ->
    @get('controller.batches').pushObject(item) unless @get('controller.batches').indexOf(item) >= 0