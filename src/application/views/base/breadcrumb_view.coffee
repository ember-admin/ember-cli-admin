Admin.Base.Views.BreadcrumbView = Ember.View.extend
  tagName: "a"
  attributeBindings: ["class", "href"]

  click: (event) ->
    event.preventDefault()
    unless @get('controller.resource.__list')
      @get('controller.resource').rollback() if @get('controller.resource.isDirty')
    @set('url', '') if @get('url') == "#/"
    @get('controller').transitionToRoute(@get('url'))