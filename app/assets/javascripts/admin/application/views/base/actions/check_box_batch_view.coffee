Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend

  click: ->
    return @_selectAllAction() if @get('selectAll')

    if @get('checked')
      @get('controller.batches').pushObject(@get('context'))
    else
      @get('controller.batches').removeObject(@get('context'))

  checked:(->
    @get('controller.batches').indexOf(@get('context')) >= 0
  ).property('controller.batches')

  _selectAllAction: ->
    @set('controller.batches', [])
    if @get('checked')
      @get('controller.model').forEach (item) =>
        @get('controller.batches').pushObject(item)