class Admin.MetaRoute
  @map: (callback) ->
    callback.call(new Admin.MetaRoute())

  resources: (name) ->
    self = @
    Admin.Router.map () ->
      @route name, path: "/#{name}"
      @route "#{name}.edit", path: self._action_edit_path(name)
      @route "#{name}.show", path: self._action_show_path(name)
      @route "#{name}.new", path: self._new_path(name)
#      @route name, path: self._paginationPath(name)

  _action_show_path: (name) ->
    "/#{name}/:id/show"

  _action_edit_path: (name) ->
    "/#{name}/:id/edit"

  _paginationPath: (name) ->
    "/#{name}/:page"

  _new_path: (name) ->
    "/#{name}/new"