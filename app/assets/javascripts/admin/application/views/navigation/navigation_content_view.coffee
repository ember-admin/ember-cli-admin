Admin.NavigationContentView = Ember.View.extend
  tagName: "li"

  classNameBindings: ["isActive:active"]

  isActive:(->
    @get('context.route') == @get('controller.activeMenu')
  ).property('context','controller.activeMenu')