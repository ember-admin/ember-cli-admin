class Admin.MetaRoute
  @map: (callback) ->
    callback.call(new Admin.MetaRoute())

  resources: (name) ->
    self = @
    Admin.Router.map () ->
      @resource name, ->
        @route "edit", path: "/:id/edit"
        @route "show", path: "/:id/show"
        @route "new", path: "/new"
        @route 'page', path: "/:id"
