Admin.NavigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  content:(->
    Admin.DSL.Navigation.content
  ).property()
