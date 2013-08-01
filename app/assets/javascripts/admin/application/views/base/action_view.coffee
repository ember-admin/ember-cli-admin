Admin.Base.Views.ActionView = Ember.View.extend
  tagName: "button"
  classNameBindings: ["class"]

  class:(->
    @get('context.class')
  ).property('context')

  click: ->
    console.log @get('context.action')