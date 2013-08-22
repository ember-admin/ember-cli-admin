Admin.Base.Views.ActionView = Admin.Base.Views.BaseActionView.extend
  classNameBindings: ["class"]
  attributeBindings: ["title"]

  class:(->
    @get('action.class')
  ).property('action')

  click: ->
    model = (@get('model') || @get('controller.model'))
    if @get('action.confirm')
      @_showConfirmation()
    else
      @get('controller').send(@get('action.action'), model)

  confirm: ->
    model = (@get('model') || @get('controller.model'))
    @get('controller').send(@get('action.action'), model)
    @_super()

  action:(->
    if @get('breadcrumbAction')
      switch  @get('breadcrumbAction')
        when "new"
          @get('controller.actionNew')
        when "edit"
          @_findAction('edit')
        when "destroy"
          @_findAction('delete')
        when "show"
          @_findAction('show')
        else ""
    else
      @get('context')
  ).property('context')

  title: (->
    @get('action.title')
  ).property('action')

  _findAction: (title) ->
    @get('controller.actions').find (action) =>
      action.title == title

  _findAdditionalActions: (title) ->
    @get('controller.additionalActions').find (action) =>
      action.title == title