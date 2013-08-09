class Admin.MetaRoute
  @map: (callback) ->
    callback.call(new Admin.MetaRoute())

  resources: (name) ->
    self = @
    Admin.Router.map () ->
      @route name, path: "/#{name}"
      @route name, path: self._edit_path(name)
      @route name, path: self._show_path(name)

  _edit_path: (name) ->
    "/#{name}/:id/edit"

  _show_path: (name) ->
    "/#{name}/:id"
