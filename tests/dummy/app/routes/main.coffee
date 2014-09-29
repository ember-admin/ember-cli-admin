`import PaginationMixin from 'dummy/mixins/routes/pagination';`
`import ModelMixin from 'dummy/mixins/routes/model';`
`import ControllerMixin from 'dummy/mixins/routes/controller';`
`import Attributes from 'dummy/dsl/attributes';`

mainRoute = Ember.Route.extend PaginationMixin,
  ModelMixin,
  ControllerMixin,

  beforeModel: (transition) ->
    @action = undefined
    @page = undefined
    @perPage = undefined
    @modelName = @_modelName(transition.targetName)

  model: (options, transition) ->
    if options
      @page = options.page if options.page
      @perPage = options.perPage if options.perPage
    @_checkAction(options, transition.targetName)
    @_setAction(options.action) if options.action

    unless @action
      @_setPage(@page)
      @_setPerPage(@perPage)

#    try
    console.log @modelName
    if this.store.modelFor(@modelName)
      return @_find_model(@modelName, options)
#    catch e

  setupController:(controller, model) ->
    @_setSiteTitle(controller, model)
    if model
      @_setModel(controller, model)
      type = (model.type || model.constructor)
      @_setupPaginationInfo(controller)
      controller.set('modelAttributes', Attributes.detect(type))
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

`export default mainRoute;`