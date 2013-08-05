Admin.Base.Views.BatchActionView = Ember.View.extend
  tagName: "li"

  click: ->
    event.preventDefault()
    #add confirm
    #@get('controller').send(@get('context.action'), @get('model'))