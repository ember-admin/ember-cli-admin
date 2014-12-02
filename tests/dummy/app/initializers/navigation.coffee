`import Navigation from 'ember-cli-admin/dsl/navigation'`

initializer = {
  name: 'navigation'

  initialize: (container, app) ->
    Navigation.map ->
      ###
        Dashboard page
        You can owerride this if you don't use dashboard
      ###
      @navigate "Dashboard", route: "dashboard"
      @navigate "Admin", ->
        @navigate "Users"
        @navigate "User Categories"
      @navigate "Catalogues"
  }

`export default initializer`