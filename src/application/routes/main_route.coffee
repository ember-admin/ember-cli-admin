Admin.MainRoute = Ember.Route.extend Admin.Mixins.Routes.PaginationMixin,
  Admin.Mixins.Routes.ModelMixin,
  Admin.Mixins.Routes.ControllerMixin,

  beforeModel: (transition) ->
    @action = undefined
    @page = undefined
    @modelName = @_modelName(transition.targetName)

  model: (options, transition) ->
#    if options.queryParams && options.queryParams.page
#      @page = options.queryParams.page
#      @perPage = options.queryParams.perPage
    @_checkAction(options, transition.targetName)
    @_setAction(options.action) if options.action
#    @_setPage(@page)
#    @_setPerPage(@perPage)
    try
      if this.store.modelFor(@modelName)
        return @_find_model(@modelName, options)
    catch e

  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      @_setModel(controller, model)
      type = (model.type || model.constructor)
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
    if @action && (@action == "edit" || @action == "new") && @_getControllerTemplate(controller).split('/').length < 2
      @render @_getForm(controller), {
        into: @action
        outlet: 'form'
        controller: controller
      }