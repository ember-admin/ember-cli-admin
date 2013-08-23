Admin.DSL.Navigation.map ->
  @navigate "Dashboard", route: ""
  @navigate "System", ->
    @navigate "Users"
    @navigate "Addresses"