Admin.Base.Views.PaginationNumberView = Ember.View.extend

  attributeBindings: ["href"]
  tagName: "a"
  classNameBindings: ["isActive:active"]
  href: '#'

  isActive:(->
    @get('controller.page') == @get('number')
  ).property('controller.page')

  click: (e) ->
    e.preventDefault()
    @get('controller').send('changePage',@get('number')) unless @get('number') == '...'
