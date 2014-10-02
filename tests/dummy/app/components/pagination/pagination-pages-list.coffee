#`import Ember from 'ember';`
#
#paginationPagesListView = Ember.View.extend
#  onePage:(->
#    @get('controller').get('numberOfPages') == 1
#  ).property('controller.numberOfPages')
#
#  step:5
#
#  pages:(->
#    pages = []
#    numberOfPages = @get('controller').get('numberOfPages')
#    currentPage = @get('controller').get('page')
#    step = @get('step')
#
#    if numberOfPages > step + 1
#
#      leftEdge = currentPage
#      rightEdge = currentPage + step - 1
#
#      if(rightEdge >= numberOfPages)
#        rightEdge = numberOfPages
#        leftEdge = numberOfPages - step + 1
#
#      i = leftEdge
#      while i <= rightEdge
#        pages.push i
#        i++
#
#      if leftEdge > 1
#        pages.unshift '...'
#        pages.unshift 1
#      if rightEdge < numberOfPages
#        pages.push '...'
#        pages.push numberOfPages
#
#    else
#      i = 1
#      while i <= numberOfPages
#        pages.push i
#        i++
#
#    pages
#
#  ).property('controller.page')
#
#`export default paginationPagesListView;`