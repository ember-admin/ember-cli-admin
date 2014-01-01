Admin.Mixins.Routes.ControllerMixin =  Ember.Mixin.create

  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    if  Ember.TEMPLATES[form]
      form
    else
      "form"

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
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
    @action = action

  _checkAction: (options, target) ->
    if /\./.test(target)
      target = target.split(".")[1]
      options.action = target if target

  _setupBreadscrumbs: (controller, model)->
    Admin.Logics.Breadcrumbs.setup(@action, controller, model, @controllerFor('breadcrumbs'))

  _setType: (controller, type) ->
    controller.set('__type', type.toString().replace("Admin.", ""))

  _setSiteTitle: (controller, model) ->
    Admin.Logics.SiteTile.setup(@_controllerName(controller), model, @action)