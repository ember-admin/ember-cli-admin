@Admin = {}
Admin.Resolver = Ember.DefaultResolver.extend

  resolveController: (parsedName) ->
    @useRouterNaming(parsedName)
    if @resolveOther(parsedName)
      @resolveOther(parsedName)
    else
      Admin.ApplicationController

  resolveRoute: (parsedName) ->
    this.useRouterNaming(parsedName)
    if this.resolveOther(parsedName)
      this.resolveOther(parsedName)
    else
      unless @_checkRouteName(parsedName.fullName)
        Admin.MainRoute

  _checkRouteName: (name)->
    ["route:application", "route:basic", "route:loading"].indexOf(name) >= 0