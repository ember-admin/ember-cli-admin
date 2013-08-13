@Admin = Ember.Namespace.create()

Admin.Resolver = Ember.DefaultResolver.extend

  resolveController: (parsedName) ->
    @useRouterNaming(parsedName)
    if @_checkResourceController(parsedName.fullName)
      @_setNames(parsedName)
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

  _checkResourceController: (name) ->
    /(Show)|(Edit)|(New)/.test(name)

  _replaceForResource:(name) ->
    name.replace(/(Show)|(Edit)|(New)/, '')

  _setNames:(parsedName) ->
    parsedName.fullName = @_replaceForResource(parsedName.fullName)
    parsedName.fullNameWithoutType = @_replaceForResource(parsedName.fullNameWithoutType)
    parsedName.name = @_replaceForResource(parsedName.name)
