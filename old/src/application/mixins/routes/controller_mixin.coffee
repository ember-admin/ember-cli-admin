Admin.Mixins.Routes.ControllerMixin =  Ember.Mixin.create

  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    return form if  Ember.TEMPLATES[form]
    "form"

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    name = "%@/%@".fmt(name, @action) if @action
    if Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]
      name
    else
      if @action && @action != "page" then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '')

  _setActiveRoute: (controller) ->
    url = @_controllerName(controller)
    url = "" if url == "dashboard" #todo check for root route
    @controllerFor("navigation").set('activeMenu', url)

  _setAction: (action) ->
    @action = action if action != "index"

  _checkAction: (options, target) ->
    if /\./.test(target)
      target = target.split(".")[1]
      options.action = target if target

  _setupBreadscrumbs: (controller, model) ->
    Admin.Logics.Breadcrumbs.setup(@action, controller, model, @controllerFor('breadcrumbs'))

  _setSiteTitle: (controller, model) ->
    Admin.Logics.SiteTile.setup(@_controllerName(controller), model, @action)