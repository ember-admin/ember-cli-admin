Admin.Router.map () ->
  @route "dashboard", path: "/"

Admin.MetaRoute.map () ->
  @resources "users", path: "/users"