Admin.Base.Views.ActionView = Ember.View.extend
  tagName: "button"
  classNameBindings: ["class"]
  attributeBindings: ["title"]

  class:(->
    @get('context.class')
  ).property('context')

  click: ->
    if @get('context.confirm')
      @_showConfirmation()
    else
      @get('controller').send(@get('context.action'), @get('model'))


  confirm: ->
    @get('controller').send(@get('context.action'), @get('model'))
    $('.modal').modal('hide')

  _showConfirmation: ->
    modalView = @get('parentView')["modalView"]
    modalView.set('action', @get('context'))
    modalView.set('target', @)
    $('.modal').modal({})