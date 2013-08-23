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
    if @get('parentView.tagName') == "li"
      if @get('isActive')
        @_clearAll()
        @set('parentView.isActive', true)
    else
      if @get('isActive')
        @_clearAll()
  ).observes('isActive')

  _clearAll: ->
    unless @get('state') == "inBuffer"
      if @get('parentView.tagName') == "li"
        @get('parentView').$().siblings("li").removeClass('active')
        @get('parentView').$().addClass('active')
      else
        @$().siblings("li").removeClass('active')