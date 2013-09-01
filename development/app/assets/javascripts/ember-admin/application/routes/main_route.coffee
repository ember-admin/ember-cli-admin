Admin.MainRoute = Ember.Route.extend

  model: (options, transition) ->
    @action = undefined
    @page = undefined
    modelName = @_modelName(transition.targetName)
    modelType = @_modelType(modelName)

    @_checkAction(options, transition.targetName)
    @_setAction(options.action) if options.action
    @_setPage(options.page)
    if modelType
      @_find_model(modelType, options)

  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      @_setModel(controller, model)
      type = (model.type || model.get('_reference').type)
      @_setType(controller, type)
      @_setupPaginationInfo(controller)
      controller.set('modelAttributes', Admin.DSL.Attributes.detect(type))
      controller.set('batches', [])

  renderTemplate: (controller, model) ->
    @_setActiveRoute()
    @_setupBreadscrumbs(controller, model)

    @render @_getControllerTemplate(controller), {outlet: "main", controller: controller}

    @_renderNavigation(controller, model)
    @_renderBreadcrumbs(controller, model)
    @_renderActions(controller, model)
    @_renderForm(controller, model)


  pagination: (modelType, param) ->
    perPage = ($.cookie('perPage') || 25)
    modelType.find({page: @page, per_page: perPage})

  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    if  Ember.TEMPLATES[form]
      form
    else
      "form"

  _find_model: (modelType, options) ->
    return modelType.createRecord() if options.action == "new"
    return @pagination(modelType, "_page=1") unless options.id
    return @pagination(modelType, options.id) if @_checkPaginations(options.id)
    modelType.find(options.id)

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    if Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]
      name
    else
      if @action && @action != "page" then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '')

  _setActiveRoute: ->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    url = "/" + url.split("/")[1]
    @controllerFor("navigation").set('activeMenu', url)

  _setModel: (controller, model) ->
    return unless model
    return controller.set('model', Ember.Object.create(items:  model, __list: true)) if model.type
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    @get('store.adapter').serializer.singularize(name)

  _modelType: (modelName) ->
    eval("Admin.%@".fmt(modelName.classify()))

  _checkPaginations: (id) ->
    @action == "page"

  _setPage: (page) ->
    @page = parseInt(page) || 1

  _setAction: (action) ->
    @action = action

  _checkAction: (options, target) ->
    if /\./.test(target)
      target = target.split(".")[1]
      options.action = target if target

  _setupBreadscrumbs: (controller, model)->
    Admin.Logics.Breadcrumbs.setup(@action, controller, model, @controllerFor('breadcrumbs'))

  _setupPaginationInfo: (controller) ->
    controller.set('__page', @page)
    controller.set('__controller_name', @_controllerName(controller))
    Admin.Logics.Pagination.setup(controller, @page)

  _setType: (controller, type) ->
    controller.set('__type', type.toString().replace("Admin.", ""))

  _setSiteTitle: (controller, model) ->
    Admin.Logics.SiteTile.setup(@_controllerName(controller), model, @action)

  _renderNavigation:(controller, model) ->
    @render 'navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    }

  _renderBreadcrumbs:(controller, model) ->
    @render 'breadcrumbs',{
      outlet: 'breadcrumbs'
      controller: 'breadcrumbs'
    }

  _renderActions: (controller, model) ->
    window.c =  controller
    if model
      @render 'actions',{
        outlet: 'actions'
        controller: controller
      }

  _renderForm: (controller, model) ->
    if @action && (@action == "edit" || @action == "new")
      @render @_getForm(controller), {
        into: @action
        outlet: 'form'
        controller: controller
      }