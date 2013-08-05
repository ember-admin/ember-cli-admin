Admin.NavigationContentView = Ember.View.extend
  tagName: "li"

  classNameBindings: ["isActive:active"]

  isActive:(->
    if @get('context.url') == "#%@".fmt(@get('controller.activeMenu'))
      if @get('parentView.tagName') == "li"
        @set('parentView.isActive', true)
      true
  ).property('context', 'controller.activeMenu')

  setActiveParent: (->
    if @get('isActive')
      @set('parentView.isActive', true) if @get('parentView.tagName') == "li"
    else
      @set('parentView.isActive', false) if @get('parentView.tagName') == "li"
  ).observes('isActive')