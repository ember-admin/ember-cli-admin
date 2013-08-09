Admin.MainRoute = Ember.Route.extend

  model: (options, transition) ->
    modelName = @_modelName(transition.targetName)
    modelType = @_modelType(modelName)
    @_setAction(options.action) if options.action
    if modelType
      if options.id == undefined
        @pagination(modelType, "_page=1")
      else
        if @_checkPaginations(options.id)
          @pagination(modelType, options.id)
        else
          modelType.find(options.id)

  setupController:(controller, model) ->
    if model
      type = (model.type || model.get('_reference').type)
      controller.set('model', model)
      controller.set('modelAttributes', Admin.DSL.Attributes.detect(type))
      controller.set('batches', [])

  renderTemplate: (controller, model) ->
    @_setActiveRoute()
    @render @_getControllerTemplate(controller), {outlet: "main", controller: controller}
    @render 'navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    }

  pagination: (modelType, param) ->
    modelType.find({page: @_page(param)})

  _getControllerTemplate: (controller) ->
    name = controller._debugContainerKey.split(":")[1]
    if Ember.TEMPLATES[name]
      name
    else
      if @action then @action else "main"

  _setActiveRoute: ->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    @controllerFor("navigation").set('activeMenu', url)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Admin.DSL.Attributes.singularize(name)

  _modelType: (modelName) ->
    eval("Admin.%@".fmt(modelName.classify()))

  _checkPaginations: (id) ->
    /_page=\d+/.test id

  _page: (id) ->
    /_page=(\d+)/.exec(id)[1]

  _setAction: (action) ->
    @action = action