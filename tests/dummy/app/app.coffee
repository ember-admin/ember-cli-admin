`import Ember from 'ember';`
`import Resolver from 'ember/resolver';`
`import loadInitializers from 'ember/load-initializers';`

Ember.MODEL_FACTORY_INJECTIONS = true;

AdminResolver = Resolver.default.extend

  resolveRoute: (parsedName) ->
    moduleName = "%@/routes/main".fmt(this.namespace.modulePrefix)
    this.useRouterNaming(parsedName)
    if (this.resolveOther(parsedName))
      return this.resolveOther(parsedName)
    else
      if(!this._checkRouteName(parsedName.fullName))
        module = require(moduleName, null, null, true);
        if (module['default'])
          module = module['default']
        return module
  ,

  resolveController: (parsedName) ->

    this.useRouterNaming(parsedName)

    if (this._checkResourceController(parsedName.fullName))
      this._setNames(parsedName)
    if (this.resolveOther(parsedName))
      return this.resolveOther(parsedName)
    else
      moduleName = "%@/controllers/application".fmt(this.namespace.modulePrefix)
      module = require(moduleName, null, null, true)
      if (module['default'])
        module = module['default']
      return module
  ,

  _checkRouteName: (name) ->
    return 'route:application route:basic route:loading route:error'.w().indexOf(name) >= 0;
  ,

  _checkResourceController: (name) ->
    return this._pattern().test(name)
  ,

  _replaceForResource: (name) ->
    return name.replace(this._pattern(), '')
  ,

  _setNames: (parsedName) ->
    parsedName.fullName = this._replaceForResource(parsedName.fullName);
    parsedName.fullNameWithoutType = this._replaceForResource(parsedName.fullNameWithoutType);
    parsedName.name = this._replaceForResource(parsedName.name)
  ,

  _pattern: () ->
    return /([Ss]how\/)|([Ee]dit\/)|([Nn]ew\/)/

App = Ember.Application.extend
  modulePrefix: 'dummy', #TODO: loaded via config
  Resolver: AdminResolver

loadInitializers(App, 'dummy');

`export default App;`
