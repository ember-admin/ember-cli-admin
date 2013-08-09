class Admin.MetaRoute
  @map: (callback) ->
    callback.call(new Admin.MetaRoute())

  resources: (name) ->
    self = @
    Admin.Router.map () ->
      @route name, path: "/#{name}"
      @route "#{name}.edit", path: self._edit_path(name)
      @route "#{name}.show", path: self._show_path(name)
      @route name, path: self._paginationPath(name)

  _edit_path: (name) ->
    "/#{name}/:id/:action"

  _show_path: (name) ->
    "/#{name}/:id/:action"

  _paginationPath: (name) ->
    "/#{name}/:id"
