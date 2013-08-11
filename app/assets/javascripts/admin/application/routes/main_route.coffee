Admin.MainRoute = Ember.Route.extend

  model: (options, transition) ->
    @action = undefined
    @page = undefined

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
      if model.type
        controller.set('model', Ember.Object.create(items:  model.toArray()))
      else
        controller.set('model', model)

      type = (model.type || model.get('_reference').type)
      @_setupPaginationInfo(controller)
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
    perPage = ($.cookie('perPage') || 25)
    modelType.find({page: @_page(param), per_page: perPage})

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    if Ember.TEMPLATES[name]
      name
    else
      if @action then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1]

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
    @page = parseInt(/_page=(\d+)/.exec(id)[1])
    @page

  _setAction: (action) ->
    @action = action

  _setupPaginationInfo: (controller) ->
    controller.set('page', @page)
    controller.set('name', @_controllerName(controller))
    if @page
      nextPage = @page + 1
      prevPage = if @page - 1 < 1 then 1 else @page - 1
      controller.set('nextPage', nextPage)
      controller.set('prevPage', prevPage)
    else
      controller.set('nextPage', undefined)
      controller.set('prevPage', undefined)