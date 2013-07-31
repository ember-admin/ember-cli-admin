Admin.MainRoute = Ember.Route.extend
  renderTemplate: (controller, model) ->
    @render @_getControllerName(controller), {outlet: "main", controller: controller}
    @render('navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    })

  _getControllerName: (controller) ->
    controller._debugContainerKey.split(":")[1]