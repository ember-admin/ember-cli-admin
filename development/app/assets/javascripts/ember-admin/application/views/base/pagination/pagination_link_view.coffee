Admin.PaginationLinkView = Ember.View.extend

  attributeBindings: ["href"]
  tagName: "a"
  
  href: (->
    if @get('type') == "next"
      @_nextPage()
    else
      @_prevPage()
  ).property('controller.__page')

  _nextPage: ->
    "#/#{@get('controller.__controller_name')}/_page=#{@get('controller.__nextPage')}"

  _prevPage: ->
    "#/#{@get('controller.__controller_name')}/_page=#{@get('controller.__prevPage')}"