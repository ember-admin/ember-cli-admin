`import Navigation from 'dummy/dsl/navigation'`

initializer = {
  name: 'navigation'

  initialize: (container, app) ->
    Navigation.map ->
      ###
        Dashboard page
        You can owerride this if you don't use dashboard
      ###
      @navigate "Dashboard", route: ""
      @navigate "Users"
  }

`export default initializer`