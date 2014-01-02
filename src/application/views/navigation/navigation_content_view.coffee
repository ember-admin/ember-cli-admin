Admin.NavigationContentView = Ember.View.extend
  tagName: "li"

  classNameBindings: ["isActive:active"]

  isActive:(->
    return true if @get('context.route') == @get('controller.activeMenu')
    @_hasChild()
  ).property('context', 'context.children', 'controller.activeMenu')

  _hasChild: ->
    return false unless @get('context.children')
    hasChild = false
    @get('context.children').forEach (item) =>
      return hasChild = true if item.route == @get('controller.activeMenu')
    hasChild