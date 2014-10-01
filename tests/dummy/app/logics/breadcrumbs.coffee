`import Ember from 'ember';`

breadcrumbs = Ember.Object.extend()

breadcrumbs.reopenClass
  setup: (action, controller, model, breadcrumbs_controller) ->
    content = []
    obj = Ember.Object.create({name: "dashboard", url: @_url("dashboard"), class: "first", active: false})
    content.pushObject(obj)
    obj = Ember.Object.create({name: controller.get('_name'), url: @_url(controller.get('_name')), class: "active", active: true})
    if action && model
      obj.set('class', "")
      obj.set('active', false)
      content.pushObject(obj)
      name = (model.get('id') || action)
      obj = Ember.Object.create({name: name, class: "active", active: true})
      content.pushObject(obj)
    else
      content.pushObject(obj)
    breadcrumbs_controller.set('content', content)
    @_actions(action, controller)

  _url: (url) ->
    url

  _actions: (action, controller) ->
    actions = []
    switch action
      when "edit"
        actions.push(@_createAction())
        actions.push(@_showAction())
        actions.push(@_destroyAction())
      when "show"
        actions.push(@_createAction())
        actions.push(@_editAction())
        actions.push(@_destroyAction())
      else
        actions.push(@_createAction())

    controller.set("__breadcrumbsActionsArray", actions)

  _createAction: ->
    "new"

  _editAction: ->
    "edit"

  _destroyAction: ->
    "destroy"

  _showAction: ->
    "show"
`export default breadcrumbs;`