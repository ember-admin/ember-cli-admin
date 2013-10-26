Admin.Base.Views.ButtonView = Ember.View.extend
  tagName: "button"
  classNames: ["btn btn-default"]

  action: ''

  click: ()->
    @get('controller').send(@get('action'), @get('context'))
