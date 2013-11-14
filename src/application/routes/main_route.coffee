Admin.MainRoute = Ember.Route.extend Admin.Mixins.Routes.PaginationMixin,

  model: (options, transition) ->
    @action = undefined
    @page = undefined
    @modelName = @_modelName(transition.targetName)

    @_checkAction(options, transition.targetName)
    @_setAction(options.action) if options.action
    @_setPage(options.page)
    if eval("Admin.%@".fmt(@modelName.classify()))
      @_find_model(@modelName, options)

  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      window.m = model
      @_setModel(controller, model)
      type = (model.type || model.constructor)
      @_setType(controller, type)
      @_setupPaginationInfo(controller)
      controller.set('modelAttributes', Admin.DSL.Attributes.detect(type))
      controller.set('batches', [])

  renderTemplate: (controller, model) ->
    @_setActiveRoute(controller)
    @_setupBreadscrumbs(controller, model)

    @render @_getControllerTemplate(controller), {outlet: "main", controller: controller}

    @_renderNavigation(controller, model)
    @controllerFor('breadcrumbs').set('resource', model)
    @_renderBreadcrumbs(controller, model)
    @_renderActions(controller, model)
    @_renderForm(controller, model)


  _getForm:(controller) ->
    form = "%@_form".fmt(@_controllerName(controller).decamelize())
    if  Ember.TEMPLATES[form]
      form
    else
      "form"

  _find_model: (modelName, options) ->
    return this.store.createRecord(modelName, {}) if options.action == "new"
    return @pagination(modelName, "_page=1") unless options.id
    return @pagination(modelName, options.id) if @_checkPaginations(options.id)
    this.store.find(modelName, options.id);

  _getControllerTemplate: (controller) ->
    name = @_controllerName(controller)
    if Ember.TEMPLATES[name] || Ember.TEMPLATES["ember-admin/%@".fmt(name)]
      name
    else
      if @action && @action != "page" then @action else "main"

  _controllerName: (controller) ->
    controller._debugContainerKey.split(":")[1].replace(/(Show)|(Edit)|(New)|(Page)/, '')

  _setActiveRoute: (controller)->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    url = "/" + url.split("/")[1]
    unless url == "/"
      url = "/" + @_controllerName(controller)
    @controllerFor("navigation").set('activeMenu', url)

  _setModel: (controller, model) ->
    return unless model
    return controller.set('model', Ember.Object.create(items:  model, __list: true)) if model.type
    controller.set('model', model)

  _modelName:(name) ->
    if /\./.test(name) then name = name.split(".")[0]
    Ember.String.singularize(name)

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