Admin.MainRoute = Ember.Route.extend Admin.Mixins.Routes.PaginationMixin,
  Admin.Mixins.Routes.ModelMixin,
  Admin.Mixins.Routes.ControllerMixin,

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