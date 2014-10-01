`import Ember from 'ember';`
`import Breadcrumbs from 'dummy/logics/breadcrumbs';`
`import SiteTitle from 'dummy/logics/site-title';`

controllerMixin =  Ember.Mixin.create

  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    return form if  Ember.TEMPLATES[form]
    "form"

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    name = "%@/%@".fmt(name, @action) if @action
    return "dashboard" if name == "dashboard"
    if Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]
      name
    else
      if @action && @action != "page" then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '')

  _setActiveRoute: (controller) ->
    url = @_controllerName(controller)
    @controllerFor("navigation").set('activeMenu', url)

  _setAction: (action) ->
    @action = action if action != "index"

  _checkAction: (options, target) ->
    if /\./.test(target)
      target = target.split(".")[1]
      options.action = target if target

  _setupBreadscrumbs: (controller, model) ->
    Breadcrumbs.setup(@action, controller, model, @controllerFor('breadcrumbs'))

  _setSiteTitle: (controller, model) ->
    SiteTitle.setup(@_controllerName(controller), model, @action)

`export default controllerMixin;`