Admin.Base.Views.ActionView = Admin.Base.Views.BaseActionView.extend
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
    @_super()
