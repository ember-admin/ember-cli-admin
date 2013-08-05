Admin.Base.Views.CheckboxBatchView = Ember.Checkbox.extend

  click: ->
    if @get('checked')
      @get('controller.batches').pushObject(@get('context'))
    else
      @get('controller.batches').removeObject(@get('context'))