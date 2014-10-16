`import Ember from 'ember';`

navigationMenu = Ember.Component.extend
  tagName: "li"

  classNameBindings: ["isActive:active"]

  isActive:(->
    return true if @get('content.route') == @get('origContext.activeMenu')
    @_hasChild()
  ).property('content', 'content.children', 'origContext.activeMenu')

  url: (->
    "/#%@".fmt(@get('content.route'))
  ).property('content.route')

  _hasChild: ->
    return false unless @get('content.children')
    hasChild = false
    @get('content.children').forEach (item) =>
      return hasChild = true if item.route == @get('origContext.activeMenu')
    hasChild

`export default navigationMenu;`