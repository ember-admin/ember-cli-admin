`import Resolver from 'ember/resolver';`

adminResolver = Resolver.default.extend

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

  resolveController: (parsedName) ->
    console.log parsedName

    this.useRouterNaming(parsedName)

    if (this._checkResourceController(parsedName.fullName))
      this._setNames(parsedName)
    if (this.resolveOther(parsedName))
      return this.resolveOther(parsedName)
    this._super(parsedName)



  _checkRouteName: (name) ->
    return 'route:application route:basic route:loading route:error'.w().indexOf(name) >= 0;

  _checkResourceController: (name) ->
    return this._pattern().test(name)

  _replaceForResource: (name) ->
    return name.replace(this._pattern(), '')

  _setNames: (parsedName) ->
    parsedName.fullName = this._replaceForResource(parsedName.fullName);
    parsedName.fullNameWithoutType = this._replaceForResource(parsedName.fullNameWithoutType);
    parsedName.name = this._replaceForResource(parsedName.name)
    console.log parsedName

  _pattern: () ->
    return /(\/[Ss]how)|(\/[Ee]dit)|(\/[Nn]ew)/

`export default adminResolver`