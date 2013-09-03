Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend
  selectAll: false

  pushItem:(->
    return @_selectAllAction() if @get('selectAll')
    if @get('checked')
      @_addItem(@get('context'))
    else
      @get('controller.__batches').removeObject(@get('context'))
  ).observes('checked')

  checkedObserve:(->
    return if @get('selectAll')
    if @get('controller.__batches').indexOf(@get('context')) >= 0
      @set('checked', true)
    else
      @set('checked', false)
  ).observes('controller.__batches.length')

  _selectAllAction: ->
    @set('controller.__batches', [])
    if @get('checked')
      @get('controller.model.items').forEach (item) =>
        @_addItem(item)

  _addItem: (item) ->
    @get('controller.__batches').pushObject(item) unless @get('controller.__batches').indexOf(item) >= 0