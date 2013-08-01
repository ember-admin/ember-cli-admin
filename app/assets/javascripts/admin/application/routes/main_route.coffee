Admin.MainRoute = Ember.Route.extend
  renderTemplate: (controller, model) ->
    @_setActiveRoute()
    @render @_getControllerName(controller), {outlet: "main", controller: controller}
    @render('navigation', {
      outlet: 'navigation'
      controller: 'navigation'
    })

  _getControllerName: (controller) ->
    controller._debugContainerKey.split(":")[1]

  _setActiveRoute: ->
    url = Ember.Location.create({implementation: 'hash'}).getURL()
    @controllerFor("navigation").set('active', url)
