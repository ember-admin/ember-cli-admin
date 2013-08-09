Admin.PaginationLinkView = Ember.View.extend

  attributeBindings: ["href"]
  tagName: "a"

  href: (->
    if @get('type') == "next"
      @_nextPage()
    else
      @_prevPage()
  ).property('controller.page')

  _nextPage: ->
    "#/#{@get('controller.name')}/_page=#{@get('controller.nextPage')}"

  _prevPage: ->
    "#/#{@get('controller.name')}/_page=#{@get('controller.prevPage')}"