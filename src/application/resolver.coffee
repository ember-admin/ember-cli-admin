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

  resolveTemplate: (parsedName) ->
    resolvedTemplate = this._super(parsedName)
    return resolvedTemplate if resolvedTemplate
    namespaceTemplate = Ember.TEMPLATES["ember-admin/%@".fmt(parsedName.name)]
    return namespaceTemplate if namespaceTemplate
    Ember.TEMPLATES['not_found']

  _checkRouteName: (name)->
    ["route:application", "route:basic", "route:loading"].indexOf(name) >= 0

  _checkResourceController: (name) ->
    @_pattern().test(name)

  _replaceForResource:(name) ->
    name.replace(@_pattern(), '')

  _setNames:(parsedName) ->
    parsedName.fullName = @_replaceForResource(parsedName.fullName)
    parsedName.fullNameWithoutType = @_replaceForResource(parsedName.fullNameWithoutType)
    parsedName.name = @_replaceForResource(parsedName.name)

  _pattern: ->
    /(Show)|(Edit)|(New)|(Page)/