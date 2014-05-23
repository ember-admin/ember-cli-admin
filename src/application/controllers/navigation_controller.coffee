Admin.NavigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  model:(->
    Admin.DSL.Navigation.content
  ).property()
