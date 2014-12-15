`import Ember from 'ember'`

checkboxBatchView = Ember.Checkbox.extend
  selectAll: false

  pushItem:(->
    return @_selectAllAction() if @get('selectAll')
    if @get('checked')
      @_addItem(@get('context'))
    else
      @get('batches').removeObject(@get('context'))
  ).observes('checked')

  observerForChangeBatchesCollection:(->
    Ember.run.later =>
      if @get('batches').length == 0 && @get('selectAll')
        @set('checked', false)
    , 300
  ).observes('batches.@each')

  _selectAllAction: ->
    @set('batches', [])
    return unless @get('checked')
    @get('items').forEach (item) =>
      @_addItem(item)

  _addItem: (item) ->
    @get('batches').pushObject(item) unless @get('batches').indexOf(item) >= 0

  changeBatchList:( ->
    return if @get('selectAll')
    @get('batches').indexOf(@get('context')) >= 0
  ).property('batches.@each')

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

`export default checkboxBatchView`