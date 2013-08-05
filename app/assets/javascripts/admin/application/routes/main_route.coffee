Admin.MainRoute = Ember.Route.extend

  model: (options, transition) ->
    modelName = @_modelName(transition.targetName)
    modelType = @_modelType(modelName)
    if modelType
      if Object.keys(options).length == 0
        modelType.find()
      else
        modelType.find(options.id)

  setupController:(controller, model) ->
    if model
      controller.set('model', model)
      controller.set('modelAttributes', Admin.DSL.Attributes.detect(model.type))

  renderTemplate: (controller, model) ->
    @_setActiveRoute()
    @render @_getControllerTemplate(controller), {outlet: "main", controller: controller}
    @render 'navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    }

  _getControllerTemplate: (controller) ->
    name = controller._debugContainerKey.split(":")[1]
    if Ember.TEMPLATES[name] then name else "main"

  _setActiveRoute: ->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    @controllerFor("navigation").set('activeMenu', url)

  _modelName:(name) ->
    Admin.DSL.Attributes.singularize(name)

  _modelType: (modelName) ->
    eval("Admin.%@".fmt(modelName.classify()))