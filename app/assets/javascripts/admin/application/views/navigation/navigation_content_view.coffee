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
    $(".nav.navbar-nav li").removeClass('active')
    if @get('isActive')
      Ember.run.next =>
        @$().addClass('active')
        @$().parents("li:first").addClass('active')
  ).observes('isActive')