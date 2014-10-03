`import Ember from 'ember';`

paginationMixin = Ember.Mixin.create
  queryParams: ['page', 'perPage']
  page: 1
  perPage:25

  numberOfPages:(->
    Math.ceil(@get('total') / @get('perPage'))
  ).property('perPage')


  onePage:(->
    @get('numberOfPages') == 1
  ).property('numberOfPages')

  step:5

  pages:(->
    pages = []
    numberOfPages = @get('numberOfPages')
    currentPage = @get('page')
    step = @get('step')

    if numberOfPages > step + 1

      leftEdge = currentPage
      rightEdge = currentPage + step - 1

      if(rightEdge >= numberOfPages)
        rightEdge = numberOfPages
        leftEdge = numberOfPages - step + 1

      i = leftEdge
      while i <= rightEdge
        pages.push i
        i++

      if leftEdge > 1
        pages.unshift '...'
        pages.unshift 1
      if rightEdge < numberOfPages
        pages.push '...'
        pages.push numberOfPages

    else
      i = 1
      while i <= numberOfPages
        pages.push i
        i++

    pages

  ).property('page')

  actions:

    nextPage:->
      @incrementProperty('page') if @get('page') < @get('numberOfPages')

    prevPage:->
      @decrementProperty('page') if @get('page') > 1

    changePerPage: (perPage) ->
      @set('perPage', perPage)
      if @get('numberOfPages') < @get('page')
        @send('changePage', 1)

    changePage: (page) ->
      @set('page', Number(page))

`export default paginationMixin;`
