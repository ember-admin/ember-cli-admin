`import Ember from 'ember';`

renderMixin = Ember.Mixin.create

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

`export default renderMixin`